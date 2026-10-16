import { type MouseEvent, useEffect, useState } from 'react'
import { fa } from '../content/fa'

function closeMobileNav(event: MouseEvent<HTMLAnchorElement>) {
  const root = event.currentTarget.closest('details')
  if (root) root.open = false
}

const NAV_LINKS = [
  { href: '#features', label: fa.nav.features },
  { href: '#screenshots', label: fa.nav.screenshots },
  { href: '#download', label: fa.nav.download },
  { href: '#install', label: fa.nav.install },
  { href: '#open-source', label: fa.nav.openSource },
] as const

export function Header() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${stuck ? ' is-stuck' : ''}`}>
      <div className="site-header-island">
        <a href="#top" className="site-brand">
          <img
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            decoding="async"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-base font-bold text-paper">{fa.nav.brand}</span>
        </a>
        <nav aria-label={fa.nav.ariaLabel} className="nav-desktop">
          <ul className="flex items-center gap-1 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#download" className="header-cta">
          {fa.nav.download}
        </a>
        <details className="nav-mobile">
          <summary className="nav-mobile-summary">{fa.nav.menu}</summary>
          <ul className="nav-mobile-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link" onClick={closeMobileNav}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </header>
  )
}
