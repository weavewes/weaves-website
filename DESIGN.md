# DESIGN.md — Weaves AI Automation Website

## 1. Concept & Vision

Weaves es una marca premium de automatización e IA para PYMEs. El sitio transmite **claridad operative**, **confianza técnica** y **accesibilidad humana**. No parece "otra agencia digital genérica" — se siente como una herramienta seria que entiende los problemas reales de negocios pequeños y medianos.

El tono visual es: **dark premium con acentos de energía**. Fondos oscuros con gradientes amber/teal que dan sensación de inteligencia activa, sin caer en lo lúdico ni lo corporativo frío.

---

## 2. Design Language

### Aesthetic Direction
**Dark intelligence** — La home usa fondo carbón oscuro con gradientes radiales amber/teal que parecen "nodos de inteligencia conectados". Las páginas de contenido usan fondos más claros para descansar la vista. El resultado es un sitio que se siente tecnológico pero humano.

### Brand Identity & Graphic Materials
*This section covers assets for graphic designers, logo construction, and marketing materials.*

**Logo Specifications**
- **Shape & Concept:** A dynamic hexagon representing logic/nodes, featuring an internal geometric checkmark (`Lucide icons style`) representing completed automation.
- **Logo Gradient (The Trail):** Linear gradient from Amber (`#F59E0B`) to Teal (`#00B4A6`). This gradient implies motion, energy, and digital transformation.
- **Wordmark:** `Space Grotesk`, Semibold (600), White or Indigo Deep depending on the background. Letter-spacing: `-0.02em`.

**Graphic Material Rules (Web vs Social Media)**
- **Backgrounds:** Marketing graphics must use the `Dark / Indigo Deep` foundations to maintain the premium tech look. Avoid solid flat colors; use subtle dark radial gradients with `rgba(245,158,11,0.15)` (Amber glow) or `rgba(0,180,166,0.15)` (Teal glow) to create depth.
- **Glassmorphism:** Overlays or feature cards in social media graphics should map to the `rgba(255,255,255,0.03)` background with a `rgba(255,255,255,0.08)` border.
- **Photography/Imagery:** Avoid generic "people in suits pointing at a laptop". Use conceptual vectors, node architectures, code snippets (`feTurbulence` noises), or dark-themed abstract UI representations.
- **Iconography:** Strict use of **Lucide Icons** (round, 1.5px to 2px stroke, minimal).

### Color Palette (Expanded for Designers)

```text
PRIMARY BRAND COLORS
──────────────
Indigo          HEX #1E2A4A  | RGB  30,  42,  74  | HSL 224, 42%, 20%
Indigo Deep     HEX #151E37  | RGB  21,  30,  55  | HSL 224, 45%, 15%
Teal            HEX #00B4A6  | RGB   0, 180, 166  | HSL 175, 100%, 35%
Amber           HEX #F59E0B  | RGB 245, 158,  11  | HSL 38, 92%, 50%

NEUTRAL & BACKGROUNDS
──────────────
Dark Space      HEX #0B1220  | RGB  11,  18,  32
Off-white       HEX #F8F9FC  | RGB 248, 249, 252
Text Core       HEX #1F2937  | RGB  31,  41,  55
Muted Gray      HEX #6B7280  | RGB 107, 114, 128
Border          HEX #E5E7EB  | RGB 229, 231, 235

SEMANTIC (Alerts & Status)
──────────────
Green           HEX #10B981  | RGB  16, 185, 129
Red             HEX #EF4444  | RGB 239,  68,  68
```

### Typography

```
HEADINGS        Space Grotesk — weights 400, 500, 600, 700
                Letter-spacing: -0.03em a -0.04em
                Line-height: 1.0 - 1.05

BODY            Inter — weights 300, 400, 500, 600, 700
                Line-height: 1.55 - 1.75
                Letter-spacing: -0.005em

MONOSPACE       JetBrains Mono — weights 400, 500
                Para labels, eyebrows, badges, metadata
                Letter-spacing: 0.1em - 0.18em (uppercase)
```

**Scale:**
```
Hero title      clamp(48px, 8vw, 104px)  — Space Grotesk 400
Section title   clamp(34px, 5vw, 64px)   — Space Grotesk 400
Card title      24px - 28px              — Space Grotesk 500
Body large      18px                     — Inter 300
Body            16px                     — Inter 400
Label/mono      11px - 14px              — JetBrains Mono
```

### Spatial System

```
Spacing tokens (en .css/styles.css)
────────────────────────────────────
--spacing-xs     8px
--spacing-sm     16px
--spacing-md     24px
--spacing-lg     48px
--spacing-xl     80px - 140px

Layout
────────────────────────────────────
Max width        1400px
Section padding  140px vertical (desktop), 80px (tablet), 60px (mobile)
Container pad    48px horizontal
Grid gap         72px - 80px (entre columnas)
Card gap         24px - 32px
Border-radius   12px (cards), 10px (buttons), 16px (visuals)
```

### Motion Philosophy

```
TRANSITIONS
────────────────────────────────────
Base             0.2s ease
Nav scroll       0.3s ease
Card hover       transform translateY(-4px) + shadow, 0.25s ease
Button hover     translateY(-1px), 0.2s ease

ANIMATIONS
────────────────────────────────────
Hero rise        opacity 0→1 + translateY(20px→0), 1s cubic-bezier(0.2, 0.8, 0.2, 1)
                  delay: 0s (title), 0.1s (subtitle), 0.2s (ctas)
Marquee scroll   translateX(0→-100%), 32s linear infinite

SCROLL EFFECTS
────────────────────────────────────
Nav blur         backdrop-filter: blur(20px) on scroll
Card hover       lift + top border accent line
Result cells     background shift on hover
WF nodes         amber glow on hover
```

### Visual Assets

```
ICONS           Inline SVG (custom paths) — stroke-based, 1.5-2px stroke
                No emoji en UI funcional — emoji solo en cards de sectores
GRADIENTS       Radial en hero: amber/teal sobre fondo dark
                Linear en botones: amber → darker amber
                Overlay grids en visuals: líneas blancas 4% opacity
GRAIN           SVG feTurbulence noise overlay en hero-bg — opacity 0.5
LOGO            Hexágono SVG con trail + checkmark interior
                Gradient en trail: amber → teal
SHADOWS         Cards: 0 30px 80px rgba(30,42,74,0.15)
                Chat mockups: 0 30px 80px rgba(0,0,0,0.3)
                Dashboard: 0 30px 80px rgba(0,0,0,0.35)
```

---

## 3. Layout & Structure

### Page Anatomy (Home)

```
[NAV]           Fixed, transparent → blurred dark on scroll
[HERO]          Full viewport, dark, gradients + grain + grid overlay
[MARQUEE]       Logos de clientes, scroll infinito, fond dark
[RESULTS]       Strip blanco con 4 métricas destacadas
[FEATURE 1]     Split 50/50 — Atención al cliente (chat-mock)
[FEATURE 2]     Split invertido dark — Procesos internos (workflow)
[FEATURE 3]     Split 50/50 — Marketing y Ventas (dashboard-mock)
[ALL SERVICES CTA] Simple centrado, offwhite, botón a /servicios
[TECH GRID]     Grid de 6×n herramientas/integraciones
[CASE SECTION]  Dark, quote + métricas + screenshot
[TESTIMONIALS]  Marquee horizontal de cards de clientes
[BIG CTA]       Dark con gradiente radial amber, 2 CTAs
[FOOTER]        Dark, 5 columnas de links, social, copyright
```

### Responsive Strategy

```
BREAKPOINTS (en css/responsive.css)
────────────────────────────────────
< 768px         Mobile — stack everything, reduce font sizes, 1 col
< 1024px        Tablet — 2 cols, nav collapses to hamburger
> 1024px        Desktop — full layout
> 1400px        Max width container

Nav mobile      Hamburger → full-screen overlay menu
Grids mobile    1 column, gaps reduced to 16px
Hero mobile     Min-height 70vh, padding reduced
```

### Component Patterns

```
CARDS
────────────────────────────────────
.card-unified    (para grids de contenido)
  hover: top border accent line (teal 3px) + lift shadow

.sector-card-v2 (estilo anterior, para compatibility)
  hover: left border accent + background shift

SECTIONS
────────────────────────────────────
.service-section section-dark
  Fondo: var(--dark)
  Alternativa: section-light (off-white)

.section-header
  Layout: flex row con .section-number (mono) + h2
  .section-number: 11px mono, teal, antes del h2

.feature-section
  Split layout: 1fr 1.1fr (content | visual)
  feature-section.reversed invierte el orden

.workflow (visual en feature)
  Grid de 3 columnas de .wf-node
  Cada node: icon + título + descripción mono
  Hover: amber glow + lift
```

---

## 4. Features & Interactions

### Navigation

```
NAV FIXED
────────────────────────────────────
Default:    transparent, logo blanco, links blancos, sin fondo
Scrolled:   fondo rgba(11,18,32,0.8) + backdrop-filter blur(20px)
Hover:      links → teal
CTA button: white bg → amber on hover

MOBILE MENU (hamburger)
────────────────────────────────────
Toggle: .menu-toggle (JS en main.js)
Overlay: full-screen, centered links, blur background
Close:  click outside or X button
```

### Hero

```
ANIMATION ENTRANCE (CSS only)
────────────────────────────────────
.hero-title      animation: rise 1s cubic-bezier(0.2, 0.8, 0.2, 1) both
.hero-sub        animation: rise 1s 0.1s ... both
.hero-ctas       animation: rise 1s 0.2s ... both

@keyframes rise { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
```

### Results Counter

```
JS INTERSECTION OBSERVER
────────────────────────────────────
Anima números de 0 al valor final en 1600ms
Se activa cuando .results-grid entra en viewport (threshold 0.3)
selector: '.result-num, .case-metric-num'
```

### Testimonials Marquee

```
HORIZONTAL SCROLL MARQUEE
────────────────────────────────────
CSS animation: marquee 32s linear infinite
Duplicated content (2× track) para seamless loop
Pause on hover
```

### Cards

```
HOVER STATES
────────────────────────────────────
.card-unified
  transform: translateY(-4px)
  box-shadow: 0 20px 60px rgba(30,42,74,0.12)
  top border: 3px solid var(--teal) — pseudo-element

.sector-card-v2
  left border: 3px solid var(--teal) on hover
  background: rgba(0,180,166,0.05)

.wf-node (en workflow visual)
  background → rgba(0,180,166,0.15)
  border-color → rgba(0,180,166,0.4)
  transform: translateY(-2px)
```

### Forms

```
No hay forms en el sitio actualmente (solo CTAs con links)
```

---

## 5. Component Inventory

### Navigation

```
nav                          Fixed positioning, z-index 100
nav.scrolled                 Background blur activated
.nav-logo                    Flex row: logo mark + wordmark
.nav-links                   Flex row: 6 links + right slot
.nav-ghost                   Ghost button style, hover teal
.nav-cta                     White bg → amber on hover
.menu-toggle                 Hidden on desktop, visible <1024px
```

### Hero

```
.hero                        Full viewport, dark background, flex end-aligned
.hero-bg                     Absolute, radial gradients + grain overlay
.hero-content                Relative z-index 2, max-width 1400px, padding 48px
.hero-title                  Space Grotesk, clamp 48-104px, max-width 14ch
.hero-sub                    18px, weight 300, max-width 520px
.hero-ctas                   Flex row, gap 12px, flex-wrap
.btn-hero-primary            White bg, indigo text, hover amber
.btn-hero-secondary          Transparent, white border, hover bg rgba
```

### Marquee

```
.marquee-section             Dark bg, padding 48px 0 64px, overflow hidden
.marquee-label               Mono 11px uppercase, fade right edge
.marquee-track               Flex, gap 72px, animation marquee 32s infinite
.marquee-item                Space Grotesk 22px, hover brighter
```

### Results Strip

```
.results-section             White/offwhite bg, border top/bottom
.results-grid                4 columns, border-top/left grid
.result-cell                 Padding 56px 40px, hover background shift
.result-num                  Space Grotesk 72px, teal superscript
.result-label                Mono 10px uppercase teal
```

### Feature Split

```
.feature-section             Padding 140px 0, border-bottom
.feature-section.dark        Dark bg, inverted text colors
.feature-inner               Grid 1fr 1.1fr, gap 80px, align center
.feature-section.reversed    Visual order -1
.feature-checks              Flex column, gap 14px
.feature-check               Flex row, icon + text
.check-icon                  28px circle, amber bg, indigo check SVG
.feature-cta                 Inline flex, border-bottom, hover gap + teal
.feature-visual              Relative, aspect-ratio 4/3, rounded 16px
```

### Workflow Visual

```
.workflow                    Grid 3 cols, gap 14px, padding 28px
.wf-node                     Glassmorphism, border-radius 12px
.wf-node-icon                36px square, rounded 10px, teal/amber bg
.wf-node-title               11px bold white
.wf-node-desc                Mono 9px, muted
.wf-node:hover               Lift + amber/teal glow
```

### Chat Mockup Visual

```
.chat-mock                   White bg, rounded 20px, shadow
.chat-avatar                 Gradient indigo→teal, circle
.chat-bubble.them            Light bg, top-left radius sharp
.chat-bubble.me              Indigo bg, white text, top-right radius sharp
```

### Dashboard Mockup Visual

```
.dashboard-mock              White bg, rounded 16px, shadow
.dash-stat-val                Space Grotesk 22px, green up indicator
```

### Code Mockup Visual

```
.code-mock                   #0D1117 bg, rounded 12px
.code-dots                   macOS window dots (red/yellow/green)
.code-keyword                #FF7B72
.code-string                 #A5D6FF
.code-fn                     teal
.code-comment                #8B949E
```

### All Services CTA

```
.all-services-cta            Background offwhite, border-top/bottom
Centrado                     max-width 1400px, padding 120px 48px
Link botón                   .btn-hero-primary pero con indigo bg
```

### Tech Grid

```
.tech-grid                   6 columns, border-top/left grid
.tech-cell                   Min-height 130px, hover offwhite bg
.tech-name                   Space Grotesk 18px
.tech-num                    Mono 10px muted
```

### Case Section

```
.case-section                Dark bg, radial gradient overlay
.case-inner                  Max-width 1400px
.case-layout                 1fr 1fr grid
.case-eyebrow                Mono teal
.case-quote-text             Space Grotesk 24px italic
.case-metrics-grid           3 columns
.case-metric-num             Space Grotesk 64px
```

### Testimonials

```
.testi-section               White bg
.testi-marquee               Horizontal scroll marquee
.testi-card                  Padding 32px, border-radius 12px, hover shadow
.testi-stars                 SVG stars, amber fill
.testi-avatar                Initials circle, gradient bg
```

### Big CTA

```
.bigcta-section              Dark bg, radial gradient amber overlay
.bigcta-title em             Italic amber
.bigcta-btns                 Flex row, gap 12px
```

### Footer

```
footer                       Dark bg, 5-column grid
.footer-logo-row             Logo SVG (gradient) + wordmark
.footer-blurb                Max-width 280px, muted text
.social-btn                  40px circle, border, hover amber bg
.footer-col-title             Mono 10px uppercase teal
.footer-links                 Stack, gap 12px, hover teal
.footer-bottom                Border-top, flex between
.footer-copy                  Muted mono
.footer-legal-row             Flex, gap 16px
```

---

## 6. Technical Approach

### Stack

```
Frontend        Plain HTML + CSS + vanilla JS
CSS             3 files: styles.css (base) + components.css (patterns) + responsive.css
JS              main.js (interactions) + components-loader.js (header/footer)
Fonts           Google Fonts (Inter, Space Grotesk, JetBrains Mono)
No framework    No React, no Tailwind, no build step
```

### File Structure

```
/
├── index.html                  Home — CSS inline en <style>
├── css/
│   ├── styles.css              Base: variables, layout, typography, sections
│   ├── components.css         Patterns: cards, feature, workflow, unified design
│   └── responsive.css          Media queries, mobile adjustments
├── js/
│   ├── main.js                 Mobile menu, counter animation, scroll effects
│   └── components-loader.js    Dynamic header/footer injection
├── components/
│   ├── header.html             Nav component (for sub-pages)
│   └── footer.html             Footer component (for sub-pages)
├── sectores/
│   ├── index.html              Sectores listing page
│   ├── ecommerce.html          Sector detail page
│   └── ...
└── pages/
    ├── quienes-somos.html
    ├── contacto.html
    └── ...
```

### CSS Architecture

> [!WARNING]
> **Discrepancia detectada**: Actualmente `index.html` tiene sus variables Weaves Premium y estilos en un `<style>` inline. El archivo `css/styles.css` contiene declaraciones de un estilo anterior ("CrewAI Style" con `--primary-color`, `--bg-dark` en vez de los nuevos tokens). Será necesario unificar refactorizando `.css/styles.css`.

```
styles.css         Global tokens, base styles, layout system, home-specific sections
components.css     Reusable UI patterns: cards, feature splits, unified design, forms
responsive.css     Breakpoint overrides: < 768px, < 1024px

CSS Custom Properties (Weaves Premium System)
──────────────────────────────────────────────
--indigo, --indigo-deep, --teal, --amber
--offwhite, --dark, --text, --muted, --border
--green, --red
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
```

### Component Loading System

```
components-loader.js
──────────────────────────────────────────────
getComponentsPath()  — detecta profundidad de ruta
loadComponent()     — fetch + innerHTML en placeholder
Init:               window.addEventListener('load', loadAll)

Placeholders:
  id="header-placeholder"   →   components/header.html
  id="footer-placeholder"   →   components/footer.html

Ruta calculada dinámicamente:
  /                   → ./components/
  /sectores/          → ../components/
  /pages/blog/        → ../../components/
  /pages/sub/         → ../../components/
```

### Key JS Behaviors

```
main.js
──────────────────────────────────────────────
1. Mobile menu toggle  (.menu-toggle click)
2. Counter animation   (IntersectionObserver + requestAnimationFrame)
3. Nav scroll effect   (window.scroll event → nav.scrolled class)
```

### URL / Routing

```
Static site — no routing server
href links pointing to relative .html files
Components path auto-calculated from window.location.pathname
```

---

## 7. Page Inventory

| Page | Route | Status |
|------|-------|--------|
| Home | `/index.html` | ✅ Live |
| Sectores | `/sectores/index.html` | ✅ Redesigned |
| Ecommerce | `/sectores/ecommerce.html` | 🔄 Pending |
| Salud | `/sectores/salud.html` | 🔄 Pending |
| Educación | `/sectores/educacion.html` | 🔄 Pending |
| Restauración | `/sectores/restauracion-turismo.html` | 🔄 Pending |
| Servicios Pro | `/sectores/servicios-profesionales.html` | 🔄 Pending |
| Startups | `/sectores/startups.html` | 🔄 Pending |
| Quiénes Somos | `/pages/quienes-somos.html` | 🔄 Pending |
| Contacto | `/pages/contacto.html` | 🔄 Pending |
| Diagnóstico | `/pages/diagnostico-gratuito.html` | 🔄 Pending |
