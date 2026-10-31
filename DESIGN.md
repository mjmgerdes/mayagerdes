# Portfolio Direction

Maya's personal portfolio, not a product landing page. The audience needs to understand her work, credentials, and personality quickly.

## References

- https://studio-noun.com/: staggered pinned imagery, deliberate pacing, restrained navigation.
- https://jptrindade.com/: image-led projects, clean typography, scroll-driven changes in scale.
- https://github.com/LottieFiles/motion-design-skill: consistent timing and coordinated motion.

Borrow the principles, not their assets, palettes, copy, or branding.

## Keep

- The approved introduction, University of Michigan, Ann Arbor / New York.
- Blue accents, the current headshot and favicon, actual project screenshots.
- All eight projects, with Praxigen first, and every experience category.
- The personal archive, piano videos, and aligned drawing/photo interaction.

## Presentation

- White editorial introduction with a compact portrait and a strong name masthead.
- Full-width graphite work section. Images come first; supporting information sits below.
- One horizontal project sequence and a staggered personal photo sequence on roomy screens.
- Normal document flow or native swipe on smaller screens and with reduced motion.
- Native cursor, readable text, minimal borders, and no decorative browser windows.
- Consistent easing: cubic-bezier(0.22, 1, 0.36, 1). Quick feedback, measured entrances, scroll-linked image scale.

## Verification

Build and test desktop, mobile, short windows, reduced motion, keyboard navigation, all project links, gallery controls, drawing flip, and /me and /resume. Preserve content when changing presentation.

Run `npm run test:ui` against the local server on port 4174, or set `BASE_URL` to another preview. Chrome is required. Screenshots default to `/tmp/portfolio-ui-check`; override with `SCREENSHOT_DIR`.
