import { fa } from '../content/fa'

const NAV_LINKS = [
  { href: '#features', label: fa.nav.features },
  { href: '#screenshots', label: fa.nav.screenshots },
  { href: '#download', label: fa.nav.download },
  { href: '#install', label: fa.nav.install },
  { href: '#open-source', label: fa.nav.openSource },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-700/70 bg-ink-900/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2 rounded-lg">
          <img
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            decoding="async"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-bold text-paper">{fa.nav.brand}</span>
        </a>
        <nav aria-label={fa.nav.ariaLabel} className="ms-auto">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded text-muted hover:text-gold-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
