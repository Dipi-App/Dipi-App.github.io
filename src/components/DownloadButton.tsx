import { Download } from 'lucide-react'
import type { ReactNode } from 'react'

interface DownloadButtonProps {
  readonly href: string
  readonly children: ReactNode
  readonly wide?: boolean
  readonly tone?: 'primary' | 'secondary'
}

export function DownloadButton({
  href,
  children,
  wide = false,
  tone = 'primary',
}: DownloadButtonProps) {
  const external = href.startsWith('http')
  const className = [
    'download-btn',
    wide ? 'is-wide' : '',
    tone === 'secondary' ? 'is-secondary' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
    >
      <span className="download-btn-icon">
        <Download aria-hidden="true" size={18} />
      </span>
      {children}
    </a>
  )
}
