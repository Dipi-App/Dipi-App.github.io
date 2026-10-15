import { useEffect, useState } from 'react'

const RELEASE_API = 'https://api.github.com/repos/Dipi-App/app/releases/latest'
const APK_ASSET = 'dipi.apk'
const SHA_ASSET = 'dipi.apk.sha256'
const SHA256_RE = /\b[a-fA-F0-9]{64}\b/

export interface LatestRelease {
  readonly tag: string
  readonly version: string
  readonly publishedAt: string
  readonly apkSizeBytes: number | null
  readonly sha256: string | null
}

export type ReleaseState =
  | { readonly status: 'loading'; readonly release: null }
  | { readonly status: 'ready'; readonly release: LatestRelease }
  | { readonly status: 'error'; readonly release: null }

interface GitHubAsset {
  readonly name: string
  readonly size: number
  readonly browser_download_url: string
}

interface GitHubRelease {
  readonly tag_name?: string
  readonly published_at?: string
  readonly body?: string | null
  readonly assets?: readonly GitHubAsset[]
}

/**
 * The GitHub Releases API has no dedicated SHA-256 field. We read the hash from
 * the published `dipi.apk.sha256` asset, and only fall back to the release notes
 * when a clearly valid 64-hex hash is present there. We never guess or compute
 * the hash in the browser.
 */
async function resolveSha256(
  assets: readonly GitHubAsset[],
  body: string,
  signal: AbortSignal,
): Promise<string | null> {
  const shaAsset = assets.find((asset) => asset.name === SHA_ASSET)
  if (shaAsset) {
    try {
      const response = await fetch(shaAsset.browser_download_url, { signal })
      if (response.ok) {
        const match = (await response.text()).match(SHA256_RE)
        if (match) return match[0].toLowerCase()
      }
    } catch {
      // Fall through to the release notes.
    }
  }
  return hashFromNotes(body)
}

function hashFromNotes(body: string): string | null {
  const lines = body.split(/\r?\n/)
  // Prefer a checksum line that names the universal APK and actually carries a
  // hash — a changelog entry that only mentions the file name must not win.
  const preferred = lines.find((line) => /\bdipi\.apk(?![.\w])/.test(line) && SHA256_RE.test(line))
  const source = preferred ?? lines.find((line) => SHA256_RE.test(line))
  const match = source?.match(SHA256_RE)
  return match ? match[0].toLowerCase() : null
}

/** Fetch the latest release once on mount; fail quietly so the page never breaks. */
export function useLatestRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>({ status: 'loading', release: null })

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const response = await fetch(RELEASE_API, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`GitHub responded with ${response.status}`)

        const data = (await response.json()) as GitHubRelease
        const assets = data.assets ?? []
        const apk = assets.find((asset) => asset.name === APK_ASSET)

        setState({
          status: 'ready',
          release: {
            tag: data.tag_name ?? '',
            version: (data.tag_name ?? '').replace(/^v/, ''),
            publishedAt: data.published_at ?? '',
            apkSizeBytes: apk?.size ?? null,
            sha256: await resolveSha256(assets, data.body ?? '', controller.signal),
          },
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ status: 'error', release: null })
      }
    }

    void load()
    return () => controller.abort()
  }, [])

  return state
}
