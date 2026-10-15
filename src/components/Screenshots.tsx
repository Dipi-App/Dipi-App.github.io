import { fa } from '../content/fa'
import { Section } from './Section'

export function Screenshots() {
  const { screenshots } = fa
  return (
    <Section id="screenshots" title={screenshots.title} subtitle={screenshots.subtitle}>
      <p className="mb-6 rounded-xl border border-teal-400/40 bg-teal-500/10 px-4 py-3 text-sm text-teal-300">
        {screenshots.placeholderNotice}
      </p>
      {/* A focusable scrollable region: keyboard users can scroll it with arrows. */}
      <section
        tabIndex={0}
        aria-label={screenshots.title}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4"
      >
        {screenshots.items.map((item) => (
          <figure key={item.src} className="w-[230px] shrink-0 snap-center">
            <div className="rounded-[2rem] border-4 border-ink-700 bg-ink-950 p-2 shadow-lg shadow-ink-950/50">
              <div className="overflow-hidden rounded-[1.5rem] bg-ink-800">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={1080}
                  height={2340}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted">{item.alt}</figcaption>
          </figure>
        ))}
      </section>
    </Section>
  )
}
