import { ListChecks } from 'lucide-react'
import { fa } from '../content/fa'
import { formatFileSize, toPersianDigits } from '../lib/persian'
import { type ReleaseState, smallestApkBytes } from '../lib/release'
import { AudienceNote } from './AudienceNote'
import { DownloadButton } from './DownloadButton'
import { FadeUp } from './FadeUp'
import { HeroBlobs } from './HeroBlobs'
import { HeroPhone } from './HeroPhone'

interface HeroProps {
  readonly release: ReleaseState
}

export function Hero({ release }: HeroProps) {
  const { hero } = fa
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero">
      <HeroBlobs />
      <div className="hero-grid">
        <div className="hero-copy">
          <FadeUp>
            <img
              src="/logo.png"
              alt=""
              width={64}
              height={64}
              decoding="async"
              className="h-16 w-16 rounded-2xl shadow-lg shadow-ink-950/60"
            />
          </FadeUp>
          <FadeUp delayMs={60}>
            <p className="hero-badge">{hero.badge}</p>
          </FadeUp>
          <FadeUp delayMs={120}>
            <h1 id="hero-heading" className="hero-title">
              {hero.title}
            </h1>
          </FadeUp>
          <FadeUp delayMs={180}>
            <p className="hero-tagline">{hero.tagline}</p>
          </FadeUp>
          <FadeUp delayMs={240}>
            <p className="hero-lede">{hero.description}</p>
          </FadeUp>
          <FadeUp delayMs={300} className="mt-5 max-w-xl">
            <AudienceNote title={hero.badge} body={fa.download.audienceNote} />
          </FadeUp>
          <FadeUp delayMs={360}>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-start">
              <DownloadButton href="#download">{hero.downloadCta}</DownloadButton>
              <a href="#install" className="hero-secondary">
                <ListChecks aria-hidden="true" size={20} />
                {hero.installGuideCta}
              </a>
            </div>
          </FadeUp>
          <FadeUp delayMs={420}>
            <ReleaseChips release={release} />
          </FadeUp>
        </div>
        <HeroPhone />
      </div>
    </section>
  )
}

function ReleaseChips({ release }: { release: ReleaseState }) {
  const { hero } = fa

  if (release.status === 'loading') {
    return (
      <p role="status" className="mt-6 text-sm text-muted">
        {hero.releaseLoading}
      </p>
    )
  }

  if (release.status === 'error') {
    return <p className="mt-6 text-sm text-muted">{hero.releaseUnavailable}</p>
  }

  const { version } = release.release
  const bytes = smallestApkBytes(release.release)
  const size = bytes ? `${hero.fromSize} ${formatFileSize(bytes)}` : ''

  return (
    <dl className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      {version ? <Chip label={hero.versionLabel} value={toPersianDigits(version)} /> : null}
      {size ? <Chip label={hero.sizeLabel} value={size} /> : null}
    </dl>
  )
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-800/70 px-4 py-1.5">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold tabular-nums text-paper">{value}</dd>
    </div>
  )
}
