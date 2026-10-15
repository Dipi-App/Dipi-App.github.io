import { Download, ListChecks } from 'lucide-react'
import { fa } from '../content/fa'
import { links } from '../lib/links'
import { formatFileSize, toPersianDigits } from '../lib/persian'
import type { ReleaseState } from '../lib/release'

interface HeroProps {
  readonly release: ReleaseState
}

export function Hero({ release }: HeroProps) {
  const { hero } = fa
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-12 pb-4 sm:pt-20 sm:pb-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <img
          src="/logo.png"
          alt=""
          width={96}
          height={96}
          decoding="async"
          className="h-24 w-24 rounded-3xl shadow-lg shadow-ink-950/60"
        />
        <h1 id="hero-heading" className="mt-6 text-4xl font-bold text-paper sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-4 text-lg font-medium text-gold-300 sm:text-xl">{hero.tagline}</p>
        <p className="mt-3 max-w-xl leading-8 text-muted">{hero.description}</p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <a
            href={links.apkDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-3 text-base font-bold text-ink-950 transition-colors hover:bg-gold-300"
          >
            <Download aria-hidden="true" size={20} />
            {hero.downloadCta}
          </a>
          <a
            href="#install"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-700 bg-ink-800 px-6 py-3 text-base font-semibold text-paper transition-colors hover:border-teal-400 hover:text-teal-300"
          >
            <ListChecks aria-hidden="true" size={20} />
            {hero.installGuideCta}
          </a>
        </div>

        <ReleaseChips release={release} />
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

  const { version, apkSizeBytes } = release.release
  const size = apkSizeBytes ? formatFileSize(apkSizeBytes) : ''

  return (
    <dl className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
      {version ? <Chip label={hero.versionLabel} value={toPersianDigits(version)} /> : null}
      {size ? <Chip label={hero.sizeLabel} value={size} /> : null}
    </dl>
  )
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-800/70 px-4 py-1.5">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-paper">{value}</dd>
    </div>
  )
}
