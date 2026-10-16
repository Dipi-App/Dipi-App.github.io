export type GalleryTheme = 'dark' | 'light' | 'auto'

interface ThemeSegmentedProps {
  readonly value: GalleryTheme
  readonly onChange: (value: GalleryTheme) => void
  readonly labels: {
    readonly dark: string
    readonly light: string
    readonly auto: string
    readonly ariaLabel: string
  }
}

const OPTIONS: readonly GalleryTheme[] = ['dark', 'light', 'auto']

export function ThemeSegmented({ value, onChange, labels }: ThemeSegmentedProps) {
  return (
    <fieldset className="theme-segmented">
      <legend className="sr-only">{labels.ariaLabel}</legend>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          className={value === option ? 'is-active' : undefined}
          onClick={() => onChange(option)}
        >
          {labels[option]}
        </button>
      ))}
    </fieldset>
  )
}
