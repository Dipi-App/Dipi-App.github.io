# Architecture

The site is a single HTML page. There is no router, no auth, and no backend.
Vite builds static files. GitHub Pages serves `dist/`.

## Tree

```
src/
  main.tsx                 # fonts, motion tokens, CSS, mount <App>
  App.tsx                  # skip link, header, sections, footer
  content/fa.ts            # every Persian string
  content/screens.json     # screenshot catalog (copied into public/screens/)
  lib/links.ts             # external URLs
  lib/persian.ts           # digits, file size, Jalali date
  lib/release.ts           # GitHub latest-release fetch
  lib/screens.ts           # catalog types + /screens/ URL helper
  hooks/                   # in-view, reduced motion, gallery theme
  motion/tokens.css        # durations and easings
  index.css                # theme tokens + page CSS
  components/              # one file per section or shared chrome
public/
  screens/                 # WebP 540 / 1080, dark and light
  logo.png, favicon.png, og-image.png, …
```

## Page flow

`App` fetches the latest GitHub release **once** and passes that state into
`Hero`, `Download`, and `InstallGuide`. Those three sections must not fetch
on their own.

```
App
├── Header          sticky island, in-page anchors
├── main
│   ├── Hero        worker badge, CTAs, phone wipe
│   ├── Features    bento of six capabilities
│   ├── Screenshots snap rail + dark/light/auto
│   ├── Download    three APKs (universal / v8 / v7) + size + SHA
│   ├── InstallGuide 3 steps + hashes per APK
│   └── OpenSource  repo / issues / license
└── Footer          tagline, developer, license
```

## Why these splits

| Decision | Why |
| --- | --- |
| Copy in `fa.ts`, not JSX | One file to change tone or fix a typo. Components stay structural. |
| URLs in `links.ts` | Display text is Persian; targets are English GitHub URLs. Mixing them in `fa.ts` made diffs noisy. |
| One `useLatestRelease()` in `App` | Hero chips, download details, and the install hash must show the same version. |
| SHA from `dipi.apk.sha256` (then release notes) | The GitHub API has no checksum field. The browser must not invent or hash the APK. |
| Dark screenshot as LCP | Loading both hero themes as `priority` tanked Performance. Light overlay starts after 1.5s. |
| No router | One job: send a worker to the APK. Extra routes add JS and split Lighthouse. |
| CSS phone frame | Avoids a device PNG and keeps the bezel cheap. |

## Data the page reads

1. **Static:** `fa`, `links`, `screens.json`, files under `public/`.
2. **Network (optional):**
   `https://api.github.com/repos/Dipi-App/app/releases/latest`

If that request fails, the **universal** button still works. It uses the stable
GitHub URL `…/releases/latest/download/dipi.apk`. The v8 and v7 cards then
point at the latest Releases page, because those filenames include the version.
Version chips and SHA hide.

Release parsing lives in `src/lib/release.ts`:

- Universal APK: `dipi.apk` (or `dipi-<version>.apk`).
- 64-bit: asset name contains `arm64-v8a`.
- 32-bit: asset name contains `armeabi-v7a`.
- SHA: `{apk-name}.apk.sha256`, else a notes line that names that file.
- AbortController cancels the fetch on unmount.

## Theming

The **page** is dark only (`html { color-scheme: dark }`). Tokens are in
`src/index.css` `@theme`.

The **gallery** can show dark, light, or follow `prefers-color-scheme` via
`useResolvedTheme`. That switch never changes page chrome.

## Related

- [content.md](content.md) — changing copy
- [screens.md](screens.md) — screenshot files
- [motion.md](motion.md) — animation budget
- [deploy.md](deploy.md) — Pages pipeline
