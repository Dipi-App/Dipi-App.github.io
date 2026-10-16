# Motion reference

Tokens live in [`src/motion/tokens.css`](../src/motion/tokens.css).
Hooks: `usePrefersReducedMotion`, `useInView`.

## Tokens

| Token | Value | Used for |
| --- | --- | --- |
| `--motion-fast` | 200ms | hovers, gallery crossfade, shot scale |
| `--motion-in` | 500ms | fade-up enter |
| `--motion-wipe` | 900ms | hero phone clip-path |
| `--motion-underline` | 600ms | section title gold line |
| `--motion-stagger` | 60ms | fade-up delay step (JS) |
| `--motion-hero-cycle` | 5s | dark ↔ light phone cycle |
| `--motion-blob` | 26s | background blob drift |
| `--motion-shine` | 6s | download button sheen |
| `--motion-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | enters |
| `--motion-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | loops |

Change a duration here, not as a magic number in a component, unless the
value is JS-only (`CYCLE_MS` in `HeroPhone` must stay aligned with
`--motion-hero-cycle`).

## Allowed properties

Animate **`transform` and `opacity` only**.

Exceptions that already exist and must stay documented if touched:

1. Hero phone wipe — `clip-path: circle(…)`
2. Sticky header — `backdrop-filter` when `.is-stuck`

Do not animate `top`, `left`, `width`, `height`, or `margin`.
Do not add WebGL, canvas particles, or a motion library.

`backdrop-filter` belongs on the sticky header island only. Do not blur
scrolling sections.

## Enter

`FadeUp` sets `.fade-up` and flips `.is-in` after mount, or after
`IntersectionObserver` when `onView` is true.

```tsx
<FadeUp delayMs={120}>…</FadeUp>
<FadeUp onView delayMs={index * 60}>…</FadeUp>
```

## Reduced motion

`@media (prefers-reduced-motion: reduce)` in `src/index.css`:

- animations and transitions collapse to ~0
- `.fade-up`, `.shot-card`, `.hero-phone-overlay`, `.shot-layer` snap to
  the visible end state
- blobs and the download sheen stop

`usePrefersReducedMotion` mirrors that media query for JS (hero cycle,
gallery observer). If you add a new animation, honor both the CSS media
query and this hook.

## JS budget

No new animation dependency. Added JavaScript for the whole site stays
under **30 KB gzip**. IntersectionObserver and a couple of `useEffect`s
are the intended motion engine.
