import { Bug, Code, Scale } from 'lucide-react'
import type { ComponentType } from 'react'
import { fa } from '../content/fa'
import { links } from '../lib/links'
import { Section } from './Section'

type IconComponent = ComponentType<{ size?: number; className?: string }>

export function OpenSource() {
  const { openSource } = fa
  return (
    <Section id="open-source" title={openSource.title}>
      <p className="max-w-2xl leading-8 text-muted">{openSource.body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkCard href={links.repository} icon={Code} label={openSource.repositoryLabel} />
        <LinkCard href={links.issues} icon={Bug} label={openSource.issuesLabel} />
        <LinkCard
          href={links.license}
          icon={Scale}
          label={`${openSource.licenseLabel}: ${openSource.licenseValue}`}
        />
      </div>
    </Section>
  )
}

function LinkCard({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: IconComponent
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-sm font-medium text-paper transition-colors hover:border-teal-400 hover:text-teal-300"
    >
      <Icon aria-hidden="true" size={18} />
      {label}
    </a>
  )
}
