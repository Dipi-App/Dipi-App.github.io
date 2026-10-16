# How to change copy and links

The public site is Persian only. Do not add a second language unless the
product decision changes.

## Page text

Edit [`src/content/fa.ts`](../src/content/fa.ts).

```ts
export const fa = {
  hero: {
    badge: 'فقط برای کارگر',
    downloadCta: 'دانلود نسخه کارگر',
    // …
  },
}
```

Components import `fa` and render those strings. If a user-visible sentence
is hardcoded in a component, move it here.

`index.html` title, description, and Open Graph tags are **duplicated** on
purpose so the first paint has meta before React. When you change
`fa.meta.title` or `fa.meta.description`, change `index.html` to match.

## Audience rules

This APK is for workers. When you edit hero, download, install, or footer
copy, keep all of these true:

- The page says the current app is for workers.
- Employers are told not to install this file.
- The employer product is “later, separate” — never a button on this page.

## Feature cards

`fa.features.items` is typed with `FeatureIconId`:

`calendar` | `users` | `wallet` | `stats` | `offline` | `backup`

Icons are mapped in `src/components/Features.tsx`. Adding a card means:

1. Add the item in `fa.ts` with a new or existing `icon` id.
2. If the id is new, add it to `FeatureIconId` and to `FEATURE_ICONS`.
3. Decide its bento span in `Features.tsx` (`wide` / `accent` / default).

## Links

Edit [`src/lib/links.ts`](../src/lib/links.ts). These are targets, not labels.

| Key | Points at |
| --- | --- |
| `apkDownload` | Latest universal `dipi.apk` on `Dipi-App/app` |
| `releasesLatest` | Latest GitHub Release page (v8 / v7 fallback) |
| `repository` / `issues` / `license` | The **app** repo (source of the APK) |
| `website` | `https://dipi-app.github.io/` |

The developer URL is copy, not a link constant — it lives on
`fa.developer.url` and is rendered in the footer.

Download cards read `fa.download.variants.universal|v8|v7` (title, ABI label,
device note, button). Do not add an employer APK here.

## Numbers and dates

Use [`src/lib/persian.ts`](../src/lib/persian.ts):

- `toPersianDigits` for versions and counts
- `formatFileSize` for the APK size (مگابایت / کیلوبایت)
- `formatJalaliDate` for `published_at` from GitHub

Do not format those in the component.
