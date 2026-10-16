import { type CSSProperties, type ReactNode, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface FadeUpProps {
  readonly children: ReactNode
  readonly delayMs?: number
  readonly onView?: boolean
  readonly className?: string
}

export function FadeUp({ children, delayMs = 0, onView = false, className = '' }: FadeUpProps) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ once: true })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shown = reduced || (onView ? inView : mounted)
  const style: CSSProperties = {
    transitionDelay: reduced ? '0ms' : `${delayMs}ms`,
  }

  return (
    <div ref={ref} className={`fade-up${shown ? ' is-in' : ''} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
