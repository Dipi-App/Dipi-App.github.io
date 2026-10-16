# Contributing to the Dipi website

Thanks for helping. Keep pull requests small and easy to review.

## Repos

| Repo | What it is |
| --- | --- |
| [`Dipi-App/Dipi-App.github.io`](https://github.com/Dipi-App/Dipi-App.github.io) | This website (you are here) |
| [`Dipi-App/app`](https://github.com/Dipi-App/app) | Android app. File issues about the app there. |

## Getting started

1. Fork and branch from `main`.
2. `pnpm install`
3. `pnpm dev` for the landing page.
4. Make the change.
5. Run the checks below.
6. Open a pull request.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

All three must pass.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`,
`fix:`, `docs:`, `chore:`. A breaking change uses `!` (`feat!: …`).

## Rules that are easy to miss

- **Persian only on the public page.** Edit copy in `src/content/fa.ts`, not
  inside components. English is for this `docs/` set and for code identifiers.
- **Workers only.** This APK is not for employers. Do not add an employer
  download, and do not imply one exists.
- **No new JavaScript libraries** unless the change cannot be done with the
  current stack. Budget: added JS under 30 KB gzip. No WebGL, video, or
  animation frameworks.
- **Fonts:** Vazirmatn arabic 400 and 700 only (`src/main.tsx`). Extra weights
  hurt LCP.
- **Motion:** animate `transform` and `opacity` only. The two exceptions are
  the hero phone `clip-path` wipe and the sticky header `backdrop-filter`.
  See [docs/motion.md](docs/motion.md).
- **Lighthouse** on mobile (360 CSS px) should stay 90+ on all four categories
  after a visual change. Check Performance before adding images, fonts, or JS.
- **Screenshots** are not committed from a phone dump. Follow
  [docs/screens.md](docs/screens.md).
- Do not commit `.env`, secrets, or `node_modules/`.

## Reporting bugs

- Website bug or docs issue → this repository.
- App bug or feature → [`Dipi-App/app` issues](https://github.com/Dipi-App/app/issues).
