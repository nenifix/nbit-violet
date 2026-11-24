---
name: Kinetic Glass Tech
colors:
  surface: '#11131d'
  surface-dim: '#11131d'
  surface-bright: '#373844'
  surface-container-lowest: '#0c0e18'
  surface-container-low: '#191b26'
  surface-container: '#1d1f2a'
  surface-container-high: '#282934'
  surface-container-highest: '#32343f'
  on-surface: '#e1e1f0'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#e1e1f0'
  inverse-on-surface: '#2e303b'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#cebdff'
  on-secondary: '#381385'
  secondary-container: '#4f319c'
  on-secondary-container: '#bea8ff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#006e95'
  on-tertiary-container: '#caeaff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cebdff'
  on-secondary-fixed: '#21005e'
  on-secondary-fixed-variant: '#4f319c'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#11131d'
  on-background: '#e1e1f0'
  surface-variant: '#32343f'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system captures high-performance engineering through an ethereal, luminous glassmorphism visual language. Tailored for next-generation hardware enthusiasts, IT architects, and gadget tastemakers, the aesthetic delivers an immersive experience that merges architectural glass layers with radiant electric spectrum illumination. 

The aesthetic is built on futuristic precision and atmospheric depth:
- Deep twilight backdrops overlaid with multi-tiered frosted glass substrates.
- Edge lighting, specular rim highlights, and vibrant electromagnetic back-glows.
- Clean, structural layout discipline contrasting against soft luminous diffusions to maintain absolute legibility and commercial clarity.

## Colors
The color palette anchors to an atmospheric deep-space obsidian tone (`#0b0d17`), allowing primary electric violets and high-chroma secondary accents to behave like emitted light rather than flat pigment.

- **Primary Violet Series (`#7c3aed`, `#6d28d9`, `#5b21b6`)**: Used for focal primary actions, reactive illumination states, brand insignias, and glowing radial gradients.
- **Secondary Violet (`#a78bfa`)**: Serves as the specular highlight tone, high-clarity icon tinting, and refined secondary state highlights.
- **Tertiary Cyan (`#38bdf8`)**: An energetic high-tech signal color used selectively for status markers, key specs, and telemetry readouts.
- **Neutral Canvas (`#0b0d17` to `#1e293b`)**: Canvas foundation is deep slate-void (`#0b0d17`), stepped up into frosted container fills (`rgba(15, 23, 42, 0.65)` to `rgba(30, 41, 59, 0.40)`).
- **Luminous White & Crisp Translucents**: `#ffffff` is strictly reserved for high-contrast primary typography and sharp light reflections. Frosted borders use translucent white (`rgba(255, 255, 255, 0.12)`) and translucent violet (`rgba(124, 58, 237, 0.25)`).

## Typography
The pairing leverages **Space Grotesk** for display headers, hardware labels, and architectural data metrics, infusing geometric tech authority. Body copy relies on **Plus Jakarta Sans** for pristine micro-legibility and humanistic clarity against dark, frosted backgrounds.

- Display headers utilize tight negative letter spacing to project dense, engineered power.
- All uppercase product badges, technical spec keys, and breadcrumbs utilize `label-*` tokens with deliberate tracking (`0.04em` to `0.08em`) to mimic instrumentation panels.
- Paragraph text uses slightly relaxed line heights to offset transparency variations in the glass layers beneath.

## Layout & Spacing
The layout adheres to a 12-column fluid grid on desktop (max width 1320px) transitioning to a 6-column grid on tablet, and a single or 2-column stacked configuration on mobile. 

- **Outer Margins**: Desktop layouts breathe with generous `3rem` margins to sustain ambient lighting edges, collapsing to `1.25rem` on mobile viewports.
- **Section Spacing**: Vertical rhythm follows strict multiples of `1rem`, separating hero presentations and hardware galleries with `5rem` to `7rem` voids to keep luminous panels from visually crowding.
- **Component Padding**: Frosted cards maintain an internal structural breathing room via `space-lg` (`1.5rem`), scaling to `space-xl` (`2.5rem`) on hero feature modules.

## Elevation & Depth
Depth is produced via multi-layered optical refraction and spectral halos rather than physical drop shadows:

- **Base Canvas**: Solid obsidian canvas (`#0b0d17`) saturated with static radial gradient lights in electric violet (`rgba(109, 40, 217, 0.15)`) centered beneath interactive feature cards.
- **Surface Tier 1 (Ambient Glass)**: Backdrops apply `backdrop-filter: blur(16px)` with surface fill `rgba(15, 23, 42, 0.5)` and a hairline border of `1px solid rgba(255, 255, 255, 0.08)`.
- **Surface Tier 2 (Elevated Interactive Glass)**: Used for gadget commerce cards and flyouts. Fill is `rgba(30, 41, 59, 0.45)`, blurred at `24px`. Employs a dual-border highlight: top-edge light gradient (`rgba(255, 255, 255, 0.25)`) fading to violet translucency at the bottom (`rgba(124, 58, 237, 0.2)`).
- **Surface Tier 3 (Floating Overlays / Modals)**: Fill `rgba(15, 23, 42, 0.75)` with `backdrop-filter: blur(32px)`, complemented by a multi-layered violet glow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124, 58, 237, 0.2)`.

## Shapes
A balanced curvature (`roundedness: 2`) ensures glass panels resemble polished, laser-machined optical crystal or gorilla glass.

- **Standard Cards and Panels**: Base radius of `1rem` (`rounded-lg`).
- **Pills & Micro Elements**: Spec pills, feature badges, and primary action buttons utilize `rounded-full` or `1.5rem` (`rounded-xl`) to contrast against expansive rectangular visual viewports.
- **Inputs & Micro Triggers**: Standard radius of `0.5rem` to sustain an authentic tactile gadget interface feel.

## Components

### Buttons
- **Primary Electric**: Background gradient of linear `135deg` from `#7c3aed` to `#6d28d9`. Crisp `1px` translucent top highlight (`rgba(255, 255, 255, 0.35)`). Text is solid `#ffffff` (`label-lg`). Hover state triggers an expanded diffuse violet aura (`box-shadow: 0 0 24px rgba(124, 58, 237, 0.5)`).
- **Glass Ghost (Secondary)**: Background is translucent `rgba(255, 255, 255, 0.04)` with `backdrop-filter: blur(12px)`. Border is `1px solid rgba(255, 255, 255, 0.14)`. Hover transitions border to `rgba(167, 139, 250, 0.45)` with subtle violet back-glow.

### Tech Commerce Cards
- Structured container with `rounded-lg` corners, blurred translucent slate background, and a sharp hairline border gradient (`rgba(255, 255, 255, 0.15)` at the top, fading to `rgba(124, 58, 237, 0.15)` at the base).
- Includes an integrated upper hardware stage: an isolated sub-container with low-opacity dark fill (`rgba(0, 0, 0, 0.3)`) to silhouette gadget hardware photography.
- Bottom spec matrix displays performance labels and direct cart actions with luminous secondary button variants.

### Chips & Feature Tags
- Micro-pill design (`rounded-full`, padding: `4px 12px`).
- Background: `rgba(124, 58, 237, 0.12)`.
- Border: `1px solid rgba(167, 139, 250, 0.25)`.
- Typography: `label-sm` in `#a78bfa`. Status indicator dots use tertiary cyan (`#38bdf8`) with an active pulse animation.

### Form Inputs & Search Fields
- Inset glass styling: Background `rgba(11, 13, 23, 0.6)` with inner shadow `inset 0 2px 4px rgba(0, 0, 0, 0.5)`.
- Border: `1px solid rgba(255, 255, 255, 0.1)`.
- Focus state: Border transitions to `#7c3aed`, paired with an external light bloom of `0 0 0 3px rgba(124, 58, 237, 0.25)`.
- Text color is `#ffffff`, placeholder set to `rgba(255, 255, 255, 0.4)`.

### Checkboxes & Segmented Toggles
- Custom `0.5rem` squircle enclosures using `rgba(255, 255, 255, 0.05)` fill and `1px` border.
- Checked state fills with intense electric violet (`#7c3aed`) centered by a luminous crisp white glyph.
- Segmented switches live inside a sunken glass trench (`rgba(0, 0, 0, 0.4)`) with an active sliding pill rendered in elevated frosted glass.

### Telemetry / Spec Readout Lists
- Striped list rows with alternating translucent layers.
- Separated by horizontal hairline dividers (`1px solid rgba(255, 255, 255, 0.05)`).
- Metric titles styled in muted body typography, with numerical values rendered in high-contrast `Space Grotesk` tabular figures.