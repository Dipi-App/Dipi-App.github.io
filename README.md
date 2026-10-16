# Dipi website

Persian RTL landing page for **Dipi**, a free offline Android app for workers.
Live site: <https://dipi-app.github.io/>

This repository is only the website. The Android app lives in
[`Dipi-App/app`](https://github.com/Dipi-App/app). The current APK is for
workers. An employer app is planned as a separate download later.

[![Deploy to GitHub Pages](https://github.com/Dipi-App/Dipi-App.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Dipi-App/Dipi-App.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## What this site does

- Explains Dipi in Persian and makes it obvious the APK is for workers only.
- Serves three worker APKs from the latest GitHub Release: universal
  (`dipi.apk`), 64-bit (`arm64-v8a`), and 32-bit (`armeabi-v7a`), each with
  size and a short note about which phones it fits.
- Shows version, Jalali date, and SHA-256 when the GitHub API is reachable.
- Shows app screenshots (dark / light) from `public/screens/`.

Nothing on this site talks to Dipi’s on-device data. The app is offline. The
only network call the page makes is `GET` latest release from GitHub.

## Stack

Vite 8, React 19, TypeScript, Tailwind CSS 4, Biome, pnpm. No router. No UI kit.

## Run locally

Needs [Node.js 22](https://nodejs.org/) and [pnpm](https://pnpm.io/) 12 (the
repo pins `packageManager` in `package.json`).

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

```bash
pnpm build      # typecheck + production build → dist/
pnpm preview    # serve dist/ locally
pnpm lint       # biome check
pnpm typecheck  # tsc --noEmit
```

## Where to look

| Task | File |
| --- | --- |
| Change Persian copy | [`src/content/fa.ts`](src/content/fa.ts) |
| Change a URL | [`src/lib/links.ts`](src/lib/links.ts) |
| Understand the page | [`docs/architecture.md`](docs/architecture.md) |
| Replace screenshots | [`docs/screens.md`](docs/screens.md) |
| Motion rules | [`docs/motion.md`](docs/motion.md) |
| Ship to GitHub Pages | [`docs/deploy.md`](docs/deploy.md) |
| Contribute | [`CONTRIBUTING.md`](CONTRIBUTING.md) |

## License

[MIT](LICENSE). Same license as the app.
