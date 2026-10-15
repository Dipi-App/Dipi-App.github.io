import { Download as DownloadIcon } from 'lucide-react'
import { fa } from '../content/fa'
import { links } from '../lib/links'
import { formatFileSize, formatJalaliDate, toPersianDigits } from '../lib/persian'
import type { ReleaseState } from '../lib/release'
import { Section } from './Section'

interface DownloadProps {
  readonly release: ReleaseState
}

export function Download({ release }: DownloadProps) {
  const { download } = fa
  return (
    <Section id="download" title={download.title} subtitle={download.subtitle}>
      <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8">
        <a
          href={links.apkDownload}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-3 text-base font-bold text-ink-950 transition-colors hover:bg-gold-300 sm:w-auto"
        >
          <DownloadIcon aria-hidden="true" size={20} />
          {download.button}
        </a>
        <p className="mt-3 text-sm text-muted">{download.directLinkNote}</p>

        <ReleaseDetails release={release} />

        <a
          href="#install"
          className="mt-6 inline-flex items-center gap-2 text-teal-300 underline underline-offset-4 hover:text-teal-400"
        >
          {download.installGuideLink}
        </a>
      </div>
    </Section>
  )
}

interface DetailRow {
  readonly label: string
  readonly value: string
  readonly mono?: boolean
}

function ReleaseDetails({ release }: { release: ReleaseState }) {
  const { download } = fa

  if (release.status === 'loading') {
    return (
      <p role="status" className="mt-6 text-sm text-muted">
        {download.loading}
      </p>
    )
  }

  if (release.status === 'error') {
    return <p className="mt-6 text-sm text-muted">{download.unavailable}</p>
  }

  const { version, publishedAt, apkSizeBytes, sha256 } = release.release
  const rows: DetailRow[] = []
  if (version) rows.push({ label: download.versionLabel, value: toPersianDigits(version) })
  if (apkSizeBytes) rows.push({ label: download.sizeLabel, value: formatFileSize(apkSizeBytes) })
  const date = publishedAt ? formatJalaliDate(publishedAt) : ''
  if (date) rows.push({ label: download.releasedLabel, value: date })
  if (sha256) rows.push({ label: download.shaLabel, value: sha256, mono: true })

  if (rows.length === 0) {
    return <p className="mt-6 text-sm text-muted">{download.unavailable}</p>
  }

  return (
    <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1 border-b border-ink-700/60 pb-2">
          <dt className="text-xs text-muted">{row.label}</dt>
          <dd className={row.mono ? 'break-all font-mono text-xs text-paper' : 'text-paper'}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
