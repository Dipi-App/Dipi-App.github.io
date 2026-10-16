import { useEffect, useState } from 'react'
import type { GalleryTheme } from '../components/ThemeSegmented'

function systemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useResolvedTheme(choice: GalleryTheme): 'dark' | 'light' {
  const [resolved, setResolved] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const apply = () => {
      if (choice === 'auto') {
        setResolved(systemDark() ? 'dark' : 'light')
        return
      }
      setResolved(choice)
    }
    apply()
    if (choice !== 'auto') return undefined
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [choice])

  return resolved
}
