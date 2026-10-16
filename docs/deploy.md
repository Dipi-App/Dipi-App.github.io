# How to deploy

The site is static. GitHub Pages serves the `dist/` folder produced on
`main`.

## Automatic

Push to `main`. [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
runs:

1. `pnpm install --frozen-lockfile`
2. `pnpm build` (`tsc --noEmit` + `vite build`)
3. `actions/upload-pages-artifact` on `dist/`
4. `actions/deploy-pages`

`package.json` has `"packageManager": "pnpm@12.3.4"`. The workflow lets
`pnpm/action-setup` read that field. If you bump pnpm, bump that field,
not a hardcoded version in the YAML.

Manual run: Actions → “Deploy to GitHub Pages” → Run workflow.

## Local check before you push

```bash
pnpm lint
pnpm build
pnpm preview
```

`preview` serves the same files Pages will serve. Check:

- Hero still says the APK is for workers.
- Universal download still hits
  `https://github.com/Dipi-App/app/releases/latest/download/dipi.apk`
- v8 and v7 cards show a real asset URL (and size) when the GitHub API works.
- If the GitHub API is blocked, universal still works; v8 / v7 send the user
  to the Releases page.
- Dark hero screenshot is the LCP image (Network panel).

## Vite base

[`vite.config.ts`](../vite.config.ts) uses `base: '/'` because the site is
the domain root (`https://dipi-app.github.io/`), not a project subpath.

## What is not deployed from this repo

The APK is **not** in this repository. Releases are cut from
`Dipi-App/app`. This site only links to them.

Screenshot capture also lives in the app repo. This repo only hosts the
exported WebP files. See [screens.md](screens.md).
