/**
 * ==========================================================================
 * Copyright (c) 2026 Annoris / Marcus Vance Studio. All Rights Reserved.
 * PROPRIETARY SOFTWARE — Unauthorized copying, cloning, or commercial use
 * without a verified Solana (SOL) license is strictly prohibited.
 * Official Demo: https://annoris.github.io/marcus-vance-studio/
 * ==========================================================================
 * Marcus Vance Studio — Twin-Wheel 100vh Stage Engine
 * Counter-rotating linked 3D curved wheels, live telemetry,
 * peer presence cursors, slide-over drawers, and ⌘K command palette.
 */
(function () {
  'use strict';

  // Proprietary copyright notice in DevTools console
  if (typeof console !== 'undefined' && console.log) {
    console.log(
      '%c © 2026 Annoris / Marcus Vance Studio — All Rights Reserved ',
      'background:#141619;color:#4f9cf9;font-weight:700;padding:6px 10px;border:1px solid #4f9cf9;border-radius:4px;'
    );
    console.log(
      '%cProprietary source code. Copying or commercial use without a verified Solana (SOL) license is prohibited. See README.md for full clean source access.',
      'color:#98a1ae;font-size:12px;'
    );
  }

  // Lightweight right-click deterrent (preserves all interactive UI & Live Demo)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  const DATA = window.MARCUS_VANCE_DATA;
  if (!DATA || !Array.isArray(DATA.projects)) return;

  const PROJECTS = DATA.projects;
  const TOTAL = PROJECTS.length;

  // Custom geometric SVG emblems for the 12 metallic badge tiles
  const BADGE_EMBLEMS = [
    // 01 Kestrel — precision wing / chevron
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 34L24 10L40 34H31L24 23L17 34H8Z"/><circle cx="24" cy="34" r="2.5" fill="currentColor" stroke="none"/></svg>',
    // 02 Solstice — solar horizon ring
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="11"/><path d="M6 24H42"/><circle cx="24" cy="13" r="2.5" fill="currentColor" stroke="none"/></svg>',
    // 03 Alder & Co — architectural arch + plinth
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 37V22C13 15.9 17.9 11 24 11C30.1 11 35 15.9 35 22V37"/><path d="M9 37H39"/><path d="M24 11V37"/></svg>',
    // 04 Monolith OS — stacked slabs
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="11" y="10" width="26" height="8" rx="2"/><rect x="11" y="21" width="26" height="8" rx="2"/><rect x="11" y="32" width="16" height="6" rx="2"/></svg>',
    // 05 Vespera — twin intersecting diamonds
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><polygon points="24,8 38,24 24,40 10,24"/><polygon points="24,15 31,24 24,33 17,24"/></svg>',
    // 06 Cinder — acoustic wave bars
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 20V28M17 14V34M24 9V39M31 15V33M38 20V28"/></svg>',
    // 07 Halcyon — orbital rings
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="24" cy="24" rx="16" ry="8" transform="rotate(-30 24 24)"/><ellipse cx="24" cy="24" rx="16" ry="8" transform="rotate(30 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></svg>',
    // 08 Meridian — compass grid
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="14"/><path d="M24 6V42M6 24H42"/><circle cx="24" cy="24" r="4"/></svg>',
    // 09 Folio — editorial grid frame
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="10" width="28" height="28" rx="3"/><path d="M22 10V38M10 22H38"/></svg>',
    // 10 Foundry — geometric prism
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><polygon points="24,9 39,17 39,31 24,39 9,31 9,17"/><path d="M24 9V39M9 17L39 31"/></svg>',
    // 11 Nocturne — crescent & meridian
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M31 12A13 13 0 1 0 36 31A10 10 0 1 1 31 12Z"/><circle cx="33" cy="17" r="2" fill="currentColor" stroke="none"/></svg>',
    // 12 Opaline — light refraction lens
    '<svg class="hv2__badge-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="19" cy="24" r="10"/><circle cx="29" cy="24" r="10"/></svg>'
  ];

  const UPDATES = [
    {
      date: '2026.11',
      tag: 'STAGE v2',
      title: 'Twin Linked 3D Wheel Architecture',
      desc: 'Rebuilt the primary showcase around a locked 100vh counter-rotating twin-wheel stage with tactile paper grain and 60fps physics.'
    },
    {
      date: '2026.10',
      tag: 'BOOKING',
      title: 'Q2’27 Studio Availability Open',
      desc: 'Accepting two flagship design engineering commissions for Q2’27. Reach out via the Contact drawer.'
    },
    {
      date: '2026.08',
      tag: 'AWARD',
      title: 'Kestrel Named Site of the Day',
      desc: 'Recognized for sub-300ms transitions, kinetic typography, and custom GLSL shader work.'
    }
  ];

  // State
  let activeIndex = 0;
  let targetPos = 0;
  let currentPos = 0;
  let presenceEnabled = true;
  let onlineCount = 124;
  let wheelCooldown = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let isDrawerOpen = false;
  let isCmdkOpen = false;
  let cmdkSelected = 0;
  let cmdkItems = [];

  // DOM References
  const wheelMediaEl = document.getElementById('wheel-media');
  const wheelBadgesEl = document.getElementById('wheel-badges');
  const stageEl = document.getElementById('hv2-stage');
  const counterEl = document.getElementById('stage-counter');
  const titleEl = document.getElementById('stage-title');
  const collabEl = document.getElementById('stage-collab');
  const yearEl = document.getElementById('stage-year');
  const ctaEl = document.getElementById('stage-cta');

  const chipTime = document.getElementById('chip-time');
  const chipFps = document.getElementById('chip-fps');
  const chipOnline = document.getElementById('chip-online');
  const chipPresence = document.getElementById('chip-presence');
  const presenceLayer = document.getElementById('presence-layer');
  const presenceToast = document.getElementById('presence-toast');
  const toastSub = document.getElementById('toast-sub');

  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerEl = document.getElementById('drawer');
  const drawerEyebrow = document.getElementById('drawer-eyebrow');
  const drawerContent = document.getElementById('drawer-content');
  const drawerClose = document.getElementById('drawer-close');

  const cmdkBackdrop = document.getElementById('cmdk-backdrop');
  const cmdkInput = document.getElementById('cmdk-input');
  const cmdkList = document.getElementById('cmdk-list');
  const cmdkTrigger = document.getElementById('cmdk-trigger');

  const mediaCards = [];
  const badgeTiles = [];

  /* ========================================================================
     1. Build Twin Wheel DOM Nodes
     ======================================================================== */
  function buildWheels() {
    wheelMediaEl.innerHTML = '';
    wheelBadgesEl.innerHTML = '';

    PROJECTS.forEach((project, idx) => {
      // Left wheel: Landscape Media Preview Card
      const card = document.createElement('article');
      card.className = 'hv2__media-card';
      card.dataset.index = String(idx);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${project.title} — ${project.year}`);

      const img = document.createElement('img');
      img.src = project.image;
      img.alt = `${project.title} preview`;
      img.loading = idx < 3 ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (project.filter) img.style.filter = project.filter;
      img.onerror = () => {
        img.src = DATA.fallbackImage;
      };
      card.appendChild(img);

      card.addEventListener('click', () => {
        const modActive = mod(activeIndex, TOTAL);
        if (idx === modActive) {
          openProjectDrawer(project);
        } else {
          goToShortestIndex(idx);
        }
      });

      wheelMediaEl.appendChild(card);
      mediaCards.push(card);

      // Right wheel: Square Metallic-Bordered Badge Tile
      const tile = document.createElement('div');
      tile.className = 'hv2__badge-tile';
      tile.dataset.index = String(idx);
      tile.setAttribute('role', 'button');
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('aria-label', `${project.title} emblem`);

      const inner = document.createElement('div');
      inner.className = 'hv2__badge-inner';
      inner.innerHTML = `
        ${BADGE_EMBLEMS[idx % BADGE_EMBLEMS.length]}
        <span class="hv2__badge-code">N°${project.index}</span>
      `;
      tile.appendChild(inner);

      tile.addEventListener('click', () => {
        const modActive = mod(activeIndex, TOTAL);
        if (idx === modActive) {
          openProjectDrawer(project);
        } else {
          goToShortestIndex(idx);
        }
      });

      wheelBadgesEl.appendChild(tile);
      badgeTiles.push(tile);
    });
  }

  /* ========================================================================
     2. Circular Math & Twin-Wheel 3D Arc Positioning
     ======================================================================== */
  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function shortestDelta(fromPos, idx) {
    let diff = idx - mod(fromPos, TOTAL);
    if (diff > TOTAL / 2) diff -= TOTAL;
    if (diff < -TOTAL / 2) diff += TOTAL;
    return diff;
  }

  function goToShortestIndex(targetIdx) {
    const diff = shortestDelta(targetPos, targetIdx);
    stepTo(targetPos + diff);
  }

  function stepBy(delta) {
    stepTo(targetPos + delta);
  }

  function stepTo(newTarget) {
    const prevIdx = mod(Math.round(targetPos), TOTAL);
    targetPos = Math.round(newTarget);
    const nextIdx = mod(targetPos, TOTAL);
    const dir = targetPos > activeIndex ? 1 : -1;
    activeIndex = targetPos;
    if (prevIdx !== nextIdx) {
      updateCenterMetadata(PROJECTS[nextIdx], dir);
    }
  }

  function updateCenterMetadata(project, direction) {
    counterEl.textContent = `N°${project.index} / ${String(TOTAL).padStart(2, '0')}`;
    collabEl.textContent = project.collaborator.toUpperCase();
    yearEl.textContent = project.year;

    // Smooth drum-roll title transition
    const outClass = direction >= 0 ? 'is-rolling-out-up' : 'is-rolling-out-down';
    titleEl.classList.add(outClass);
    setTimeout(() => {
      titleEl.textContent = project.title;
      titleEl.classList.remove('is-rolling-out-up', 'is-rolling-out-down');
    }, 140);
  }

  function layoutWheels(pos) {
    const isMobile = window.innerWidth <= 900;
    const activeMod = mod(Math.round(pos), TOTAL);

    for (let i = 0; i < TOTAL; i++) {
      const offset = shortestDelta(pos, i);
      const absOff = Math.abs(offset);
      const visible = absOff <= 3.2;

      const card = mediaCards[i];
      const tile = badgeTiles[i];

      if (!visible) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        tile.style.opacity = '0';
        tile.style.pointerEvents = 'none';
        continue;
      }

      const opacity = Math.max(0, 1 - absOff * 0.34);
      const scale = Math.max(0.72, 1 - absOff * 0.11);
      const zIndex = Math.round(20 - absOff * 5);

      card.classList.toggle('is-active', i === activeMod);
      tile.classList.toggle('is-active', i === activeMod);
      card.style.zIndex = String(zIndex);
      tile.style.zIndex = String(zIndex);
      card.style.opacity = String(opacity);
      tile.style.opacity = String(opacity);
      card.style.pointerEvents = absOff < 2.2 ? 'auto' : 'none';
      tile.style.pointerEvents = absOff < 2.2 ? 'auto' : 'none';

      if (!isMobile) {
        // Desktop: Vertical opposing circular arcs
        // Left wheel: curves up-left (+24deg) and down-left (-24deg)
        const angleDeg = offset * 24;
        const angleRad = (angleDeg * Math.PI) / 180;
        const radiusMedia = Math.min(window.innerHeight * 0.72, 620);
        const xMedia = (Math.cos(angleRad) - 1) * radiusMedia * 0.62;
        const yMedia = Math.sin(angleRad) * radiusMedia;
        const rotZMedia = -angleDeg;

        card.style.transform = `translate3d(${xMedia.toFixed(1)}px, ${yMedia.toFixed(1)}px, ${(-absOff * 60).toFixed(1)}px) rotateY(8deg) rotateZ(${rotZMedia.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

        // Right wheel: counter-rotating opposing arc
        const badgeAngleDeg = -offset * 24;
        const badgeRad = (badgeAngleDeg * Math.PI) / 180;
        const radiusBadge = Math.min(window.innerHeight * 0.56, 470);
        const xBadge = (1 - Math.cos(badgeRad)) * radiusBadge * 0.58;
        const yBadge = Math.sin(badgeRad) * radiusBadge;
        const rotZBadge = badgeAngleDeg;

        tile.style.transform = `translate3d(${xBadge.toFixed(1)}px, ${yBadge.toFixed(1)}px, ${(-absOff * 50).toFixed(1)}px) rotateY(-10deg) rotateZ(${rotZBadge.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      } else {
        // Mobile: Upper horizontal arc (media) + Lower horizontal arc (badges)
        const angleDeg = offset * 22;
        const angleRad = (angleDeg * Math.PI) / 180;
        const rMobMedia = Math.min(window.innerWidth * 0.92, 420);
        const xMedia = Math.sin(angleRad) * rMobMedia;
        const yMedia = (1 - Math.cos(angleRad)) * 90;

        card.style.transform = `translate3d(${xMedia.toFixed(1)}px, ${yMedia.toFixed(1)}px, 0px) rotateZ(${(angleDeg * 0.45).toFixed(2)}deg) scale(${scale.toFixed(3)})`;

        const rMobBadge = Math.min(window.innerWidth * 0.55, 250);
        const xBadge = Math.sin(-angleRad) * rMobBadge;
        const yBadge = (Math.cos(angleRad) - 1) * 55;

        tile.style.transform = `translate3d(${xBadge.toFixed(1)}px, ${yBadge.toFixed(1)}px, 0px) rotateZ(${(-angleDeg * 0.5).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
    }
  }

  /* ========================================================================
     3. Input Controls (Wheel, Touch Drag, Keyboard)
     ======================================================================== */
  function bindStageControls() {
    window.addEventListener(
      'wheel',
      (e) => {
        if (isDrawerOpen || isCmdkOpen) return;
        e.preventDefault();
        const now = performance.now();
        if (now - wheelCooldown < 160) return;
        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(delta) < 8) return;
        wheelCooldown = now;
        stepBy(delta > 0 ? 1 : -1);
      },
      { passive: false }
    );

    stageEl.addEventListener(
      'touchstart',
      (e) => {
        if (isDrawerOpen || isCmdkOpen) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    stageEl.addEventListener(
      'touchend',
      (e) => {
        if (isDrawerOpen || isCmdkOpen) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const primary = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        if (Math.abs(primary) > 36) {
          stepBy(primary < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCmdk();
        return;
      }

      if (e.key === 'Escape') {
        if (isCmdkOpen) closeCmdk();
        else if (isDrawerOpen) closeDrawer();
        return;
      }

      if (isCmdkOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          moveCmdkSelection(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          moveCmdkSelection(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          runCmdkSelection();
        }
        return;
      }

      if (isDrawerOpen) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        stepBy(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        stepBy(-1);
      } else if (e.key === 'Enter') {
        openProjectDrawer(PROJECTS[mod(activeIndex, TOTAL)]);
      }
    });

    ctaEl.addEventListener('click', () => {
      openProjectDrawer(PROJECTS[mod(activeIndex, TOTAL)]);
    });

    document.getElementById('brand-home').addEventListener('click', (e) => {
      e.preventDefault();
      goToShortestIndex(0);
    });
  }

  /* ========================================================================
     4. Live Presence Cursors & Telemetry
     ======================================================================== */
  const PEERS = [
    { name: 'calm fox', color: '#4f9cf9', x: 0.22, y: 0.28, vx: 0.00018, vy: 0.00013, phase: 0.4 },
    { name: 'swift owl', color: '#38bdf8', x: 0.74, y: 0.24, vx: 0.00015, vy: 0.00019, phase: 2.1 },
    { name: 'keen koi', color: '#a78bfa', x: 0.68, y: 0.78, vx: 0.00014, vy: 0.00016, phase: 4.0 }
  ];

  function initPresenceCursors() {
    presenceLayer.innerHTML = '';
    PEERS.forEach((peer) => {
      const el = document.createElement('div');
      el.className = 'peer-cursor';
      el.innerHTML = `
        <svg class="peer-cursor__arrow" viewBox="0 0 16 16" fill="${peer.color}" stroke="#0e1116" stroke-width="1.2">
          <path d="M2 1.5L13.5 7.2L8.2 8.8L6.2 14L2 1.5Z"/>
        </svg>
        <span class="peer-cursor__tag" style="background:${peer.color}">${peer.name}</span>
      `;
      presenceLayer.appendChild(el);
      peer.el = el;
    });

    chipPresence.addEventListener('click', () => {
      presenceEnabled = !presenceEnabled;
      chipPresence.textContent = presenceEnabled ? 'PRESENCE::ON' : 'PRESENCE::OFF';
      chipPresence.setAttribute('aria-pressed', String(presenceEnabled));
      presenceLayer.classList.toggle('is-hidden', !presenceEnabled);
      presenceToast.classList.toggle('is-hidden', !presenceEnabled);
    });
  }

  function updatePeerCursors(time) {
    if (!presenceEnabled) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    PEERS.forEach((p) => {
      if (!p.el) return;
      const px = (p.x + Math.sin(time * p.vx + p.phase) * 0.09) * w;
      const py = (p.y + Math.cos(time * p.vy + p.phase * 1.3) * 0.08) * h;
      p.el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
    });
  }

  function startTelemetry() {
    // Live London Time
    function updateClock() {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(now);
        chipTime.textContent = `LDN::${fmt}GMT`;
      } catch {
        chipTime.textContent = 'LDN::12:00GMT';
      }
    }
    updateClock();
    setInterval(updateClock, 15000);

    // Subtle online count fluctuation
    setInterval(() => {
      const delta = Math.random() > 0.5 ? 1 : -1;
      onlineCount = Math.max(116, Math.min(138, onlineCount + delta));
      chipOnline.textContent = `ONLINE::${onlineCount}`;
      toastSub.textContent = `${onlineCount} online`;
    }, 6500);
  }

  /* ========================================================================
     5. Theme Toggle (Dark #141619 / Light #e4e6e9)
     ======================================================================== */
  function initTheme() {
    const saved = localStorage.getItem('mv-theme');
    const initial = saved === 'light' ? 'light' : 'dark';
    applyTheme(initial);

    document.querySelectorAll('[data-theme-set]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyTheme(btn.getAttribute('data-theme-set'));
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mv-theme', theme);
    document.querySelectorAll('[data-theme-set]').forEach((btn) => {
      const active = btn.getAttribute('data-theme-set') === theme;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  /* ========================================================================
     6. Slide-Over Drawers
     ======================================================================== */
  function openDrawer(eyebrow, html) {
    drawerEyebrow.textContent = eyebrow;
    drawerContent.innerHTML = html;
    drawerBackdrop.hidden = false;
    drawerEl.hidden = false;
    isDrawerOpen = true;
    requestAnimationFrame(() => {
      drawerBackdrop.classList.add('is-open');
      drawerEl.classList.add('is-open');
    });
  }

  function closeDrawer() {
    isDrawerOpen = false;
    drawerBackdrop.classList.remove('is-open');
    drawerEl.classList.remove('is-open');
    setTimeout(() => {
      if (!isDrawerOpen) {
        drawerBackdrop.hidden = true;
        drawerEl.hidden = true;
      }
    }, 300);
  }

  function openProjectDrawer(project) {
    openDrawer(
      `PROJECT N°${project.index} / ${project.year}`,
      `
        <img class="drawer__hero-img" src="${project.image}" alt="${project.title}" />
        <h2 class="drawer__title" id="drawer-title">${project.title}</h2>
        <p class="drawer__lead">${project.summary}</p>
        <div class="drawer__meta-grid">
          <div class="drawer__meta-box">
            <span class="drawer__meta-label">Collaborator</span>
            <span class="drawer__meta-val">${project.collaborator}</span>
          </div>
          <div class="drawer__meta-box">
            <span class="drawer__meta-label">Role</span>
            <span class="drawer__meta-val">${project.role}</span>
          </div>
          <div class="drawer__meta-box">
            <span class="drawer__meta-label">Category</span>
            <span class="drawer__meta-val">${project.category}</span>
          </div>
          <div class="drawer__meta-box">
            <span class="drawer__meta-label">Year</span>
            <span class="drawer__meta-val">${project.year}</span>
          </div>
        </div>
        <div>
          <span class="drawer__meta-label" style="margin-bottom:8px;">Deliverables &amp; Stack</span>
          <div class="drawer__chips">
            ${project.deliverables.map((d) => `<span class="drawer__chip">${d}</span>`).join('')}
            ${project.stack.map((s) => `<span class="drawer__chip">${s}</span>`).join('')}
          </div>
        </div>
        <a class="drawer__cta-link" href="${project.url}" target="_blank" rel="noopener noreferrer">
          Visit live site ↗
        </a>
      `
    );
  }

  function openSectionDrawer(key) {
    if (key === 'about') {
      const a = DATA.about;
      openDrawer(
        'ABOUT :: MARCUS VANCE',
        `
          <h2 class="drawer__title" id="drawer-title">Marcus Vance</h2>
          <p class="drawer__lead">${a.intro}</p>
          <p class="drawer__lead">${a.philosophy}</p>
          <div class="drawer__chips">
            ${a.capabilities.map((c) => `<span class="drawer__chip">${c}</span>`).join('')}
          </div>
          ${a.recognition
            .map(
              (r) => `
            <div class="drawer__card">
              <div class="drawer__card-top"><span>${r.label}</span><span>RECOGNITION</span></div>
              <div class="drawer__card-desc">${r.detail}</div>
            </div>
          `
            )
            .join('')}
        `
      );
    } else if (key === 'lab') {
      openDrawer(
        'LAB :: EXPERIMENTS',
        `
          <h2 class="drawer__title" id="drawer-title">Interaction Lab</h2>
          <p class="drawer__lead">Small optical, motion, and performance studies engineered in vanilla web standards.</p>
          ${DATA.lab
            .map(
              (item) => `
            <div class="drawer__card">
              <div class="drawer__card-top"><span>${item.code}</span><span>${item.status} · ${item.year}</span></div>
              <div class="drawer__card-title">${item.title}</div>
              <div class="drawer__card-desc">${item.description}</div>
            </div>
          `
            )
            .join('')}
        `
      );
    } else if (key === 'writing') {
      openDrawer(
        'WRITING :: NOTES',
        `
          <h2 class="drawer__title" id="drawer-title">Writing</h2>
          ${DATA.writing
            .map(
              (post) => `
            <div class="drawer__card">
              <div class="drawer__card-top"><span>${post.date}</span><span>${post.readTime}</span></div>
              <div class="drawer__card-title">${post.title}</div>
              <div class="drawer__card-desc">${post.excerpt}</div>
            </div>
          `
            )
            .join('')}
        `
      );
    } else if (key === 'studio') {
      const s = DATA.studio;
      openDrawer(
        'STUDIO :: PRACTICE',
        `
          <h2 class="drawer__title" id="drawer-title">${s.name}</h2>
          <p class="drawer__lead">${s.lead}</p>
          <p class="drawer__lead">${s.description}</p>
          ${s.engagements
            .map(
              (eng) => `
            <div class="drawer__card">
              <div class="drawer__card-top"><span>ENGAGEMENT</span><span>${eng.timeline}</span></div>
              <div class="drawer__card-title">${eng.title}</div>
              <div class="drawer__card-desc">${eng.detail}</div>
            </div>
          `
            )
            .join('')}
        `
      );
    } else if (key === 'contact') {
      const c = DATA.contact;
      openDrawer(
        `CONTACT :: BOOKING ${c.booking}`,
        `
          <h2 class="drawer__title" id="drawer-title">Start a conversation</h2>
          <p class="drawer__lead">Currently booking select design engineering and digital flagship engagements for ${c.booking}.</p>
          <div class="drawer__meta-grid">
            <div class="drawer__meta-box">
              <span class="drawer__meta-label">Direct Email</span>
              <span class="drawer__meta-val">${c.email}</span>
            </div>
            <div class="drawer__meta-box">
              <span class="drawer__meta-label">Location</span>
              <span class="drawer__meta-val">${c.location}</span>
            </div>
          </div>
          <a class="drawer__cta-link" href="mailto:${c.email}">Email ${c.email} ↗</a>
          <div class="drawer__chips">
            ${c.socials.map((s) => `<a class="drawer__chip" href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} · ${s.handle}</a>`).join('')}
          </div>
        `
      );
    } else if (key === 'updates') {
      openDrawer(
        "WHAT'S NEW :: CHANGELOG",
        `
          <h2 class="drawer__title" id="drawer-title">What’s new</h2>
          ${UPDATES.map(
            (u) => `
            <div class="drawer__card">
              <div class="drawer__card-top"><span>${u.tag}</span><span>${u.date}</span></div>
              <div class="drawer__card-title">${u.title}</div>
              <div class="drawer__card-desc">${u.desc}</div>
            </div>
          `
          ).join('')}
        `
      );
    }
  }

  function bindDrawers() {
    document.querySelectorAll('[data-drawer]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openSectionDrawer(btn.getAttribute('data-drawer'));
      });
    });
    drawerClose.addEventListener('click', closeDrawer);
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  /* ========================================================================
     7. ⌘K Command Palette
     ======================================================================== */
  function buildCmdkCatalog() {
    const navCmds = [
      { code: 'NAV', title: 'About Marcus Vance', meta: 'Drawer', action: () => openSectionDrawer('about') },
      { code: 'NAV', title: 'Interaction Lab', meta: 'Drawer', action: () => openSectionDrawer('lab') },
      { code: 'NAV', title: 'Writing & Essays', meta: 'Drawer', action: () => openSectionDrawer('writing') },
      { code: 'NAV', title: 'Vance Studio', meta: 'Drawer', action: () => openSectionDrawer('studio') },
      { code: 'NAV', title: 'Contact & Booking (Q2’27)', meta: 'Drawer', action: () => openSectionDrawer('contact') },
      {
        code: 'SYS',
        title: 'Toggle Dark / Light Theme',
        meta: 'Theme',
        action: () => {
          const curr = document.documentElement.getAttribute('data-theme');
          applyTheme(curr === 'dark' ? 'light' : 'dark');
        }
      }
    ];

    const projCmds = PROJECTS.map((p, idx) => ({
      code: `N°${p.index}`,
      title: p.title,
      meta: `${p.collaborator} · ${p.year}`,
      action: () => {
        goToShortestIndex(idx);
      }
    }));

    return [...projCmds, ...navCmds];
  }

  const ALL_CMDK = buildCmdkCatalog();

  function renderCmdkList(query) {
    const q = (query || '').trim().toLowerCase();
    cmdkItems = q
      ? ALL_CMDK.filter((item) => `${item.code} ${item.title} ${item.meta}`.toLowerCase().includes(q))
      : ALL_CMDK;
    cmdkSelected = 0;

    cmdkList.innerHTML = cmdkItems
      .map(
        (item, idx) => `
      <button type="button" class="cmdk-item ${idx === 0 ? 'is-selected' : ''}" data-cmdk-idx="${idx}" role="option">
        <span class="cmdk-item__left">
          <span class="cmdk-item__code">${item.code}</span>
          <span class="cmdk-item__title">${item.title}</span>
        </span>
        <span class="cmdk-item__meta">${item.meta}</span>
      </button>
    `
      )
      .join('');

    cmdkList.querySelectorAll('.cmdk-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        cmdkSelected = Number(btn.dataset.cmdkIdx);
        runCmdkSelection();
      });
    });
  }

  function moveCmdkSelection(delta) {
    if (!cmdkItems.length) return;
    cmdkSelected = mod(cmdkSelected + delta, cmdkItems.length);
    cmdkList.querySelectorAll('.cmdk-item').forEach((el, idx) => {
      el.classList.toggle('is-selected', idx === cmdkSelected);
      if (idx === cmdkSelected) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function runCmdkSelection() {
    const item = cmdkItems[cmdkSelected];
    if (!item) return;
    closeCmdk();
    item.action();
  }

  function openCmdk() {
    isCmdkOpen = true;
    cmdkBackdrop.hidden = false;
    cmdkInput.value = '';
    renderCmdkList('');
    setTimeout(() => cmdkInput.focus(), 10);
  }

  function closeCmdk() {
    isCmdkOpen = false;
    cmdkBackdrop.hidden = true;
  }

  function toggleCmdk() {
    if (isCmdkOpen) closeCmdk();
    else openCmdk();
  }

  function bindCmdk() {
    cmdkTrigger.addEventListener('click', openCmdk);
    cmdkBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdkBackdrop) closeCmdk();
    });
    cmdkInput.addEventListener('input', (e) => renderCmdkList(e.target.value));
  }

  /* ========================================================================
     8. Main 60fps Animation Loop (Wheel Spring + FPS + Peer Cursors)
     ======================================================================== */
  let frameCount = 0;
  let lastFpsTime = performance.now();

  function tick(now) {
    // Smooth exponential spring interpolation for twin wheels
    currentPos += (targetPos - currentPos) * 0.11;
    if (Math.abs(targetPos - currentPos) < 0.0005) {
      currentPos = targetPos;
    }

    layoutWheels(currentPos);
    updatePeerCursors(now);

    // Live FPS readout
    frameCount++;
    if (now - lastFpsTime >= 1000) {
      const fps = Math.min(120, Math.round((frameCount * 1000) / (now - lastFpsTime)));
      chipFps.textContent = `FPS::${fps}`;
      frameCount = 0;
      lastFpsTime = now;
    }

    requestAnimationFrame(tick);
  }

  /* ========================================================================
     Bootstrap
     ======================================================================== */
  buildWheels();
  initTheme();
  initPresenceCursors();
  startTelemetry();
  bindStageControls();
  bindDrawers();
  bindCmdk();
  requestAnimationFrame(tick);
})();
