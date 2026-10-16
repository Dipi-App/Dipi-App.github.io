import { fa } from '../content/fa'
import { links } from '../lib/links'
import { toPersianDigits } from '../lib/persian'

export function Footer() {
  const { footer, developer } = fa
  const year = toPersianDigits(new Date().getFullYear())

  return (
    <footer className="site-footer">
      <div className="site-wrap flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p>{footer.tagline}</p>
          <p>
            <a
              href={developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-paper hover:text-gold-300"
            >
              {developer.label}
            </a>
          </p>
        </div>
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
