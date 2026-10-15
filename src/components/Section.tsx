import type { ReactNode } from 'react'

interface SectionProps {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly children: ReactNode
}

/** Shared section wrapper: semantic markup, a heading and a consistent container. */
export function Section({ id, title, subtitle, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <h2 id={headingId} className="text-2xl font-bold text-paper sm:text-3xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-3 max-w-2xl text-muted leading-7">{subtitle}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
