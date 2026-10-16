import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  readonly once?: boolean
  readonly rootMargin?: string
  readonly threshold?: number
}

export function useInView<T extends Element = HTMLElement>(options: UseInViewOptions = {}) {
  const { once = true, rootMargin = '0px', threshold = 0.25 } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
          return
        }
        if (!once) setInView(false)
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
