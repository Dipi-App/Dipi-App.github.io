# Website docs and redesign

Approved 16 Oct 2026. One landing page. English docs. Persian site. Ink + gold brand kept.

## Goal

Give the open-source website a contributor-facing doc set, and a new composition that still reads as Dipi: workers-only, dark teal, gold, offline Android APK.

## Constraints (do not break)

- Persian RTL only on the public site. All copy stays in `src/content/fa.ts`.
- This APK is for workers. Employer app is a later, separate download. Do not promise an employer APK.
- Stack stays Vite 8 + React 19 + Tailwind 4 + Biome + pnpm. No new JS libraries.
- Vazirmatn arabic 400 and 700 only. Do not add font weights.
- Motion: `transform` and `opacity` only, except the existing hero `clip-path` wipe and sticky header blur.
- Added JS stays under 30 KB gzip. No WebGL, video, or heavy animation libraries.
- `prefers-reduced-motion: reduce` freezes motion on the final state.
- Lighthouse mobile 90+ on Performance, Accessibility, Best Practices, and SEO.
- GitHub Pages deploy from `main` stays as-is.

## Docs (Diataxis)

| File | Quadrant | Reader |
| --- | --- | --- |
| `README.md` | Tutorial + front door | Newcomer |
| `CONTRIBUTING.md` | How-to | Contributor |
| `LICENSE` | Legal | Everyone |
| `docs/architecture.md` | Explanation | Contributor |
| `docs/content.md` | How-to | Copy / i18n |
| `docs/screens.md` | How-to | Screenshot pipeline |
| `docs/motion.md` | Reference | UI / motion |
| `docs/deploy.md` | How-to | Release / CI |

No extra doc framework. Plain Markdown.

## Redesign

Same sections, new composition:

1. Floating island header (glass when stuck). Mobile uses `<details>` for the extra links — no hamburger JS.
2. Type-led hero. Smaller mark (header already brands). Stronger worker badge + audience note. Phone stays, dark-first LCP.
3. Feature bento: calendar wide, offline accent, four standard cards. Not a 3×2 equal grid.
4. Screenshot rail kept (snap + theme control). Theme control aligns start in RTL.
5. Download is a double-bezel island: worker warning first, then APK button, then SHA/version.
6. Install, open source, developer, footer: more space, same content.
7. Fixed grain overlay (`pointer-events: none`). Fewer, quieter blobs.

## Out of scope

- Employer app or a second APK button.
- Routing / extra pages.
- Changing app features or the Flutter screenshot pipeline itself.
- Committing or deploying unless asked.
