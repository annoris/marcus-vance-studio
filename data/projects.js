/**
 * Marcus Vance :: Portfolio & Editorial Dataset
 * Clean, structured English data for Stage, Selected Work Index,
 * Command Palette, and Slide-Over Drawers.
 */

window.MARCUS_VANCE_DATA = {
  brand: {
    name: 'Marcus Vance',
    studio: 'Vance Studio',
    monogram: 'M V ::',
    role: 'Creative Developer & Brand Engineer',
    location: 'London',
    timezone: 'Europe/London',
    booking: 'Q2’27',
    email: 'hello@marcusvance.studio',
    tagline:
      'Independent creative developer, design engineer, and studio founder crafting tactile web experiences with a taste for pure digital originality.'
  },

  fallbackImage: 'assets/images/project-01.jpg',

  projects: [
    {
      id: 'kestrel',
      index: '01',
      title: 'Kestrel',
      collaborator: 'w/ kestrel labs',
      year: '2026',
      category: 'Spatial Interface & Identity',
      role: 'Design Engineering, WebGL',
      url: 'https://kestrellabs.example.com',
      image: 'assets/images/project-01.jpg',
      secondaryImage: 'assets/images/project-04.jpg',
      filter: 'contrast(1.04) saturate(0.95)',
      featured: true,
      summary:
        'A tactile product showcase and real-time telemetry interface for Kestrel Labs’ autonomous aerial mapping platform. Built with custom shader transitions, kinetic typography, and sub-300ms page loads.',
      deliverables: ['Creative Direction', 'Design Engineering', 'Custom Shaders', 'Motion System'],
      stack: ['Vanilla JS', 'WebGL', 'GLSL', 'CSS Grid']
    },
    {
      id: 'solstice',
      index: '02',
      title: 'Solstice',
      collaborator: 'w/ off+grid',
      year: '2026',
      category: 'Editorial Architecture',
      role: 'Frontend Architecture, Motion',
      url: 'https://solstice-offgrid.example.com',
      image: 'assets/images/project-02.jpg',
      secondaryImage: 'assets/images/project-08.jpg',
      filter: 'contrast(1.05) brightness(0.97)',
      featured: true,
      summary:
        'Digital flagship for an off-grid architectural collective. Designed around daylight-responsive color tokens, paper-grain tactility, and a serene horizontal archive of solar residences.',
      deliverables: ['Brand Digital Flagship', 'Interactive Archive', 'Theme Engine'],
      stack: ['HTML5', 'CSS Custom Properties', 'Canvas 2D', 'GSAP']
    },
    {
      id: 'alder-and-co',
      index: '03',
      title: 'Alder & Co',
      collaborator: 'w/ studio alder',
      year: '2025',
      category: 'E-Commerce & Object Archive',
      role: 'Lead Creative Developer',
      url: 'https://alderandco.example.com',
      image: 'assets/images/project-03.jpg',
      secondaryImage: 'assets/images/project-12.jpg',
      filter: 'contrast(1.03) saturate(0.90)',
      featured: true,
      summary:
        'A quiet, museum-grade commerce experience for London furniture maker Alder & Co. Features hairline specification tables, tactile material swatches, and instant drawer checkout.',
      deliverables: ['Commerce UX', 'Design System', 'Performance Tuning'],
      stack: ['TypeScript', 'Headless Commerce', 'CSS Architecture']
    },
    {
      id: 'monolith-os',
      index: '04',
      title: 'Monolith OS',
      collaborator: 'w/ monolith',
      year: '2026',
      category: 'Developer Tooling & System',
      role: 'Design Engineer',
      url: 'https://monolith-os.example.com',
      image: 'assets/images/project-04.jpg',
      secondaryImage: 'assets/images/project-07.jpg',
      filter: 'contrast(1.06) saturate(0.88)',
      featured: true,
      summary:
        'Launch site and interactive command-line playground for Monolith OS — a minimalist local-first operating environment for systems engineers. Engineered for 120fps scrolling and zero layout shift.',
      deliverables: ['Interactive Playground', 'Command Palette UI', 'Documentation Shell'],
      stack: ['ES Modules', 'Web Workers', 'ARIA Patterns']
    },
    {
      id: 'vespera',
      index: '05',
      title: 'Vespera',
      collaborator: 'w/ northstar',
      year: '2025',
      category: 'Gallery & Cultural Platform',
      role: 'Creative Development',
      url: 'https://vespera-gallery.example.com',
      image: 'assets/images/project-05.jpg',
      secondaryImage: 'assets/images/project-11.jpg',
      filter: 'contrast(1.04) brightness(0.96)',
      featured: true,
      summary:
        'Exhibition archive and timed-entry platform for Vespera Contemporary. Pairs austere Swiss typography with fluid image drums and ambient exhibition room telemetry.',
      deliverables: ['Digital Archive', 'Editorial CMS', 'Micro-Interactions'],
      stack: ['JavaScript', 'CSS Scroll-Driven Animations', 'SVG Filters']
    },
    {
      id: 'cinder',
      index: '06',
      title: 'Cinder',
      collaborator: 'w/ cinder audio',
      year: '2025',
      category: 'Hardware & Acoustic Web',
      role: 'Design Engineering, Audio UI',
      url: 'https://cinderaudio.example.com',
      image: 'assets/images/project-06.jpg',
      secondaryImage: 'assets/images/project-10.jpg',
      filter: 'contrast(1.08) grayscale(0.18)',
      featured: true,
      summary:
        'Interactive acoustic showcase for Cinder’s precision milled studio monitors. Includes real-time Web Audio frequency response curves and hardware-inspired rotary controls.',
      deliverables: ['Product Launch', 'Web Audio Visualizer', 'Hardware UI'],
      stack: ['Web Audio API', 'Canvas', 'CSS Grid']
    },
    {
      id: 'halcyon-ai',
      index: '07',
      title: 'Halcyon AI',
      collaborator: 'w/ halcyon',
      year: '2026',
      category: 'Research Lab & Identity',
      role: 'Brand Engineering',
      url: 'https://halcyon-research.example.com',
      image: 'assets/images/project-07.jpg',
      secondaryImage: 'assets/images/project-01.jpg',
      filter: 'contrast(1.05)',
      featured: false,
      summary:
        'Restrained editorial web presence for an applied AI interpretability lab. Strips away industry clichés in favor of monograph-grade typography, live paper citations, and clean diagrams.',
      deliverables: ['Brand System', 'Research Publication Engine', 'Interactive Benchmarks'],
      stack: ['Static Generation', 'SVG Data Viz', 'Geist Typography']
    },
    {
      id: 'tactile-form',
      index: '08',
      title: 'Tactile Form',
      collaborator: 'w/ form press',
      year: '2024',
      category: 'Independent Publishing',
      role: 'Design & Development',
      url: 'https://tactileform.example.com',
      image: 'assets/images/project-08.jpg',
      secondaryImage: 'assets/images/project-03.jpg',
      filter: 'contrast(1.06) brightness(0.95)',
      featured: false,
      summary:
        'A digital monograph and print-edition store exploring industrial design artifacts from 1968–1984. Built with paper-grain shaders, keyboard-first reading modes, and instant index filtering.',
      deliverables: ['Editorial Reader', 'Print Storefront', 'Type Specimen'],
      stack: ['HTML5', 'CSS', 'Vanilla JS']
    },
    {
      id: 'aether-cloud',
      index: '09',
      title: 'Aether Cloud',
      collaborator: 'w/ aether',
      year: '2025',
      category: 'Infrastructure & Telemetry',
      role: 'Frontend Lead',
      url: 'https://aethercloud.example.com',
      image: 'assets/images/project-09.jpg',
      secondaryImage: 'assets/images/project-04.jpg',
      filter: 'contrast(1.04)',
      featured: false,
      summary:
        'Global edge-compute status portal and marketing system for Aether. Highlights live regional latency metrics inside a calm, obsidian-slate HUD inspired by precision instrumentation.',
      deliverables: ['Telemetry HUD', 'Marketing Architecture', 'Design Tokens'],
      stack: ['WebSockets', 'CSS Variables', 'Performance API']
    },
    {
      id: 'kuro-studio',
      index: '10',
      title: 'Kuro Studio',
      collaborator: 'w/ kuro',
      year: '2024',
      category: 'Industrial Design Portfolio',
      role: 'Creative Developer',
      url: 'https://kurostudio.example.com',
      image: 'assets/images/project-10.jpg',
      secondaryImage: 'assets/images/project-06.jpg',
      filter: 'grayscale(0.22) contrast(1.08)',
      featured: false,
      summary:
        'Minimalist portfolio for Tokyo & London industrial design practice Kuro. Centered on unhurried pacing, hairline index directories, and tactile cursor-tracking previews.',
      deliverables: ['Portfolio Architecture', 'Motion Direction', 'CMS Integration'],
      stack: ['Vanilla JS', 'CSS Grid', 'Intersection Observer']
    },
    {
      id: 'meridian',
      index: '11',
      title: 'Meridian',
      collaborator: 'w/ meridian',
      year: '2025',
      category: 'Financial Instrument UI',
      role: 'Design Engineering',
      url: 'https://meridian-fx.example.com',
      image: 'assets/images/project-11.jpg',
      secondaryImage: 'assets/images/project-02.jpg',
      filter: 'saturate(0.85) contrast(1.05)',
      featured: false,
      summary:
        'Institutional treasury interface and public specification site for Meridian. Focused on tabular numeric legibility, instant keyboard command workflows, and zero visual noise.',
      deliverables: ['Interface System', 'Keyboard Navigation', 'Public Site'],
      stack: ['TypeScript', 'Tabular Numerals', 'Design Tokens']
    },
    {
      id: 'opaline',
      index: '12',
      title: 'Opaline',
      collaborator: 'w/ opaline',
      year: '2024',
      category: 'Lighting & Spatial Objects',
      role: 'Design & Code',
      url: 'https://opaline-objects.example.com',
      image: 'assets/images/project-12.jpg',
      secondaryImage: 'assets/images/project-05.jpg',
      filter: 'brightness(0.96) contrast(1.04)',
      featured: false,
      summary:
        'Digital catalogue for hand-blown architectural glass lighting studio Opaline. Uses subtle light-refraction hover states and dual dark/light studio environments to mirror the fixtures.',
      deliverables: ['Digital Catalogue', 'Dual-Theme System', 'Art Direction'],
      stack: ['HTML5', 'CSS Custom Properties', 'ES6']
    }
  ],

  about: {
    intro:
      'I am Marcus Vance, an independent creative developer and brand engineer based in London. Over the past decade, I have partnered with founders, design studios, and research labs to build digital flagships that feel tactile, calm, and unmistakably original.',
    philosophy:
      'Good software should carry the quiet precision of a well-machined instrument. I work at the intersection of Swiss editorial typography, high-frame-rate interaction engineering, and restrained visual systems.',
    capabilities: [
      'Design Engineering & Frontend Architecture',
      'Interactive Flagships & Launch Sites',
      'Motion Systems & Micro-Interactions',
      'Design Systems & Token Architecture',
      'Performance & Accessibility Auditing'
    ],
    recognition: [
      { label: 'Awwwards', detail: '4× Site of the Day, Developer Award' },
      { label: 'FWA', detail: '3× FWA of the Day' },
      { label: 'Siteinspire', detail: 'Featured Archive (2023–2026)' },
      { label: 'Minimal Gallery', detail: 'Selected Annual Index' }
    ],
    clients: ['Kestrel Labs', 'Monolith', 'Studio Alder', 'Northstar', 'Cinder Audio', 'Halcyon']
  },

  lab: [
    {
      id: 'lab-01',
      code: 'EXP::01',
      title: 'Paper Grain & Micro-Contrast Shader',
      year: '2026',
      status: 'Active',
      description:
        'Zero-dependency SVG feTurbulence overlay calibrated for both Obsidian Slate dark surfaces and cool stone light themes without impacting paint budgets.'
    },
    {
      id: 'lab-02',
      code: 'EXP::02',
      title: 'Spring-Damped Title Drum',
      year: '2026',
      status: 'Prototype',
      description:
        'A vertical typographic mask transition driven by exponential out-easing curves, preserving crisp subpixel rendering during rapid keyboard or swipe cycling.'
    },
    {
      id: 'lab-03',
      code: 'EXP::03',
      title: 'Sub-Millisecond Command Index',
      year: '2025',
      status: 'Shipped',
      description:
        'Keyboard-first ⌘K navigation layer with fuzzy token matching, ARIA listbox semantics, and zero external dependencies.'
    }
  ],

  writing: [
    {
      id: 'essay-01',
      date: '2026.02',
      readTime: '4 min read',
      title: 'Against Loud Interfaces: The Case for Editorial Restraint',
      excerpt:
        'Why stripping away promotional banners, oversized gradients, and decorative clutter makes digital products feel more authoritative and memorable.'
    },
    {
      id: 'essay-02',
      date: '2025.11',
      readTime: '6 min read',
      title: 'Tactile Web Engineering: Hairlines, Grain, and 120fps Motion',
      excerpt:
        'Practical notes on using 1px optical dividers, subtle noise textures, and GPU-composited transforms to give flat screens physical presence.'
    },
    {
      id: 'essay-03',
      date: '2025.07',
      readTime: '5 min read',
      title: 'Designing Telemetry HUDs That Respect Attention',
      excerpt:
        'How micro-typographic status bars can communicate live system vitality—time, frame rate, availability—without competing with primary content.'
    }
  ],

  studio: {
    name: 'Vance Studio',
    lead: 'A focused independent practice partnering with ambitious teams from concept through production code.',
    description:
      'Vance Studio operates intentionally small—taking on two to three engagements per quarter so every project receives direct senior attention from initial art direction to final deployment.',
    engagements: [
      {
        title: 'Digital Flagship',
        timeline: '4–6 weeks',
        detail: 'End-to-end art direction, design engineering, and bespoke motion for product launches and studios.'
      },
      {
        title: 'Design Engineering Sprint',
        timeline: '2–3 weeks',
        detail: 'Embedded frontend architecture, interaction polish, and performance refinement for existing teams.'
      },
      {
        title: 'Advisory & Systems',
        timeline: 'Ongoing',
        detail: 'Design token architecture, code reviews, and creative direction for seed to Series B teams.'
      }
    ]
  },

  contact: {
    email: 'hello@marcusvance.studio',
    booking: 'Q2’27',
    location: 'London, United Kingdom (GMT/BST)',
    socials: [
      { label: 'GitHub', handle: '@marcusvance', url: 'https://github.com' },
      { label: 'X / Twitter', handle: '@marcusvance_', url: 'https://x.com' },
      { label: 'Read.cv', handle: 'marcusvance', url: 'https://read.cv' },
      { label: 'Are.na', handle: 'marcus-vance', url: 'https://are.na' }
    ]
  }
};
