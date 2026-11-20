/**
 * Marcus Vance :: Creative Developer & Brand Engineer
 * Interactive Stage, Telemetry HUD, Selected Work Index,
 * Command Palette (⌘K), and Slide-Over Drawers.
 */

(function () {
  'use strict';

  const DATA = window.MARCUS_VANCE_DATA;
  if (!DATA) return;

  const STAGE_PROJECTS = DATA.projects.filter((p) => p.featured);
  const ALL_PROJECTS = DATA.projects;
  const FALLBACK_IMG = DATA.fallbackImage;

  const state = {
    stageIndex: 0,
    isSwitching: false,
    drawerOpen: false,
    cmdOpen: false,
    cmdFiltered: [],
    cmdActiveIndex: 0,
    toastTimer: null
  };

  /* DOM References */
  const el = {
    root: document.documentElement,
    body: document.body,
    hudTime: document.getElementById('hud-time'),
    hudFps: document.getElementById('hud-fps'),
    hudLcp: document.getElementById('hud-lcp'),
    themeToggle: document.getElementById('theme-toggle'),
    cmdTrigger: document.getElementById('cmd-trigger'),

    stage: document.getElementById('stage'),
    stageCounter: document.getElementById('stage-counter'),
    stageFooterCounter: document.getElementById('stage-footer-counter'),
    stageFrame: document.getElementById('stage-frame'),
    stageFrameRight: document.getElementById('stage-frame-right'),
    stageImg: document.getElementById('stage-img'),
    stageImgRight: document.getElementById('stage-img-right'),
    stageLeftCaption: document.getElementById('stage-left-caption'),
    stageRightCaption: document.getElementById('stage-right-caption'),
    stageTitle: document.getElementById('stage-title'),
    stageCollab: document.getElementById('stage-collab'),
    stageYear: document.getElementById('stage-year'),
    stageViewBtn: document.getElementById('stage-view-btn'),
    stagePrevCard: document.getElementById('stage-prev-card'),
    stageNextCard: document.getElementById('stage-next-card'),
    stagePrevImg: document.getElementById('stage-prev-img'),
    stageNextImg: document.getElementById('stage-next-img'),
    stagePrevBtn: document.getElementById('stage-prev-btn'),
    stageNextBtn: document.getElementById('stage-next-btn'),

    classicList: document.getElementById('classic-list'),
    hoverPreview: document.getElementById('hover-preview'),
    hoverPreviewImg: document.getElementById('hover-preview-img'),

    drawerBackdrop: document.getElementById('drawer-backdrop'),
    drawer: document.getElementById('drawer'),
    drawerEyebrow: document.getElementById('drawer-eyebrow'),
    drawerBody: document.getElementById('drawer-body'),
    drawerClose: document.getElementById('drawer-close'),

    cmd: document.getElementById('cmd'),
    cmdInput: document.getElementById('cmd-input'),
    cmdList: document.getElementById('cmd-list'),

    toast: document.getElementById('toast')
  };

  /* ========================================================================
     1. Utilities & Safe Image Fallback
     ======================================================================== */
  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function applyImageFallback(img) {
    if (!img) return;
    img.onerror = function () {
      if (this.dataset.fallbackApplied) return;
      this.dataset.fallbackApplied = '1';
      this.src = FALLBACK_IMG;
    };
  }

  function showToast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      el.toast.classList.remove('is-visible');
    }, 2400);
  }

  function copyEmail() {
    const email = DATA.brand.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => showToast('Email copied to clipboard'))
        .catch(() => fallbackCopy(email));
    } else {
      fallbackCopy(email);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Email copied to clipboard');
    } catch (_) {
      showToast(text);
    }
    document.body.removeChild(ta);
  }

  /* ========================================================================
     2. Theme System (Dark Default, localStorage Persisted)
     ======================================================================== */
  function initTheme() {
    const saved = localStorage.getItem('mv-theme');
    const theme = saved === 'light' ? 'light' : 'dark';
    el.root.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = el.root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    el.root.setAttribute('data-theme', next);
    localStorage.setItem('mv-theme', next);
    showToast(`Theme switched to ${next}`);
  }

  /* ========================================================================
     3. Live Telemetry HUD (London Clock, rAF FPS, Performance LCP)
     ======================================================================== */
  function initTelemetry() {
    // Live Europe/London Clock
    const updateClock = () => {
      if (!el.hudTime) return;
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: DATA.brand.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(now);
        el.hudTime.textContent = formatted;
      } catch (_) {
        const now = new Date();
        el.hudTime.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      }
    };
    updateClock();
    setInterval(updateClock, 15000);

    // Live rAF FPS Counter
    if (el.hudFps) {
      let frames = 0;
      let lastTime = performance.now();
      const tick = (now) => {
        frames += 1;
        if (now - lastTime >= 1000) {
          const fps = Math.min(120, Math.round((frames * 1000) / (now - lastTime)));
          el.hudFps.textContent = String(fps);
          frames = 0;
          lastTime = now;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    // Real LCP / Load Telemetry
    if (el.hudLcp) {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            if (last && last.startTime) {
              const sec = Math.max(0.1, last.startTime / 1000).toFixed(1);
              el.hudLcp.textContent = `${sec}s`;
            }
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (_) {
          el.hudLcp.textContent = '0.3s';
        }
      } else {
        el.hudLcp.textContent = '0.3s';
      }
    }
  }

  /* ========================================================================
     4. Interactive Stage (.hv2__stage)
     ======================================================================== */
  function renderStage(direction) {
    const total = STAGE_PROJECTS.length;
    const current = STAGE_PROJECTS[state.stageIndex];
    const prev = STAGE_PROJECTS[(state.stageIndex - 1 + total) % total];
    const next = STAGE_PROJECTS[(state.stageIndex + 1) % total];

    const counterText = `${pad2(state.stageIndex + 1)} / ${pad2(total)}`;
    if (el.stageCounter) el.stageCounter.textContent = `${counterText} — SELECTED WORK`;
    if (el.stageFooterCounter) el.stageFooterCounter.textContent = `${pad2(state.stageIndex + 1)} — ${pad2(total)}`;

    const applyContent = () => {
      if (el.stageImg) {
        el.stageImg.src = current.image;
        el.stageImg.alt = `${current.title} — ${current.category}`;
        el.stageImg.style.filter = current.filter || 'none';
      }
      if (el.stageImgRight) {
        el.stageImgRight.src = current.secondaryImage || next.image;
        el.stageImgRight.alt = `${current.title} — Secondary Frame`;
        el.stageImgRight.style.filter = current.filter || 'none';
      }
      if (el.stageLeftCaption) el.stageLeftCaption.textContent = `${current.index} / FIG. A`;
      if (el.stageRightCaption) el.stageRightCaption.textContent = `${current.index} / FIG. B`;
      if (el.stageTitle) el.stageTitle.textContent = current.title;
      if (el.stageCollab) el.stageCollab.textContent = current.collaborator;
      if (el.stageYear) el.stageYear.textContent = current.year;

      if (el.stagePrevImg) {
        el.stagePrevImg.src = prev.image;
        el.stagePrevImg.alt = prev.title;
        el.stagePrevImg.style.filter = prev.filter || 'none';
      }
      if (el.stageNextImg) {
        el.stageNextImg.src = next.image;
        el.stageNextImg.alt = next.title;
        el.stageNextImg.style.filter = next.filter || 'none';
      }
    };

    if (!direction) {
      applyContent();
      return;
    }

    state.isSwitching = true;
    const outClass = direction > 0 ? 'is-out-up' : 'is-out-down';
    const inClass = direction > 0 ? 'is-out-down' : 'is-out-up';

    el.stageFrame?.classList.add('is-switching');
    el.stageFrameRight?.classList.add('is-switching');
    el.stageTitle?.classList.add(outClass);

    setTimeout(() => {
      applyContent();
      el.stageTitle?.classList.remove(outClass);
      el.stageTitle?.classList.add(inClass);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.stageFrame?.classList.remove('is-switching');
          el.stageFrameRight?.classList.remove('is-switching');
          el.stageTitle?.classList.remove(inClass);
          state.isSwitching = false;
        });
      });
    }, 180);
  }

  function stepStage(delta) {
    if (state.isSwitching) return;
    const total = STAGE_PROJECTS.length;
    state.stageIndex = (state.stageIndex + delta + total) % total;
    renderStage(delta);
  }

  function initStageInteractions() {
    applyImageFallback(el.stageImg);
    applyImageFallback(el.stageImgRight);
    applyImageFallback(el.stagePrevImg);
    applyImageFallback(el.stageNextImg);

    el.stagePrevCard?.addEventListener('click', () => stepStage(-1));
    el.stageNextCard?.addEventListener('click', () => stepStage(1));
    el.stagePrevBtn?.addEventListener('click', () => stepStage(-1));
    el.stageNextBtn?.addEventListener('click', () => stepStage(1));

    el.stageViewBtn?.addEventListener('click', () => {
      openProjectDrawer(STAGE_PROJECTS[state.stageIndex]);
    });

    el.stageFrameRight?.addEventListener('click', () => {
      openProjectDrawer(STAGE_PROJECTS[state.stageIndex]);
    });

    // Click or drag/swipe on centerpiece frame
    let startX = 0;
    let isPointerDown = false;

    el.stageFrame?.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      startX = e.clientX;
    });

    el.stageFrame?.addEventListener('pointerup', (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 36) {
        stepStage(diff < 0 ? 1 : -1);
      } else {
        stepStage(1);
      }
    });

    el.stageFrame?.addEventListener('pointercancel', () => {
      isPointerDown = false;
    });
  }

  /* ========================================================================
     5. Classic Selected Work Index (.hv2__classic) & Floating Preview
     ======================================================================== */
  function renderClassicIndex() {
    if (!el.classicList) return;
    applyImageFallback(el.hoverPreviewImg);

    const html = ALL_PROJECTS.map(
      (p) => `
      <li class="row">
        <button type="button" class="row__btn" data-project-id="${escapeHtml(p.id)}">
          <span class="row__index">${escapeHtml(p.index)}</span>
          <span class="row__title">${escapeHtml(p.title)}</span>
          <span class="row__rule" aria-hidden="true"></span>
          <span class="row__meta">
            <span class="chip">${escapeHtml(p.collaborator)}</span>
            <span class="chip chip--year">${escapeHtml(p.year)}</span>
          </span>
        </button>
      </li>`
    ).join('');

    el.classicList.innerHTML = html;

    const buttons = el.classicList.querySelectorAll('.row__btn');
    buttons.forEach((btn) => {
      const project = ALL_PROJECTS.find((p) => p.id === btn.dataset.projectId);
      if (!project) return;

      btn.addEventListener('click', () => openProjectDrawer(project));

      btn.addEventListener('mouseenter', () => {
        if (!el.hoverPreview || !el.hoverPreviewImg) return;
        el.hoverPreviewImg.src = project.image;
        el.hoverPreviewImg.alt = project.title;
        el.hoverPreviewImg.style.filter = project.filter || 'none';
        el.hoverPreview.classList.add('is-visible');
      });

      btn.addEventListener('mousemove', (e) => {
        if (!el.hoverPreview) return;
        const x = Math.min(window.innerWidth - 280, e.clientX + 24);
        const y = Math.max(96, Math.min(window.innerHeight - 190, e.clientY - 80));
        el.hoverPreview.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
      });

      btn.addEventListener('mouseleave', () => {
        if (!el.hoverPreview) return;
        el.hoverPreview.classList.remove('is-visible');
      });
    });
  }

  /* ========================================================================
     6. Slide-Over Drawers (Project, About, Lab, Writing, Studio, Contact)
     ======================================================================== */
  function openDrawer(eyebrow, bodyHtml) {
    if (!el.drawer || !el.drawerBackdrop) return;
    el.drawerEyebrow.textContent = eyebrow;
    el.drawerBody.innerHTML = bodyHtml;

    el.drawerBody.querySelectorAll('img').forEach(applyImageFallback);
    const copyBtn = el.drawerBody.querySelector('[data-copy-email]');
    if (copyBtn) {
      copyBtn.addEventListener('click', copyEmail);
    }

    state.drawerOpen = true;
    el.drawerBackdrop.classList.add('is-open');
    el.drawer.classList.add('is-open');
    el.drawer.setAttribute('aria-hidden', 'false');
    el.body.classList.add('is-locked');
    el.drawerClose?.focus();
  }

  function closeDrawer() {
    if (!state.drawerOpen) return;
    state.drawerOpen = false;
    el.drawerBackdrop.classList.remove('is-open');
    el.drawer.classList.remove('is-open');
    el.drawer.setAttribute('aria-hidden', 'true');
    if (!state.cmdOpen) el.body.classList.remove('is-locked');
  }

  function openProjectDrawer(project) {
    const html = `
      <div class="drawer__hero">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" style="filter:${escapeHtml(project.filter || 'none')}">
      </div>
      <h2 class="drawer__title">${escapeHtml(project.title)}</h2>
      <p class="drawer__lead">${escapeHtml(project.summary)}</p>

      <div class="drawer__specs">
        <div>
          <span class="spec__label">Collaborator</span>
          <span class="spec__value">${escapeHtml(project.collaborator)}</span>
        </div>
        <div>
          <span class="spec__label">Year</span>
          <span class="spec__value">${escapeHtml(project.year)}</span>
        </div>
        <div>
          <span class="spec__label">Role</span>
          <span class="spec__value">${escapeHtml(project.role)}</span>
        </div>
        <div>
          <span class="spec__label">Discipline</span>
          <span class="spec__value">${escapeHtml(project.category)}</span>
        </div>
      </div>

      <div class="drawer__section">
        <h3 class="drawer__section-title">Deliverables</h3>
        <div class="chip-list">
          ${project.deliverables.map((d) => `<span class="chip">${escapeHtml(d)}</span>`).join('')}
        </div>
      </div>

      <div class="drawer__section">
        <h3 class="drawer__section-title">Stack</h3>
        <div class="chip-list">
          ${project.stack.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>

      <div class="drawer__section">
        <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
          Visit live site ↗
        </a>
      </div>
    `;
    openDrawer(`PROJECT :: ${project.index} / 12`, html);
  }

  function openSectionDrawer(section) {
    if (section === 'about') {
      const a = DATA.about;
      openDrawer(
        'ABOUT :: MARCUS VANCE',
        `
        <h2 class="drawer__title">Creative Developer &amp; Brand Engineer</h2>
        <p class="drawer__lead">${escapeHtml(a.intro)}</p>
        <p class="drawer__lead">${escapeHtml(a.philosophy)}</p>

        <div class="drawer__section">
          <h3 class="drawer__section-title">Capabilities</h3>
          <ul class="editorial-list">
            ${a.capabilities.map((c) => `<li><p class="editorial-item__title">${escapeHtml(c)}</p></li>`).join('')}
          </ul>
        </div>

        <div class="drawer__section">
          <h3 class="drawer__section-title">Recognition</h3>
          <ul class="editorial-list">
            ${a.recognition
              .map(
                (r) => `
              <li>
                <div class="editorial-item__head">
                  <p class="editorial-item__title">${escapeHtml(r.label)}</p>
                  <span class="editorial-item__meta">${escapeHtml(r.detail)}</span>
                </div>
              </li>`
              )
              .join('')}
          </ul>
        </div>

        <div class="drawer__section">
          <h3 class="drawer__section-title">Selected Partners</h3>
          <div class="chip-list">
            ${a.clients.map((c) => `<span class="chip">${escapeHtml(c)}</span>`).join('')}
          </div>
        </div>
      `
      );
      return;
    }

    if (section === 'lab') {
      openDrawer(
        'LAB :: EXPERIMENTS',
        `
        <h2 class="drawer__title">Interaction &amp; Shader Studies</h2>
        <p class="drawer__lead">Small technical studies exploring tactile web surfaces, zero-dependency motion, and keyboard-first interfaces.</p>
        <ul class="editorial-list">
          ${DATA.lab
            .map(
              (item) => `
            <li>
              <div class="editorial-item__head">
                <h3 class="editorial-item__title">${escapeHtml(item.title)}</h3>
                <span class="editorial-item__meta">${escapeHtml(item.code)} · ${escapeHtml(item.status)}</span>
              </div>
              <p class="editorial-item__desc">${escapeHtml(item.description)}</p>
            </li>`
            )
            .join('')}
        </ul>
      `
      );
      return;
    }

    if (section === 'writing') {
      openDrawer(
        'WRITING :: NOTES',
        `
        <h2 class="drawer__title">Essays &amp; Field Notes</h2>
        <p class="drawer__lead">Short notes on editorial restraint, tactile front-end engineering, and building software that respects attention.</p>
        <ul class="editorial-list">
          ${DATA.writing
            .map(
              (post) => `
            <li>
              <div class="editorial-item__head">
                <h3 class="editorial-item__title">${escapeHtml(post.title)}</h3>
                <span class="editorial-item__meta">${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</span>
              </div>
              <p class="editorial-item__desc">${escapeHtml(post.excerpt)}</p>
            </li>`
            )
            .join('')}
        </ul>
      `
      );
      return;
    }

    if (section === 'studio') {
      const s = DATA.studio;
      openDrawer(
        'STUDIO :: VANCE STUDIO',
        `
        <h2 class="drawer__title">${escapeHtml(s.name)}</h2>
        <p class="drawer__lead">${escapeHtml(s.lead)}</p>
        <p class="drawer__lead">${escapeHtml(s.description)}</p>

        <div class="drawer__section">
          <h3 class="drawer__section-title">Engagement Models</h3>
          <ul class="editorial-list">
            ${s.engagements
              .map(
                (eng) => `
              <li>
                <div class="editorial-item__head">
                  <h3 class="editorial-item__title">${escapeHtml(eng.title)}</h3>
                  <span class="editorial-item__meta">${escapeHtml(eng.timeline)}</span>
                </div>
                <p class="editorial-item__desc">${escapeHtml(eng.detail)}</p>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      `
      );
      return;
    }

    if (section === 'contact') {
      const c = DATA.contact;
      openDrawer(
        `CONTACT :: BOOKING ${c.booking}`,
        `
        <h2 class="drawer__title">Start a Conversation</h2>
        <p class="drawer__lead">Currently booking select digital flagship and design engineering engagements for ${escapeHtml(c.booking)}. Based in ${escapeHtml(c.location)}.</p>

        <div class="contact-email-box">
          <code>${escapeHtml(c.email)}</code>
          <button type="button" class="btn btn--primary" data-copy-email>Copy email</button>
        </div>

        <div class="drawer__section">
          <h3 class="drawer__section-title">Elsewhere</h3>
          <ul class="editorial-list">
            ${c.socials
              .map(
                (s) => `
              <li>
                <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="editorial-item__head">
                  <span class="editorial-item__title">${escapeHtml(s.label)}</span>
                  <span class="editorial-item__meta">${escapeHtml(s.handle)} ↗</span>
                </a>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      `
      );
    }
  }

  /* ========================================================================
     7. Command Palette (⌘K / Ctrl+K)
     ======================================================================== */
  function buildCommandItems() {
    const projectItems = ALL_PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      type: `Project · ${p.year}`,
      keywords: `${p.title} ${p.collaborator} ${p.category} ${p.year}`.toLowerCase(),
      action: () => openProjectDrawer(p)
    }));

    const navItems = [
      { id: 'nav-about', label: 'About Marcus Vance', type: 'Section', keywords: 'about bio capabilities', action: () => openSectionDrawer('about') },
      { id: 'nav-lab', label: 'Lab Experiments', type: 'Section', keywords: 'lab webgl shaders experiments', action: () => openSectionDrawer('lab') },
      { id: 'nav-writing', label: 'Writing & Essays', type: 'Section', keywords: 'writing essays notes articles', action: () => openSectionDrawer('writing') },
      { id: 'nav-studio', label: 'Vance Studio', type: 'Section', keywords: 'studio engagements work', action: () => openSectionDrawer('studio') },
      { id: 'nav-contact', label: 'Contact & Booking', type: 'Section', keywords: 'contact email booking', action: () => openSectionDrawer('contact') }
    ];

    const actionItems = [
      { id: 'act-theme', label: 'Toggle Dark / Light Theme', type: 'Action', keywords: 'theme dark light mode', action: toggleTheme },
      { id: 'act-email', label: 'Copy Contact Email', type: 'Action', keywords: 'copy email hello@marcusvance.studio', action: copyEmail }
    ];

    return [...navItems, ...actionItems, ...projectItems];
  }

  const CMD_ITEMS = buildCommandItems();

  function renderCommandList(query) {
    const q = (query || '').trim().toLowerCase();
    state.cmdFiltered = q
      ? CMD_ITEMS.filter((item) => item.label.toLowerCase().includes(q) || item.keywords.includes(q))
      : CMD_ITEMS;
    state.cmdActiveIndex = 0;

    if (!state.cmdFiltered.length) {
      el.cmdList.innerHTML = `<li class="cmd__empty">No matching commands or projects.</li>`;
      return;
    }

    el.cmdList.innerHTML = state.cmdFiltered
      .map(
        (item, idx) => `
      <li>
        <button type="button" class="cmd__option" role="option" data-cmd-idx="${idx}" aria-selected="${idx === 0 ? 'true' : 'false'}">
          <span>${escapeHtml(item.label)}</span>
          <span class="cmd__option-type">${escapeHtml(item.type)}</span>
        </button>
      </li>`
      )
      .join('');

    el.cmdList.querySelectorAll('.cmd__option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.cmdIdx);
        executeCommand(idx);
      });
    });
  }

  function updateCommandSelection() {
    const options = el.cmdList.querySelectorAll('.cmd__option');
    options.forEach((opt, i) => {
      const active = i === state.cmdActiveIndex;
      opt.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) opt.scrollIntoView({ block: 'nearest' });
    });
  }

  function executeCommand(idx) {
    const item = state.cmdFiltered[idx];
    if (!item) return;
    closeCommandPalette();
    item.action();
  }

  function openCommandPalette() {
    state.cmdOpen = true;
    el.cmd.classList.add('is-open');
    el.cmd.setAttribute('aria-hidden', 'false');
    el.body.classList.add('is-locked');
    el.cmdInput.value = '';
    renderCommandList('');
    setTimeout(() => el.cmdInput.focus(), 20);
  }

  function closeCommandPalette() {
    if (!state.cmdOpen) return;
    state.cmdOpen = false;
    el.cmd.classList.remove('is-open');
    el.cmd.setAttribute('aria-hidden', 'true');
    if (!state.drawerOpen) el.body.classList.remove('is-locked');
  }

  /* ========================================================================
     8. Global Event Listeners & Init
     ======================================================================== */
  function bindEvents() {
    el.themeToggle?.addEventListener('click', toggleTheme);
    el.cmdTrigger?.addEventListener('click', openCommandPalette);
    el.drawerClose?.addEventListener('click', closeDrawer);
    el.drawerBackdrop?.addEventListener('click', closeDrawer);

    document.querySelectorAll('[data-drawer]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        openSectionDrawer(trigger.dataset.drawer);
      });
    });

    el.cmd?.addEventListener('click', (e) => {
      if (e.target === el.cmd) closeCommandPalette();
    });

    el.cmdInput?.addEventListener('input', (e) => {
      renderCommandList(e.target.value);
    });

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (state.cmdOpen) closeCommandPalette();
        else openCommandPalette();
        return;
      }

      if (e.key === 'Escape') {
        if (state.cmdOpen) {
          closeCommandPalette();
          return;
        }
        if (state.drawerOpen) {
          closeDrawer();
          return;
        }
      }

      if (state.cmdOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (state.cmdFiltered.length) {
            state.cmdActiveIndex = (state.cmdActiveIndex + 1) % state.cmdFiltered.length;
            updateCommandSelection();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (state.cmdFiltered.length) {
            state.cmdActiveIndex = (state.cmdActiveIndex - 1 + state.cmdFiltered.length) % state.cmdFiltered.length;
            updateCommandSelection();
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          executeCommand(state.cmdActiveIndex);
        }
        return;
      }

      if (!state.drawerOpen) {
        if (e.key === 'ArrowRight') stepStage(1);
        if (e.key === 'ArrowLeft') stepStage(-1);
      }
    });
  }

  function init() {
    initTheme();
    initTelemetry();
    renderStage(0);
    initStageInteractions();
    renderClassicIndex();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
