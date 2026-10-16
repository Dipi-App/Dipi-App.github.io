import type { ScreenFiles } from '../lib/screens'
import { screenSrc } from '../lib/screens'

interface ScreenPictureProps {
  readonly files: ScreenFiles
  readonly alt: string
  readonly priority?: boolean
  readonly className?: string
  readonly sizes?: string
}

export function ScreenPicture({
  files,
  alt,
  priority = false,
  className,
  sizes = '230px',
}: ScreenPictureProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${screenSrc(files['540'])} 540w, ${screenSrc(files['1080'])} 1080w`}
        sizes={sizes}
      />
      <img
        src={screenSrc(files['540'])}
        alt={alt}
        width={540}
        height={1200}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'async' : 'async'}
        className={className}
      />
    </picture>
  )
}
