import { AlertTriangle, Hash } from 'lucide-react'
import { fa } from '../content/fa'
import { toPersianDigits } from '../lib/persian'
import type { ApkVariant, ReleaseState } from '../lib/release'
import { Section } from './Section'

interface InstallGuideProps {
  readonly release: ReleaseState
}

export function InstallGuide({ release }: InstallGuideProps) {
  const { install } = fa
  const hashed =
    release.status === 'ready' ? release.release.variants.filter((variant) => variant.sha256) : []

  return (
    <Section id="install" title={install.title} subtitle={install.subtitle}>
      <ol className="install-steps">
        {install.steps.map((step, index) => (
          <li key={step.title} className="install-step">
            <span className="install-step-num">{toPersianDigits(index + 1)}</span>
            <h3 className="mt-3 text-base font-semibold text-pretty text-paper">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-400/40 bg-gold-400/10 p-4">
        <AlertTriangle aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-gold-300" />
        <p className="text-sm leading-7 text-paper">{install.warningNote}</p>
      </div>

      {hashed.length > 0 ? (
        <div className="mt-6 rounded-xl border border-teal-400/40 bg-teal-500/10 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-teal-300">
            <Hash aria-hidden="true" size={18} />
            {install.sha.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted">{install.sha.description}</p>
          <ul className="mt-3 grid gap-3">
            {hashed.map((variant) => (
              <ShaRow key={variant.id} variant={variant} />
            ))}
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted">{install.sha.match}</p>
        </div>
      ) : null}
    </Section>
  )
}

function ShaRow({ variant }: { variant: ApkVariant }) {
  const copy = fa.download.variants[variant.id]
  return (
    <li>
      <p className="text-xs text-muted">
        {copy.title} ({copy.abi})
      </p>
      <code className="mt-1 block break-all rounded-lg bg-ink-950/70 px-3 py-2 font-mono text-xs text-paper">
        {variant.sha256}
      </code>
    </li>
  )
}
