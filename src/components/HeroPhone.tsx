import { useEffect, useState } from 'react'
import { fa } from '../content/fa'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { screensCatalog } from '../lib/screens'
import { PhoneFrame } from './PhoneFrame'
import { ScreenPicture } from './ScreenPicture'

const CYCLE_MS = 5000

export function HeroPhone() {
  const heroScreen = screensCatalog.screens[0]
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.35 })
  const [showDark, setShowDark] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [lightReady, setLightReady] = useState(false)

  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === 'hidden')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    const idle = window.setTimeout(() => setLightReady(true), 1500)
    return () => window.clearTimeout(idle)
  }, [])

  useEffect(() => {
    if (reduced || !inView || hidden) return undefined
    const timer = window.setInterval(() => {
      setLightReady(true)
      setShowDark((current) => !current)
    }, CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [reduced, inView, hidden])

  const caption = showDark ? fa.hero.themeDark : fa.hero.themeLight

  return (
    <div ref={ref} className="hero-phone">
      <PhoneFrame>
        <div className="hero-phone-stack">
          <ScreenPicture
            files={heroScreen.files.dark}
            alt={heroScreen.alt}
            priority
            className="hero-phone-shot"
            sizes="230px"
          />
          {lightReady ? (
            <div className={`hero-phone-overlay${showDark ? '' : ' is-open'}`}>
              <ScreenPicture
                files={heroScreen.files.light}
                alt=""
                className="hero-phone-shot"
                sizes="230px"
              />
            </div>
          ) : null}
        </div>
      </PhoneFrame>
      <p className="hero-phone-caption" aria-live="polite">
        {caption}
      </p>
    </div>
  )
}
