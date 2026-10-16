import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface SectionProps {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly children: ReactNode
}

/** Shared section wrapper: semantic markup, a heading and a consistent container. */
export function Section({ id, title, subtitle, children }: SectionProps) {
  const headingId = `${id}-heading`
  const { ref, inView } = useInView<HTMLHeadingElement>({ once: true, threshold: 0.6 })

  return (
    <section id={id} aria-labelledby={headingId} className="site-section">
      <div className="site-wrap">
        <h2 ref={ref} id={headingId} className={`section-title${inView ? ' is-in' : ''}`}>
          {title}
        </h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
