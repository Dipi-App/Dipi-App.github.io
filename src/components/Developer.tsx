import { User } from 'lucide-react'
import { fa } from '../content/fa'
import { Section } from './Section'

export function Developer() {
  const { developer } = fa
  return (
    <Section id="developer" title={developer.title}>
      <div className="flex flex-col gap-3 rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-lg font-semibold text-paper">
          <User aria-hidden="true" size={20} className="text-gold-300" />
          {developer.label}
        </p>
        <a
          href={developer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-teal-300 underline underline-offset-4 hover:text-teal-400"
        >
          {developer.linkText}
        </a>
      </div>
    </Section>
  )
}
