const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const

/** Turn ASCII digits into Persian digits, leaving other characters as-is. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)])
}

/** Human readable file size, Persian digits, e.g. "۱۸٫۴ مگابایت". */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return ''
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${toPersianDigits(mb.toFixed(1)).replace('.', '٫')} مگابایت`
  const kb = Math.max(1, Math.round(bytes / 1024))
  return `${toPersianDigits(kb)} کیلوبایت`
}

/** Gregorian ISO date to a Jalali (Persian calendar) date, e.g. "۲۴ مهر ۱۴۰۴". */
export function formatJalaliDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch {
    return ''
  }
}
