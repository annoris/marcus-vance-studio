<div align="center">

# MARCUS VANCE STUDIO (`MV`)

**Interactive Creative Developer Portfolio — Locked 100vh Counter-Rotating Twin-Wheel Stage, Live Telemetry HUD & `⌘K` Command Palette**

<p>
  <a href="https://annoris.github.io/marcus-vance-studio/">
    <img src="https://img.shields.io/badge/LIVE_DEMO-Launch_Studio-4F9CF9?style=for-the-badge&logo=githubpages&logoColor=141619" alt="Live Demo" />
  </a>
  <a href="https://github.com/annoris/marcus-vance-studio/stargazers">
    <img src="https://img.shields.io/badge/STAR_THIS_REPO-Support_Project-1C1F24?style=for-the-badge&logo=github&logoColor=F3F5F8" alt="Star on GitHub" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/HTML5-Semantic-141619?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-Obsidian_%26_Cobalt-4F9CF9?style=flat-square&logo=css3&logoColor=141619" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-Vanilla_ES6-98A1AE?style=flat-square&logo=javascript&logoColor=141619" alt="Vanilla ES6" />
  <img src="https://img.shields.io/badge/Dependencies-Zero-1C1F24?style=flat-square" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/License-MIT-4F9CF9?style=flat-square" alt="MIT License" />
</p>

<br />

<a href="https://annoris.github.io/marcus-vance-studio/">
  <img src="./assets/images/project-01.jpg" alt="Marcus Vance Studio — Interactive Twin-Wheel Portfolio Preview" width="100%" />
</a>

**[Launch Live Studio](https://annoris.github.io/marcus-vance-studio/)** · **[Twin-Wheel Architecture](#-core-architecture--features)** · **[Design System](#-obsidian-slate--glacial-cobalt-design-system)** · **[Quick Start](#-quick-start-local-setup)** · **[Support via Solana](#-support--contribute-full-source-access)**

</div>

---

## About Marcus Vance Studio (`MV`)

**Marcus Vance Studio (`MV`)** is an interactive, kinetic portfolio and design-engineering showcase built for a London-based creative developer and studio founder. Instead of a traditional scrolling webpage, the entire experience lives inside a **locked `100vw × 100vh` viewport stage** driven by a counter-rotating twin-wheel navigation engine, real-time telemetry HUD, live multiplayer presence cursors, and a keyboard-first `⌘K` Command Palette.

Engineered with **pure HTML5, CSS3, and Vanilla ES6 JavaScript**, it delivers 60fps tactile motion with **zero build tools and zero external runtime dependencies**.

### Why Star or Fork This Repo?

- **Signature Counter-Rotating Twin-Wheel Stage**: Locked `100vw × 100vh` canvas with smooth inertial wheel, pointer drag, and keyboard arrow navigation.
- **Live Telemetry HUD**: Real-time London clock (`LDN::`), live `FPS` monitor, `LCP` metric, `ONLINE` counter, `PRESENCE::ON/OFF` toggle, and `BOOKING` status chip.
- **Multiplayer Presence & `⌘K` Command Palette**: Ambient floating peer cursors with presence toast notifications, plus an instant keyboard-driven command palette (`⌘K` / `Ctrl+K`) to jump to any project, drawer, or theme.
- **12 Curated Projects + 6 Slide-Over Drawers**: Custom geometric SVG emblems, high-contrast case-study cards, and slide-over drawers (`About`, `Lab`, `Writing`, `Studio`, `Contact`, `What's new`).
- **100% Open Source (MIT)**: Complete, full-featured source code ready to customize and deploy in seconds.

---

## Core Architecture & Features

- **Locked `100vw × 100vh` Twin-Wheel Stage**: Dual counter-rotating radial wheels—one displaying tactile project tiles with custom geometric emblems, and the paired stage presenting full-bleed project artwork and metadata. Supports mouse wheel, touch/pointer drag, and `↑ / ↓ / ← / →` keyboard navigation.
- **Live Telemetry HUD (`96px` 2-Tier Header)**:
  - `LDN::` real-time London GMT/BST clock
  - Live `FPS::` frame-rate readout via `requestAnimationFrame`
  - `LCP::` Largest Contentful Paint performance readout
  - `ONLINE::` active visitors indicator & `PRESENCE::ON` cursor toggle
  - `BOOKING::` direct trigger into the Contact & Booking drawer
- **Live Presence Cursors & Toast**: Smoothly animated ambient peer cursors gliding across the canvas (`pointer-events: none`), paired with non-intrusive presence toast notifications and one-click toggle.
- **`⌘K` Command Palette**: Instant fuzzy-style quick-switcher for all 12 projects, all 6 studio drawers, Dark/Light theme toggle, and presence controls.
- **12 Curated Projects & Custom Geometric Emblems**: Every project features a bespoke geometric SVG mark, discipline tags, year, interactive preview card, and detailed case-study drawer.
- **6 Slide-Over Studio Drawers**: Seamless glassmorphic drawers for **About**, **Lab**, **Writing**, **Studio**, **Contact**, and **What's new**—with keyboard `Escape` dismissal and backdrop blur.

---

## Obsidian Slate & Glacial Cobalt Design System

### Color Tokens — Dark Default & Cool Stone Paper Light Mode

| Swatch | Token | Dark (`Obsidian Slate`) | Light (`Cool Stone Paper`) | Role |
| :---: | :--- | :--- | :--- | :--- |
| ![#141619](https://img.shields.io/badge/-%20-141619?style=flat-square) | `--bg` | `#141619` | `#E4E6E9` | Primary locked viewport canvas |
| ![#1C1F24](https://img.shields.io/badge/-%20-1C1F24?style=flat-square) | `--surface-solid` | `#1C1F24` | `#F4F5F7` | Cards, drawers & command palette |
| ![#F3F5F8](https://img.shields.io/badge/-%20-F3F5F8?style=flat-square) | `--text` | `#F3F5F8` | `#141619` | Primary editorial typography |
| ![#98A1AE](https://img.shields.io/badge/-%20-98A1AE?style=flat-square) | `--text-muted` | `#98A1AE` | `#525965` | Secondary metadata & labels |
| ![#4F9CF9](https://img.shields.io/badge/-%20-4F9CF9?style=flat-square) | `--accent` | `#4F9CF9` | `#2F7DE1` | Glacial Cobalt — active states & focus |

### Typography

- **Display & UI Sans**: `Geist` / `Inter` (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`)
- **Telemetry & Micro-Labels**: `Geist Mono` / `JetBrains Mono` (`ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`)

---

## Project Structure

```text
marcus-vance-studio/
├── index.html                  # Locked 100vh stage, 2-tier telemetry HUD, drawers & ⌘K palette
├── DESIGN_SPEC.md              # Full architectural & visual design specification
├── assets/
│   ├── css/
│   │   └── styles.css          # Obsidian Slate & Cool Stone tokens, twin-wheel layout & grain
│   ├── js/
│   │   └── app.js              # Twin-wheel physics, live telemetry, presence cursors & ⌘K logic
│   └── images/
│       ├── project-01.jpg ... project-12.jpg   # 12 curated project visuals
│       └── solana-qr.png       # Solana (SOL) support wallet QR code
├── data/
│   └── projects.js             # 12 curated projects, geometric SVG emblems & drawer content
├── .gitignore
├── LICENSE
└── README.md
```

---

## Quick-Start Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/annoris/marcus-vance-studio.git
cd marcus-vance-studio

# 2. Serve locally (no build step required)
npx serve .
# or
python3 -m http.server 8080
```

Open **`http://localhost:8080`** in your browser—or explore it live right now at **[https://annoris.github.io/marcus-vance-studio/](https://annoris.github.io/marcus-vance-studio/)**.

---

## Support / Contribute & Full Source Access

The **complete, full-featured source code** for Marcus Vance Studio (`MV`)—the twin-wheel physics engine, live telemetry HUD, presence cursors, `⌘K` Command Palette, all 12 projects, and both Dark & Light themes—is included right here in this repository under the [MIT License](LICENSE).

If this project inspires your own portfolio or saves you hours of creative engineering, consider **starring the repository** or supporting future open-source releases via **Solana (SOL)**:

<div align="center">

| Network | Wallet Address |
| :--- | :--- |
| **Solana (`SOL`)** | `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm` |

<br />

<img src="./assets/images/solana-qr.png" width="220" alt="Receive SOL QR Code" />

</div>

> **Warning:** Only send **SOL** on the **Solana network** to this wallet address. Sending tokens on any other network may result in permanent loss of funds.

---

<div align="center">
  <sub>If you found this studio showcase useful, please consider giving it a ⭐ on <a href="https://github.com/annoris/marcus-vance-studio">GitHub</a> and sharing the <a href="https://annoris.github.io/marcus-vance-studio/">Live Demo</a>.</sub>
</div>
