import { useEffect, useRef, useState } from 'react'
import { fa } from '../content/fa'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useResolvedTheme } from '../hooks/useResolvedTheme'
import { screensCatalog } from '../lib/screens'
import { PhoneFrame } from './PhoneFrame'
import { ScreenPicture } from './ScreenPicture'
import { Section } from './Section'
import { type GalleryTheme, ThemeSegmented } from './ThemeSegmented'

function supportsScrollTimeline(): boolean {
  return typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()')
}

export function Screenshots() {
  const { screenshots } = fa
  const reduced = usePrefersReducedMotion()
  const [choice, setChoice] = useState<GalleryTheme>('auto')
  const theme = useResolvedTheme(choice)
  const scrollerRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const [scrollDriven, setScrollDriven] = useState(true)

  useEffect(() => {
    setScrollDriven(supportsScrollTimeline())
  }, [])

  useEffect(() => {
    if (scrollDriven || reduced) return undefined
    const root = scrollerRef.current
    if (!root) return undefined

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-shot]'))
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | undefined
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry
          }
        }
        if (!best?.isIntersecting) return
        const index = cards.indexOf(best.target as HTMLElement)
        if (index >= 0) setActive(index)
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    )
    for (const card of cards) observer.observe(card)
    return () => observer.disconnect()
  }, [scrollDriven, reduced])

  return (
    <Section id="screenshots" title={screenshots.title} subtitle={screenshots.subtitle}>
      <div className="mb-6 flex justify-start">
        <ThemeSegmented
          value={choice}
          onChange={setChoice}
          labels={{
            dark: screenshots.themeDark,
            light: screenshots.themeLight,
            auto: screenshots.themeAuto,
            ariaLabel: screenshots.themeAria,
          }}
        />
      </div>
      <section
        ref={scrollerRef}
        tabIndex={0}
        aria-label={screenshots.title}
        className="shot-scroller"
      >
        {screensCatalog.screens.map((item, index) => {
          const focused = reduced || (!scrollDriven && index === active)
          return (
            <figure key={item.id} data-shot className={`shot-card${focused ? ' is-focused' : ''}`}>
              <PhoneFrame>
                <div className="shot-crossfade" data-theme={theme}>
                  <ScreenPicture
                    key={`${item.id}-${theme}`}
                    files={item.files[theme]}
                    alt={item.alt}
                    sizes="230px"
                  />
                </div>
              </PhoneFrame>
              <figcaption className="mt-3 text-center text-sm text-muted">{item.title}</figcaption>
            </figure>
          )
        })}
      </section>
    </Section>
  )
}
