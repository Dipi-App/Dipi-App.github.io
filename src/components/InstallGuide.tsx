import { AlertTriangle, Hash } from 'lucide-react'
import { fa } from '../content/fa'
import { toPersianDigits } from '../lib/persian'
import type { ReleaseState } from '../lib/release'
import { Section } from './Section'

interface InstallGuideProps {
  readonly release: ReleaseState
}

export function InstallGuide({ release }: InstallGuideProps) {
  const { install } = fa
  // Only show the hash check when a real hash could be retrieved from the release.
  const sha256 = release.status === 'ready' ? release.release.sha256 : null

  return (
    <Section id="install" title={install.title} subtitle={install.subtitle}>
      <ol className="grid gap-4 sm:grid-cols-3">
        {install.steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-ink-700 bg-ink-800/60 p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 font-bold text-ink-950">
              {toPersianDigits(index + 1)}
            </span>
            <h3 className="mt-3 text-base font-semibold text-paper">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-400/40 bg-gold-400/10 p-4">
        <AlertTriangle aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-gold-300" />
        <p className="text-sm leading-7 text-paper">{install.warningNote}</p>
      </div>

      {sha256 ? (
        <div className="mt-6 rounded-xl border border-teal-400/40 bg-teal-500/10 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-teal-300">
            <Hash aria-hidden="true" size={18} />
            {install.sha.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted">{install.sha.description}</p>
          <code className="mt-3 block break-all rounded-lg bg-ink-950/70 px-3 py-2 font-mono text-xs text-paper">
            {sha256}
          </code>
          <p className="mt-2 text-sm leading-7 text-muted">{install.sha.match}</p>
        </div>
      ) : null}
    </Section>
  )
}
