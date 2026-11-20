# Design Specification — Marcus Vance (`marcus-vance-studio`)

> Faithful structural & aesthetic clone of `https://carterogunsola.com/` reimagined with a brand-new English identity (**Marcus Vance :: Creative Developer & Brand Engineer**) and a custom **Obsidian Slate & Glacial Cobalt** color system. Zero clutter, zero noisy banners, zero chunky fonts — 100% pure editorial restraint and tactile polish.

---

## 1. Brand Identity & Copy Plan (English)

- **Brand / Portfolio Name:** `Marcus Vance` (Studio: `Vance Studio`)
- **Monogram:** `M V ::`
- **Page Title:** `Marcus Vance :: Creative Developer & Brand Engineer`
- **Meta Description:** `Independent creative developer, design engineer, and studio founder crafting tactile web experiences with a taste for pure digital originality. Based in London.`
- **Location / Timezone:** London (`LDN:: HH:MM` live clock in Europe/London)
- **Booking Availability:** `Booking:: Q2’27`
- **Contact Email:** `hello@marcusvance.studio`

---

## 2. Custom Color System (Obsidian Slate & Glacial Cobalt)

Distinct from `carterogunsola.com`'s warm charcoal (`#1e1e1e`) & terracotta (`#e06a4a`), while preserving identical contrast ratios, paper-grain tactility, and dark-by-default behavior (`data-theme="dark"` default, toggleable to `data-theme="light"`).

### Dark Theme (Default — `[data-theme="dark"]`)
```css
:root, [data-theme="dark"] {
  color-scheme: dark;
  --paper: #141619;
  --surface: #1b1e23;
  --card: #1f2329;
  --ink: #f0f2f5;
  --ink-muted: rgba(240, 242, 245, 0.56);
  --fill: rgba(240, 242, 245, 0.08);
  --fill-strong: rgba(240, 242, 245, 0.18);
  --line: rgba(240, 242, 245, 0.08);
  --divider: rgba(240, 242, 245, 0.20);
  --img-outline: rgba(255, 255, 255, 0.10);
  --scrim: rgba(10, 12, 15, 0.68);
  --popover: #1b1e23;
  --btn-fill: rgba(240, 242, 245, 0.92);
  --btn-on: #141619;
  --spot: #4f9cf9;
  --spot-rgb: 79, 156, 249;
  --spot-wash: rgba(79, 156, 249, 0.18);
  --status-dot: #34d399;
}
```

### Light Theme (`[data-theme="light"]`)
```css
[data-theme="light"] {
  color-scheme: light;
  --paper: #e4e6e9;
  --surface: #f7f8fa;
  --card: #dcdfe4;
  --ink: #141619;
  --ink-muted: rgba(20, 22, 25, 0.62);
  --fill: rgba(20, 22, 25, 0.07);
  --fill-strong: rgba(20, 22, 25, 0.16);
  --line: rgba(20, 22, 25, 0.08);
  --divider: rgba(20, 22, 25, 0.20);
  --img-outline: rgba(0, 0, 0, 0.10);
  --scrim: rgba(20, 22, 25, 0.42);
  --popover: #f7f8fa;
  --btn-fill: rgba(20, 22, 25, 0.92);
  --btn-on: #f7f8fa;
  --spot: #1d5fd6;
  --spot-rgb: 29, 95, 214;
  --spot-wash: rgba(29, 95, 214, 0.13);
  --status-dot: #059669;
}
```

### Tactile Paper Grain Overlay
- Fixed full-viewport `pointer-events: none` SVG `feTurbulence` grain layer at `opacity: 0.028` (dark) / `0.035` (light), matching the subtle paper/stone feel of `carterogunsola.com`.

---

## 3. Typography & Spacing Scale

- **Sans (`--font-sans`):** `'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif` (loaded via Google Fonts: `Geist:wght@300;400;500;600` + `Geist+Mono:wght@400;500`).
- **Mono (`--font-mono`):** `'Geist Mono', ui-monospace, SFMono-Regular, monospace`.
- **Type Scale (faithful to original CSS tokens):**
  - `--fs-display`: `clamp(2.5rem, 1.8rem + 3.5vw, 5.25rem)` (Stage active project title, tight tracking `-0.035em`, weight `400`)
  - `--fs-h2`: `clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem)`
  - `--fs-body`: `clamp(0.95rem, 0.92rem + 0.15vw, 1.0625rem)`
  - `--fs-nav`: `0.9375rem` (15px, weight `400`)
  - `--fs-tag`: `0.875rem` (14px)
  - `--fs-meta`: `0.75rem` (12px, monospace)
  - `--fs-hud`: `0.625rem` (10px, monospace, uppercase, tracking `0.06em`)
- **Easing:** `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`

---

## 4. Exact Section-by-Section Structure

### A. Fixed Top Header (`<header class="header">`)
1. **Telemetry HUD Strip (`.hud`)**:
   - Single hairline-bordered micro-bar (`height: 30px`, `--fs-hud`, monospace, uppercase).
   - Items: `LDN:: [live time]`, `FPS:: [live rAF]`, `ONLINE:: 1`, `LCP:: 0.3s`, `MARCUS:: HERE` (green dot), `PRESENCE:: ON`, right-aligned `BOOKING:: Q2’27` (accented in `--spot`).
   - Gracefully hides secondary telemetry items on mobile (`< 768px`) so it stays single-line and clean.
2. **Main Navigation Bar (`.header__bar`)**:
   - Left: Monogram `M V ::` (resets to top / Stage view).
   - Right: Minimal text links: `About`, `Lab`, `Writing`, `Studio`, `Contact` (each opens a clean slide-over drawer with rich, concise editorial content — keeping the main canvas uncluttered).
   - Utility Controls: `⌘K` Command Palette pill button + Theme Toggle icon button (Sun/Moon).

### B. Interactive Stage (`<section class="hv2__stage">`)
- Full-bleed minimal stage (`min-height: calc(100svh - 84px)`) with centered editorial focus and flanking tactile preview cards (left/right prev/next glimpses + active centerpiece frame).
- **Centerpiece Content:**
  - Eyebrow: `01 / 12 — SELECTED WORK` (monospace, `--ink-muted`)
  - Display Title: Active project name (smooth vertical drum/mask transition when switching)
  - Metadata Chips: Collaborator chip (`w/ northstar`) + Year pill (`2026`)
  - Primary CTA: Clean hairline/filled pill `View project ↗` (opens Project Detail Drawer)
- **Interactions:**
  - Click Left/Right preview cards, press `←` / `→` arrow keys, or drag/swipe horizontally to cycle smoothly through projects.
  - Subtle bottom indicator: `Scroll for index ↓` and index counter (`01 — 12`).

### C. Classic Selected Work Index (`<section class="hv2__classic">`)
- Clean editorial directory directly below the stage, inside a generous container (`max-width: 1440px`, responsive padding).
- Section eyebrow: `Selected work` (`.text-meta`, `--ink-muted`).
- **12 Curated Projects** (all original English studio/tech/design projects):
  1. `Kestrel` — `w/ kestrel labs` — `2026`
  2. `Solstice` — `w/ off+grid` — `2026`
  3. `Alder & Co` — `w/ studio alder` — `2025`
  4. `Monolith OS` — `w/ monolith` — `2026`
  5. `Vespera` — `w/ northstar` — `2025`
  6. `Cinder` — `w/ cinder audio` — `2025`
  7. `Halcyon AI` — `w/ halcyon` — `2026`
  8. `Tactile Form` — `w/ form press` — `2024`
  9. `Aether Cloud` — `w/ aether` — `2025`
  10. `Kuro Studio` — `w/ kuro` — `2024`
  11. `Meridian` — `w/ meridian` — `2025`
  12. `Opaline` — `w/ opaline` — `2024`
- **Row Layout (`.row`)**:
  - Flex row: `[Project Title]` + `[Expanding 1px Hairline Rule]` + `[w/ collaborator chip]` + `[Year pill]`.
  - Hovering a row highlights the title in `--spot`, subtly brightens the hairline, and reveals a floating cursor-following preview thumbnail (desktop).
  - Clicking any row opens the **Project Detail Drawer**.

### D. Slide-Over Drawer (`<div id="drawer">`) & Command Palette (`<div class="cmd">`)
- **Slide-Over Drawer**: Smooth right-aligned sheet (`max-width: 540px`, `--surface`, `1px solid var(--line)`) for:
  - **Project Details** (Hero image, role, year, collaborator, concise editorial overview, tech stack chips, live link)
  - **About** (Bio, capabilities, recognition, selected clients)
  - **Lab** (3 interactive/documented WebGL & motion experiments)
  - **Writing** (3 concise essays on design engineering & tactile interfaces)
  - **Studio** (`Vance Studio` overview & engagement model)
  - **Contact** (Copyable email `hello@marcusvance.studio` with toast feedback, availability `Q2’27`, social links)
- **Command Palette (`⌘K` / `Ctrl+K`)**:
  - Instant search across all 12 projects, navigation sections, and actions (`Toggle Dark/Light Theme`, `Copy Email`). Full keyboard navigation (`↑`, `↓`, `Enter`, `Esc`).
- **Toast Notification (`.toast`)**: Minimal bottom-right confirmation pill (e.g., `Email copied to clipboard`).

---

## 5. Verified High-Resolution Image URLs (HTTP 200)

All verified via `curl -I`:
1. `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85` (Abstract fluid architectural form)
2. `https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=85` (3D geometric minimal light study)
3. `https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1400&q=85` (Minimalist ribbed architectural texture)
4. `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85` (Clean modernist architectural pavilion)
5. `https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85` (Minimalist gallery interior)
6. `https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85` (Editorial monochrome portrait/studio)

*(Cycle cleanly across the 12 projects with distinct CSS aspect-ratio framing and subtle tonal filters so every card feels bespoke.)*

---

## 6. Clean Folder Architecture

```text
/Users/annorisfernandez/Documents/Geminis/marcus-vance-studio/
├── DESIGN_SPEC.md
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```
