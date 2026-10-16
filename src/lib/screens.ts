import catalog from '../content/screens.json'

export interface ScreenFiles {
  readonly '540': string
  readonly '1080': string
}

export interface ScreenItem {
  readonly id: string
  readonly title: string
  readonly alt: string
  readonly files: {
    readonly dark: ScreenFiles
    readonly light: ScreenFiles
  }
}

export interface ScreensCatalog {
  readonly screens: readonly ScreenItem[]
}

export const screensCatalog = catalog as ScreensCatalog

export function screenSrc(file: string): string {
  return `/screens/${file}`
}
