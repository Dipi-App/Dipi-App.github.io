import { fa } from '../content/fa'
import { links } from '../lib/links'
import { formatFileSize, formatJalaliDate, toPersianDigits } from '../lib/persian'
import {
  type ApkVariant,
  type ApkVariantId,
  fallbackVariants,
  type ReleaseState,
  VARIANT_IDS,
  variantOf,
} from '../lib/release'
import { AudienceNote } from './AudienceNote'
import { DownloadButton } from './DownloadButton'
import { Section } from './Section'

interface DownloadProps {
  readonly release: ReleaseState
}

export function Download({ release }: DownloadProps) {
  const { download } = fa
  return (
    <Section id="download" title={download.title} subtitle={download.subtitle}>
      <div className="download-shell">
        <div className="download-island">
          <AudienceNote title={fa.hero.badge} body={download.audienceNote} />
          <p className="mt-5 max-w-2xl leading-8 text-muted">{download.choose}</p>

          <ApkGrid release={release} />
          <ReleaseMeta release={release} />

          <a href="#install" className="download-guide-link">
            {download.installGuideLink}
          </a>
        </div>
      </div>
    </Section>
  )
}

function ApkGrid({ release }: { release: ReleaseState }) {
  const variants = variantsFor(release)

  return (
    <ul className="apk-grid">
      {VARIANT_IDS.map((id) => (
        <li key={id}>
          <ApkCard id={id} variant={variants[id]} />
        </li>
      ))}
    </ul>
  )
}

function ApkCard({ id, variant }: { id: ApkVariantId; variant: ApkVariant }) {
  const copy = fa.download.variants[id]
  const size = variant.sizeBytes ? formatFileSize(variant.sizeBytes) : null
  const direct = variant.url !== links.releasesLatest
  const primary = id === 'universal'

  return (
    <article className="apk-card">
      <p className="apk-card-abi">{copy.abi}</p>
      <h3 className="apk-card-title">{copy.title}</h3>
      <p className="apk-card-devices">{copy.devices}</p>
      {size ? (
        <p className="apk-card-size">
          <span className="text-muted">{fa.download.sizeLabel}</span>
          <strong className="tabular-nums">{size}</strong>
        </p>
      ) : null}
      <div className="mt-auto pt-4">
        <DownloadButton href={variant.url} wide tone={primary ? 'primary' : 'secondary'}>
          {direct ? copy.button : fa.download.openRelease}
        </DownloadButton>
      </div>
      {variant.sha256 ? (
        <p className="apk-card-sha">
          <span>{fa.download.shaLabel}</span>
          <code>{variant.sha256}</code>
        </p>
      ) : null}
    </article>
  )
}

function ReleaseMeta({ release }: { release: ReleaseState }) {
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

  const { version, publishedAt } = release.release
  const date = publishedAt ? formatJalaliDate(publishedAt) : ''
  const rows: { label: string; value: string }[] = []
  if (version) rows.push({ label: download.versionLabel, value: toPersianDigits(version) })
  if (date) rows.push({ label: download.releasedLabel, value: date })

  if (rows.length === 0) return null

  return (
    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1">
          <dt className="text-xs text-muted">{row.label}</dt>
          <dd className="tabular-nums text-paper">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function variantsFor(release: ReleaseState): Record<ApkVariantId, ApkVariant> {
  if (release.status !== 'ready') return fallbackVariants()
  return {
    universal: variantOf(release.release, 'universal'),
    v8: variantOf(release.release, 'v8'),
    v7: variantOf(release.release, 'v7'),
  }
}
