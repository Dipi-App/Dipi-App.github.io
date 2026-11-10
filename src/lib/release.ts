import { useEffect, useState } from 'react'
import { links } from './links'

const RELEASE_API = 'https://api.github.com/repos/Dipi-App/app/releases/latest'
const SHA256_RE = /\b[a-fA-F0-9]{64}\b/

export type ApkVariantId = 'universal' | 'v8' | 'v7'

export interface ApkVariant {
  readonly id: ApkVariantId
  readonly url: string
  readonly sizeBytes: number | null
  readonly sha256: string | null
}

export interface LatestRelease {
  readonly tag: string
  readonly version: string
  readonly publishedAt: string
  readonly variants: readonly ApkVariant[]
}

export type ReleaseState =
  | { readonly status: 'loading'; readonly release: null }
  | { readonly status: 'ready'; readonly release: LatestRelease }
  | { readonly status: 'error'; readonly release: null }

interface GitHubAsset {
  readonly name: string
  readonly size: number
  readonly browser_download_url: string
  readonly digest?: string | null
}

interface GitHubRelease {
  readonly tag_name?: string
  readonly published_at?: string
  readonly body?: string | null
  readonly assets?: readonly GitHubAsset[]
}

export const VARIANT_IDS: readonly ApkVariantId[] = ['universal', 'v8', 'v7']

const FALLBACK_VARIANTS: readonly ApkVariant[] = [
  { id: 'universal', url: links.apkDownload, sizeBytes: null, sha256: null },
  { id: 'v8', url: links.releasesLatest, sizeBytes: null, sha256: null },
  { id: 'v7', url: links.releasesLatest, sizeBytes: null, sha256: null },
]

function isApk(name: string): boolean {
  return name.endsWith('.apk')
}

function pickUniversal(assets: readonly GitHubAsset[]): GitHubAsset | undefined {
  return (
    assets.find((asset) => asset.name === 'dipi.apk') ??
    assets.find(
      (asset) =>
        isApk(asset.name) &&
        /^dipi-\d/.test(asset.name) &&
        !asset.name.includes('arm64-v8a') &&
        !asset.name.includes('armeabi-v7a') &&
        !asset.name.includes('x86_64'),
    )
  )
}

function pickAbi(assets: readonly GitHubAsset[], abi: string): GitHubAsset | undefined {
  return assets.find((asset) => isApk(asset.name) && asset.name.includes(abi))
}

/**
 * GitHub publishes each release asset's digest in the API. Older releases may
 * not have one, so fall back to a clearly valid 64-hex hash in the notes. The
 * `.sha256` assets cannot be fetched from the browser: GitHub sends no CORS
 * header for release downloads. We never guess or compute the hash here.
 */
function sha256Of(asset: GitHubAsset, body: string): string | null {
  const digest = asset.digest?.trim().toLowerCase() ?? ''
  const hex = digest.startsWith('sha256:') ? digest.slice(7) : digest
  return /^[a-f0-9]{64}$/.test(hex) ? hex : hashFromNotes(body, asset.name)
}

function hashFromNotes(body: string, apkName: string): string | null {
  const lines = body.split(/\r?\n/)
  const escaped = apkName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const named = new RegExp(`\\b${escaped}(?![.\\w])`)
  const preferred = lines.find((line) => named.test(line) && SHA256_RE.test(line))
  const match = preferred?.match(SHA256_RE)
  return match ? match[0].toLowerCase() : null
}

function fallbackVariant(id: ApkVariantId): ApkVariant {
  return FALLBACK_VARIANTS.find((variant) => variant.id === id) ?? FALLBACK_VARIANTS[0]
}

async function buildVariants(
  assets: readonly GitHubAsset[],
  body: string,
): Promise<readonly ApkVariant[]> {
  const picked: Record<ApkVariantId, GitHubAsset | undefined> = {
    universal: pickUniversal(assets),
    v8: pickAbi(assets, 'arm64-v8a'),
    v7: pickAbi(assets, 'armeabi-v7a'),
  }

  return Promise.all(
    VARIANT_IDS.map(async (id) => {
      const asset = picked[id]
      if (!asset) return fallbackVariant(id)
      return {
        id,
        url: asset.browser_download_url,
        sizeBytes: asset.size,
        sha256: sha256Of(asset, body),
      }
    }),
  )
}

export function fallbackVariants(): Record<ApkVariantId, ApkVariant> {
  return {
    universal: fallbackVariant('universal'),
    v8: fallbackVariant('v8'),
    v7: fallbackVariant('v7'),
  }
}

export function variantOf(release: LatestRelease, id: ApkVariantId): ApkVariant {
  return release.variants.find((variant) => variant.id === id) ?? fallbackVariant(id)
}

export function smallestApkBytes(release: LatestRelease): number | null {
  const sizes = release.variants
    .map((variant) => variant.sizeBytes)
    .filter((size): size is number => size != null && size > 0)
  return sizes.length > 0 ? Math.min(...sizes) : null
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

        setState({
          status: 'ready',
          release: {
            tag: data.tag_name ?? '',
            version: (data.tag_name ?? '').replace(/^v/, ''),
            publishedAt: data.published_at ?? '',
            variants: await buildVariants(assets, data.body ?? ''),
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
