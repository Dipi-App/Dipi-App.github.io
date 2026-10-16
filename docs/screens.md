# How to replace screenshots

The gallery and the hero phone read a catalog, not a folder listing.

## Files

Put WebP files in [`public/screens/`](../public/screens/):

```
{id}-{dark|light}-{540|1080}.webp
```

Example: `1-calendar-paid-dark-540.webp`

- **540** is the default `src` (LCP-friendly).
- **1080** is the `2x` source.
- Quality target used in the app export: 85.

Keep `public/screens/screens.json` and `src/content/screens.json` in sync.
`src/lib/screens.ts` imports the content copy at build time. The public copy
is what GitHub Pages also serves if anything fetches it at runtime.

## Catalog shape

```json
{
  "id": "1-calendar-paid",
  "title": "تقویم — روز پرداخت‌شده",
  "alt": "تقویم شمسی دیپی با یک روز کاری پرداخت‌شده…",
  "files": {
    "dark": { "540": "1-calendar-paid-dark-540.webp", "1080": "…" },
    "light": { "540": "…", "1080": "…" }
  }
}
```

`title` is the visible caption. `alt` is the accessible description — write a
real sentence, not the file name.

Hero uses **the first catalog entry** (`screens[0]`) for the phone wipe.
The first dark 540 file is also preloaded in `index.html`. If you reorder
the catalog, update that preload href.

## Capture pipeline (app repo)

Screenshots are produced in the Flutter app repo, not here:

1. `app/tool/screenshots/capture.sh` on the `dipi_shots` emulator
2. `app/tool/screenshots/export.sh` → WebP 540/1080
3. Copy the WebP files + `screens.json` into `website/public/screens/`
   and `website/src/content/screens.json`

Do not commit raw PNG dumps from `app/shots/` into this repo.

## Performance rules

- Do not mark gallery images `priority`. Only the hero dark shot is LCP.
- The gallery renders **one theme at a time** so the browser does not
  download 18 extra files on first paint.
- Keep filenames stable when you can. Changing the first dark 540 name
  requires an `index.html` preload edit.
