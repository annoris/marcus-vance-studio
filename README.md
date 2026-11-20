# Marcus Vance :: Creative Developer & Brand Engineer

A minimalist, tactile portfolio & studio showcase built with pure HTML5, CSS3, and vanilla JavaScript. Designed around an **Obsidian Slate & Glacial Cobalt** color system, `Geist` + `Geist Mono` typography, live telemetry HUD, interactive featured stage, hairline-divided Selected Work index, `⌘K` Command Palette, and slide-over editorial drawers.

**[Live Demo → https://annoris.github.io/marcus-vance-studio/](https://annoris.github.io/marcus-vance-studio/)**

---

## Features

- **Obsidian Slate & Glacial Cobalt Theme System:** Dark mode default with instant `localStorage`-persisted Light Mode toggle and subtle SVG paper-grain overlay.
- **Live Telemetry HUD:** Real-time London (`Europe/London`) clock, `requestAnimationFrame` FPS counter, live PerformanceObserver LCP readout, and booking availability indicator.
- **Interactive Stage (`.hv2__stage`):** Full-viewport showcase with flanking prev/next glimpses, smooth vertical title drum transitions, keyboard arrow (`←`/`→`), click, and touch swipe support.
- **Selected Work Index (`.hv2__classic`):** 12 curated projects in a hairline-divided directory with cursor-tracking hover thumbnail previews and Project Detail drawers.
- **Command Palette (`⌘K` / `Ctrl+K`):** Instant search across all projects, editorial sections, and quick actions (`Toggle Theme`, `Copy Email`) with full keyboard navigation.
- **Zero Dependencies:** Pure static frontend — zero build steps, zero frameworks, sub-300ms loads.

---

## Project Structure

```text
marcus-vance-studio/
├── index.html
├── DESIGN_SPEC.md
├── LICENSE
├── README.md
├── data/
│   └── projects.js
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js
    └── images/
        └── solana-qr.png
```

---

## Run Locally

```bash
git clone https://github.com/annoris/marcus-vance-studio.git
cd marcus-vance-studio
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## Support the Project (Solana)

If you find this template useful, you can support ongoing open-source design engineering work via Solana:

<img src="assets/images/solana-qr.png" alt="Solana Wallet QR Code" width="180" />

**SOL Wallet:** `3HvUMCUSSHEdtA35UuD4J7mbgpTxJ7LgT2X7GfdzvBdm`

---

## License

MIT © 2026 Marcus Vance Studio
