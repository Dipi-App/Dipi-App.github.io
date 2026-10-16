import type { ReactNode } from 'react'

interface PhoneFrameProps {
  readonly children: ReactNode
  readonly className?: string
}

/** CSS-only phone bezel. No brand device image. */
export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <span className="phone-camera" aria-hidden="true" />
      <div className="phone-screen">{children}</div>
    </div>
  )
}
