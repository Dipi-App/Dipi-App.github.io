import { fa } from '../content/fa'
import { links } from '../lib/links'
import { toPersianDigits } from '../lib/persian'

export function Footer() {
  const { footer } = fa
  const year = toPersianDigits(new Date().getFullYear())

  return (
    <footer className="border-t border-ink-700/70 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{footer.tagline}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={links.license}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-300"
          >
            {footer.licenseLabel}
          </a>
          <a
            href={links.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-300"
          >
            {footer.githubLabel}
          </a>
          <a href={links.website} className="hover:text-gold-300">
            {footer.websiteLabel}
          </a>
          <span>
            © {year} {fa.nav.brand}
          </span>
        </div>
      </div>
    </footer>
  )
}
