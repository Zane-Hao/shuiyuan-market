# AI Hero Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Inject 4 AI-generated architectural renders into the deck as 3 new hero slides (12 / 14 / 16) with banded layout matching existing Tier slides, renumber deck from 18 to 21 slides, update all cross-references and page indicators.

**Architecture:** Each hero slide is a self-contained HTML file in `deck/slides/`. Layout reuses existing `.tier-band` pattern from 11/12/13. Image area is a single `.hero-image` (or `.hero-image-split` for slide 16's B1+2F dual view). Bottom strip carries 3 `.dna-chip` labels naming the Shuiyuan Heart DNA elements visible in the render. Animations use existing `.fadeup` + `data-delay` + `data-sfx` system from CLAUDE.md.

**Tech Stack:** Plain HTML/CSS/JS, no build step. CSS variables from `deck/shared/tokens.css`. SFX via `postMessage` to parent iframe. Image renders served as static assets from `site/img/`.

---

## Spec Reference

This plan implements `docs/superpowers/specs/2026-05-14-ai-hero-slides-design.md`. Read the spec first if any context is unclear. Open questions resolved by user:
- Hero template: **Banded** (matches 11/13/15)
- Slide 16: **B1 + 2F only**, no 1F
- Numbering: **Renumber to 21**, update all cross-refs

---

## Task 0: Reconnaissance (read-only)

The user just overlaid classmate's repo (commit ae8daa7). Confirm prerequisites before writing code.

**Files:**
- Read: `shuiyuan-market/site/deck/slides/11-tier1.html`
- Read: `shuiyuan-market/site/deck/slides/12-tier2-ba.html`
- Read: `shuiyuan-market/site/deck/slides/13-tier3.html`
- Read: `shuiyuan-market/site/deck/shared/tokens.css`
- Read: `shuiyuan-market/site/deck/index.html`

- [ ] **Step 1: Confirm tier-band background colors in current slides**

  Read 11/12/13 and note the exact CSS rule for `.tier-band { background: ... }` in each. Spec assumes:
  - Slide 11 (Tier 1): `#5C7A85` (hardcoded teal)
  - Slide 12 (Tier 2): `var(--accent)`
  - Slide 13 (Tier 3): `var(--ink)`

  Confirm classmate's overlay didn't change these. If they did, the 3 new hero slides must match the *current* colors, not these spec values.

- [ ] **Step 2: Confirm `.fadeup` and easing tokens exist**

  Verify these CSS variables are defined in `tokens.css`:
  - `--bg`, `--ink`, `--accent`, `--warn`, `--muted`, `--hairline`, `--surface`
  - `--font-display`, `--font-body`, `--font-mono`
  - `--ease-out-expo`, `--ease-out-back`

  All hero slides assume these exist.

- [ ] **Step 3: Determine `deck/index.html` slide enumeration mechanism**

  Open `deck/index.html`. Look for how it lists or sequences slides. Two cases:
  - **Hardcoded array** (e.g., `const slides = ['01-title.html', '02-hook.html', ...]`): note the array location and contents. Will need updating in Task 10.
  - **Dynamic glob / directory listing**: no Task 10 needed.

  Record finding in commit message for the next task.

- [ ] **Step 4: Commit reconnaissance findings (if any)**

  No code changes; just acknowledge investigation. Skip commit if no notes file written.

---

## Task 1: Move and rename AI image assets

**Files:**
- Source: `AI_images/RFGT_toilet.png`, `tray_system.webp`, `B1_market.webp`, `2f_apparel.webp`
- Destination: `shuiyuan-market/site/img/ai-tier{1,2,3}-{toilet,tray,b1,2f}.{png,webp}`

- [ ] **Step 1: Verify source files exist**

  Run:
  ```bash
  ls -la "C:/Users/zane0/Documents/Claude/水源市場/AI_images/"
  ```

  Expected: 4 files listed with non-zero size (each ~2 MB).

- [ ] **Step 2: Copy and rename into site/img/**

  Run from project root:
  ```bash
  cp "C:/Users/zane0/Documents/Claude/水源市場/AI_images/RFGT_toilet.png"   "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site/img/ai-tier1-toilet.png"
  cp "C:/Users/zane0/Documents/Claude/水源市場/AI_images/tray_system.webp"   "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site/img/ai-tier2-tray.webp"
  cp "C:/Users/zane0/Documents/Claude/水源市場/AI_images/B1_market.webp"     "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site/img/ai-tier3-b1.webp"
  cp "C:/Users/zane0/Documents/Claude/水源市場/AI_images/2f_apparel.webp"    "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site/img/ai-tier3-2f.webp"
  ```

- [ ] **Step 3: Verify all 4 images present in destination**

  Run:
  ```bash
  ls -la "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site/img/ai-"*
  ```

  Expected: 4 files listed, file sizes match source.

- [ ] **Step 4: Stage and commit**

  ```bash
  git -C "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site" add img/ai-tier1-toilet.png img/ai-tier2-tray.webp img/ai-tier3-b1.webp img/ai-tier3-2f.webp
  git -C "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site" commit -m "feat(img): add 4 AI-generated hero renders for Tier 1/2/3"
  ```

---

## Task 2: Rename existing slides via git mv

Must happen **before** creating new files (otherwise the new files collide with old file numbers).

**Files:**
- Rename (preserves git history):
  - `12-tier2-ba.html` → `13-tier2-ba.html`
  - `13-tier3.html` → `15-tier3.html`
  - `14-personas.html` → `17-personas.html`
  - `15-loop.html` → `18-loop.html`
  - `16-sdg.html` → `19-sdg.html`
  - `17-principles.html` → `20-principles.html`
  - `18-stay.html` → `21-stay.html`

- [ ] **Step 1: Run all 7 git mv operations**

  ```bash
  cd "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site"
  git mv deck/slides/12-tier2-ba.html  deck/slides/13-tier2-ba.html
  git mv deck/slides/13-tier3.html     deck/slides/15-tier3.html
  git mv deck/slides/14-personas.html  deck/slides/17-personas.html
  git mv deck/slides/15-loop.html      deck/slides/18-loop.html
  git mv deck/slides/16-sdg.html       deck/slides/19-sdg.html
  git mv deck/slides/17-principles.html deck/slides/20-principles.html
  git mv deck/slides/18-stay.html      deck/slides/21-stay.html
  ```

  Slides 11 and 01-10 are not renamed.

- [ ] **Step 2: Verify renames**

  ```bash
  ls deck/slides/
  ```

  Expected: 01-10 unchanged; 11-tier1.html; 13-tier2-ba.html; 15-tier3.html; 17-personas.html; 18-loop.html; 19-sdg.html; 20-principles.html; 21-stay.html. Total 18 files (3 hero slides coming next).

- [ ] **Step 3: Commit renames**

  ```bash
  git commit -m "refactor(deck): renumber slides 12-18 to make room for 3 hero slides"
  ```

---

## Task 3: Create slide 12 — Tier 1 廁所視覺示意

**Files:**
- Create: `shuiyuan-market/site/deck/slides/12-tier1-hero-toilet.html`

- [ ] **Step 1: Write the slide HTML**

  Create `12-tier1-hero-toilet.html` with this exact content:

  ```html
  <!DOCTYPE html>
  <html lang="zh-Hant">
  <head>
  <meta charset="UTF-8" />
  <title>12 · Tier 1 廁所視覺示意</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../shared/tokens.css">
  <style>
    body { background: var(--bg); position: relative; overflow: hidden; }

    .slide {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }

    .tier-band {
      background: #5C7A85;
      color: var(--bg);
      padding: 44px 56px;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: baseline;
      gap: 48px;
    }
    .tier-band .left-group { display: flex; align-items: baseline; gap: 28px; }
    .phase-num { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.22em; opacity: 0.85; }
    .tier-title { font-family: var(--font-display); font-weight: 900; font-size: 56px; line-height: 1.05; letter-spacing: -0.02em; }
    .timeline-pill { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.18em; border: 1px solid rgba(251,247,238,0.5); padding: 8px 18px; }

    .hero-image {
      width: 100%; height: 100%;
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: scale(1.04);
      filter: blur(8px);
      transition: opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo), filter 1s var(--ease-out-expo);
    }
    .hero-image.in { opacity: 1; transform: scale(1); filter: blur(0); }
    .hero-image img { width: 100%; height: 100%; object-fit: cover; display: block; }

    .dna-strip {
      border-top: 1px solid var(--hairline);
      padding: 22px 56px;
      display: flex;
      gap: 40px;
      align-items: baseline;
    }
    .dna-chip {
      font-family: var(--font-mono);
      font-size: 13px;
      letter-spacing: 0.18em;
      color: var(--muted);
      text-transform: uppercase;
      opacity: 0;
      transform: translateY(8px);
      filter: blur(4px);
      transition: opacity .7s var(--ease-out-expo), transform .7s var(--ease-out-expo), filter .7s var(--ease-out-expo);
    }
    .dna-chip.in { opacity: 1; transform: translateY(0); filter: blur(0); }
    .dna-chip .dot { color: var(--accent); margin-right: 10px; }

    .fadeup { opacity: 0; transform: translateY(18px); filter: blur(6px); transition: opacity .7s var(--ease-out-expo), transform .7s var(--ease-out-expo), filter .7s var(--ease-out-expo); }
    .fadeup.in { opacity: 1; transform: translateY(0); filter: blur(0); }
  </style>
  </head>
  <body>
  <div class="slide">

    <div class="tier-band">
      <div class="left-group">
        <div class="phase-num fadeup" data-delay="200" data-sfx="tap">PHASE 01</div>
        <div class="tier-title fadeup" data-delay="500" data-sfx="focus">多元友善廁所 · 視覺示意</div>
      </div>
      <div class="timeline-pill fadeup" data-delay="800" data-sfx="tap">改造後 · AFTER</div>
    </div>

    <div class="hero-image" data-delay="1300" data-sfx="sparkle">
      <img src="../../img/ai-tier1-toilet.png" alt="RGFT 模組翻修後的多元友善廁所">
    </div>

    <div class="dna-strip">
      <div class="dna-chip" data-delay="1700" data-sfx="tap"><span class="dot">●</span>鈷藍 STALL HARDWARE</div>
      <div class="dna-chip" data-delay="1900" data-sfx="tap"><span class="dot">●</span>馬賽克 FEATURE STRIP</div>
      <div class="dna-chip" data-delay="2100" data-sfx="tap"><span class="dot">●</span>杜鵑花 WAYFINDING GLYPH</div>
    </div>

    <div class="credit" style="bottom: 18px;">SHUI-YUAN · SDG · 2026</div>
    <div class="page-indicator" style="bottom: 18px;"><span class="now">12</span> / 21</div>
  </div>

  <script>
    function sfx(c){try{window.parent.postMessage({type:'sfx',cue:c},'*')}catch(_){}}
    document.querySelectorAll('[data-delay]').forEach(el=>{
      const d=+el.dataset.delay||0;
      setTimeout(()=>{el.classList.add('in');if(el.dataset.sfx)sfx(el.dataset.sfx)},d);
    });
  </script>
  </body>
  </html>
  ```

- [ ] **Step 2: Verify file syntax and image reference**

  ```bash
  ls -la shuiyuan-market/site/deck/slides/12-tier1-hero-toilet.html
  ls -la shuiyuan-market/site/img/ai-tier1-toilet.png
  ```

  Expected: both files exist with non-zero size.

- [ ] **Step 3: Visual verification in browser**

  Start dev server if not running:
  ```bash
  cd shuiyuan-market/site && python -m http.server 8767
  ```

  Open `http://localhost:8767/deck/#12` (or whatever path the deck shell uses to load individual slides). Verify:
  - Top: teal band with "PHASE 01" + "多元友善廁所 · 視覺示意" + "改造後 · AFTER" pill, all fade up in order
  - Middle: AI toilet image fades in with scale + blur cleanup
  - Bottom: 3 dna-chips slide up one by one (鈷藍 → 馬賽克 → 杜鵑花)
  - Page indicator bottom-right: "12 / 21"

- [ ] **Step 4: Commit**

  ```bash
  git add deck/slides/12-tier1-hero-toilet.html
  git commit -m "feat(deck): add slide 12 - Tier 1 toilet hero visualization"
  ```

---

## Task 4: Create slide 14 — Tier 2 餐盤系統視覺示意

**Files:**
- Create: `shuiyuan-market/site/deck/slides/14-tier2-hero-tray.html`

- [ ] **Step 1: Write the slide HTML**

  Create `14-tier2-hero-tray.html` with this exact content:

  ```html
  <!DOCTYPE html>
  <html lang="zh-Hant">
  <head>
  <meta charset="UTF-8" />
  <title>14 · Tier 2 餐盤系統視覺示意</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../shared/tokens.css">
  <style>
    body { background: var(--bg); position: relative; overflow: hidden; }

    .slide {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }

    .tier-band {
      background: var(--accent);
      color: var(--bg);
      padding: 44px 56px;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: baseline;
      gap: 48px;
    }
    .tier-band .left-group { display: flex; align-items: baseline; gap: 28px; }
    .phase-num { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.22em; opacity: 0.85; }
    .tier-title { font-family: var(--font-display); font-weight: 900; font-size: 56px; line-height: 1.05; letter-spacing: -0.02em; }
    .timeline-pill { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.18em; border: 1px solid rgba(251,247,238,0.5); padding: 8px 18px; }

    .hero-image {
      width: 100%; height: 100%;
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: scale(1.04);
      filter: blur(8px);
      transition: opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo), filter 1s var(--ease-out-expo);
    }
    .hero-image.in { opacity: 1; transform: scale(1); filter: blur(0); }
    .hero-image img { width: 100%; height: 100%; object-fit: cover; display: block; }

    .dna-strip {
      border-top: 1px solid var(--hairline);
      padding: 22px 56px;
      display: flex;
      gap: 40px;
      align-items: baseline;
    }
    .dna-chip {
      font-family: var(--font-mono);
      font-size: 13px;
      letter-spacing: 0.18em;
      color: var(--muted);
      text-transform: uppercase;
      opacity: 0;
      transform: translateY(8px);
      filter: blur(4px);
      transition: opacity .7s var(--ease-out-expo), transform .7s var(--ease-out-expo), filter .7s var(--ease-out-expo);
    }
    .dna-chip.in { opacity: 1; transform: translateY(0); filter: blur(0); }
    .dna-chip .dot { color: var(--accent); margin-right: 10px; }

    .fadeup { opacity: 0; transform: translateY(18px); filter: blur(6px); transition: opacity .7s var(--ease-out-expo), transform .7s var(--ease-out-expo), filter .7s var(--ease-out-expo); }
    .fadeup.in { opacity: 1; transform: translateY(0); filter: blur(0); }
  </style>
  </head>
  <body>
  <div class="slide">

    <div class="tier-band">
      <div class="left-group">
        <div class="phase-num fadeup" data-delay="200" data-sfx="tap">PHASE 02</div>
        <div class="tier-title fadeup" data-delay="500" data-sfx="focus">集中餐盤系統 · 視覺示意</div>
      </div>
      <div class="timeline-pill fadeup" data-delay="800" data-sfx="tap">改造後 · AFTER</div>
    </div>

    <div class="hero-image" data-delay="1300" data-sfx="sparkle">
      <img src="../../img/ai-tier2-tray.webp" alt="統一餐盤回收與消毒站">
    </div>

    <div class="dna-strip">
      <div class="dna-chip" data-delay="1700" data-sfx="tap"><span class="dot">●</span>鈷藍 COUNTER EDGE</div>
      <div class="dna-chip" data-delay="1900" data-sfx="tap"><span class="dot">●</span>馬賽克 LOGO WALL</div>
      <div class="dna-chip" data-delay="2100" data-sfx="tap"><span class="dot">●</span>杜鵑花 WORKFLOW SIGNAGE</div>
    </div>

    <div class="credit" style="bottom: 18px;">SHUI-YUAN · SDG · 2026</div>
    <div class="page-indicator" style="bottom: 18px;"><span class="now">14</span> / 21</div>
  </div>

  <script>
    function sfx(c){try{window.parent.postMessage({type:'sfx',cue:c},'*')}catch(_){}}
    document.querySelectorAll('[data-delay]').forEach(el=>{
      const d=+el.dataset.delay||0;
      setTimeout(()=>{el.classList.add('in');if(el.dataset.sfx)sfx(el.dataset.sfx)},d);
    });
  </script>
  </body>
  </html>
  ```

- [ ] **Step 2: Visual verification**

  Open the slide in the dev server. Verify:
  - Top: **orange** band ("var(--accent)") with "PHASE 02 · 集中餐盤系統 · 視覺示意 · 改造後 · AFTER"
  - Middle: tray system image fades in
  - Bottom: 3 dna-chips
  - Page indicator: "14 / 21"

- [ ] **Step 3: Commit**

  ```bash
  git add deck/slides/14-tier2-hero-tray.html
  git commit -m "feat(deck): add slide 14 - Tier 2 tray system hero visualization"
  ```

---

## Task 5: Create slide 16 — Tier 3 樓層 visualization (B1 + 2F split)

**Files:**
- Create: `shuiyuan-market/site/deck/slides/16-tier3-hero-floors.html`

- [ ] **Step 1: Write the slide HTML with split image layout**

  Create `16-tier3-hero-floors.html` with this exact content:

  ```html
  <!DOCTYPE html>
  <html lang="zh-Hant">
  <head>
  <meta charset="UTF-8" />
  <title>16 · Tier 3 樓層視覺示意</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../shared/tokens.css">
  <style>
    body { background: var(--bg); position: relative; overflow: hidden; }

    .slide {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }

    .tier-band {
      background: var(--ink);
      color: var(--bg);
      padding: 44px 56px;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: baseline;
      gap: 48px;
    }
    .tier-band .left-group { display: flex; align-items: baseline; gap: 28px; }
    .phase-num { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.22em; opacity: 0.85; }
    .tier-title { font-family: var(--font-display); font-weight: 900; font-size: 56px; line-height: 1.05; letter-spacing: -0.02em; }
    .timeline-pill { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.18em; border: 1px solid rgba(251,247,238,0.5); padding: 8px 18px; }

    .hero-image-split {
      width: 100%; height: 100%;
      display: grid;
      grid-template-columns: 1fr 1px 1fr;
      opacity: 0;
      transform: scale(1.04);
      filter: blur(8px);
      transition: opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo), filter 1s var(--ease-out-expo);
    }
    .hero-image-split.in { opacity: 1; transform: scale(1); filter: blur(0); }
    .hero-image-split .col { position: relative; overflow: hidden; }
    .hero-image-split .col img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .hero-image-split .divider { background: var(--hairline); }
    .hero-image-split .col-label {
      position: absolute;
      bottom: 22px;
      left: 22px;
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.22em;
      color: var(--bg);
      background: rgba(31,30,28,0.65);
      padding: 8px 14px;
      text-transform: uppercase;
    }

    .dna-strip {
      border-top: 1px solid var(--hairline);
      padding: 22px 56px;
      display: flex;
      gap: 40px;
      align-items: baseline;
    }
    .dna-chip {
      font-family: var(--font-mono);
      font-size: 13px;
      letter-spacing: 0.18em;
      color: var(--muted);
      text-transform: uppercase;
      opacity: 0;
      transform: translateY(8px);
      filter: blur(4px);
      transition: opacity .7s var(--ease-out-expo), transform .7s var(--ease-out-expo), filter .7s var(--ease-out-expo);
    }
    .dna-chip.in { opacity: 1; transform: translateY(0); filter: blur(0); }
    .dna-chip .dot { color: var(--accent); margin-right: 10px; }

    .fadeup { opacity: 0; transform: translateY(18px); filter: blur(6px); transition: opacity .7s var(--ease-out-expo), transform .7s var(--ease-out-expo), filter .7s var(--ease-out-expo); }
    .fadeup.in { opacity: 1; transform: translateY(0); filter: blur(0); }
  </style>
  </head>
  <body>
  <div class="slide">

    <div class="tier-band">
      <div class="left-group">
        <div class="phase-num fadeup" data-delay="200" data-sfx="tap">PHASE 03</div>
        <div class="tier-title fadeup" data-delay="500" data-sfx="focus">樓層再造 · 視覺示意</div>
      </div>
      <div class="timeline-pill fadeup" data-delay="800" data-sfx="tap">改造後 · AFTER</div>
    </div>

    <div class="hero-image-split" data-delay="1300" data-sfx="sparkle">
      <div class="col">
        <img src="../../img/ai-tier3-2f.webp" alt="2F 成衣與修改">
        <div class="col-label">2F · 成衣與修改</div>
      </div>
      <div class="divider"></div>
      <div class="col">
        <img src="../../img/ai-tier3-b1.webp" alt="B1 生鮮市場">
        <div class="col-label">B1 · 生鮮市場</div>
      </div>
    </div>

    <div class="dna-strip">
      <div class="dna-chip" data-delay="1700" data-sfx="tap"><span class="dot">●</span>鈷藍 COLUMN COLLARS</div>
      <div class="dna-chip" data-delay="1900" data-sfx="tap"><span class="dot">●</span>馬賽克 TOTEM &amp; FEATURE WALL</div>
      <div class="dna-chip" data-delay="2100" data-sfx="tap"><span class="dot">●</span>杜鵑花 DIRECTORY PICTOGRAM</div>
    </div>

    <div class="credit" style="bottom: 18px;">SHUI-YUAN · SDG · 2026</div>
    <div class="page-indicator" style="bottom: 18px;"><span class="now">16</span> / 21</div>
  </div>

  <script>
    function sfx(c){try{window.parent.postMessage({type:'sfx',cue:c},'*')}catch(_){}}
    document.querySelectorAll('[data-delay]').forEach(el=>{
      const d=+el.dataset.delay||0;
      setTimeout(()=>{el.classList.add('in');if(el.dataset.sfx)sfx(el.dataset.sfx)},d);
    });
  </script>
  </body>
  </html>
  ```

- [ ] **Step 2: Visual verification — split image**

  Open the slide. Verify:
  - Top: dark green band ("var(--ink)") with "PHASE 03 · 樓層再造 · 視覺示意 · 改造後 · AFTER"
  - Middle: TWO images side-by-side, 2F (apparel) on **left**, B1 (market) on **right**, thin hairline divider between
  - Each image has a small black-background label bottom-left ("2F · 成衣與修改" / "B1 · 生鮮市場")
  - Bottom: 3 dna-chips
  - Page indicator: "16 / 21"

- [ ] **Step 3: Commit**

  ```bash
  git add deck/slides/16-tier3-hero-floors.html
  git commit -m "feat(deck): add slide 16 - Tier 3 floors hero (B1 + 2F split)"
  ```

---

## Task 6: Update cross-reference anchors in problem slides

**Files:**
- Modify: `shuiyuan-market/site/deck/slides/03-oily-food.html`
- Modify: `shuiyuan-market/site/deck/slides/05-no-seating.html`
- Modify: `shuiyuan-market/site/deck/slides/06-second-floor.html`

- [ ] **Step 1: Find and replace in 03-oily-food.html**

  Open `03-oily-food.html`. Find the line containing `SLIDE 12` (the Tier 2 anchor at the bottom). Change `SLIDE 12` to `SLIDE 13`.

  Use Edit tool with `old_string: "SLIDE 12"` → `new_string: "SLIDE 13"`. If multiple matches, use enough context to disambiguate.

- [ ] **Step 2: Find and replace in 05-no-seating.html**

  Same operation — change `SLIDE 12` → `SLIDE 13`.

- [ ] **Step 3: Find and replace in 06-second-floor.html**

  Change `SLIDE 13` → `SLIDE 15`.

- [ ] **Step 4: Verify in browser**

  Open each of 03 / 05 / 06 in the deck. Look at the bottom anchor; it should read `SLIDE 13` / `SLIDE 13` / `SLIDE 15` respectively.

- [ ] **Step 5: Commit**

  ```bash
  git add deck/slides/03-oily-food.html deck/slides/05-no-seating.html deck/slides/06-second-floor.html
  git commit -m "refactor(deck): update cross-references in problem slides 03/05/06"
  ```

---

## Task 7: Update slide 08 quote bridge anchor

**Files:**
- Modify: `shuiyuan-market/site/deck/slides/08-quote.html`

- [ ] **Step 1: Find and replace**

  Open `08-quote.html`. Find the bridge anchor pointing to slide 17 (principles). Change `SLIDE 17` to `SLIDE 20`.

  Use Edit tool with sufficient context (the anchor likely says "詳見 SLIDE 17" or similar).

- [ ] **Step 2: Verify**

  Open slide 08 in browser. Bridge anchor at bottom should now read `SLIDE 20`.

- [ ] **Step 3: Commit**

  ```bash
  git add deck/slides/08-quote.html
  git commit -m "refactor(deck): update slide 08 bridge anchor to SLIDE 20 (principles)"
  ```

---

## Task 8: Update slide 10 timeline anchors

**Files:**
- Modify: `shuiyuan-market/site/deck/slides/10-pyramid.html`

- [ ] **Step 1: Find and replace Phase 2 anchor**

  Open `10-pyramid.html`. Find the Phase 2 column's "詳見 Slide 12" anchor. Change `Slide 12` → `Slide 13`.

- [ ] **Step 2: Find and replace Phase 3 anchor**

  Same file. Find Phase 3's "詳見 Slide 13" anchor. Change `Slide 13` → `Slide 15`.

  ⚠️ Order matters: do Phase 3's change AFTER Phase 2's, otherwise the "Slide 13" replacement might also hit Phase 2's anchor (which is now "Slide 13"). Safer: use surrounding context in both edits.

- [ ] **Step 3: Verify in browser**

  Open slide 10. Three timeline columns should now read:
  - Phase 1 (left): `詳見 Slide 11`
  - Phase 2 (middle): `詳見 Slide 13`
  - Phase 3 (right): `詳見 Slide 15`

- [ ] **Step 4: Commit**

  ```bash
  git add deck/slides/10-pyramid.html
  git commit -m "refactor(deck): update slide 10 timeline anchors to 11/13/15"
  ```

---

## Task 9: Update page indicators across all 21 slides

Every slide has a page-indicator at bottom-right showing `<span class="now">N</span> / 18`. Two updates:
1. All slides: `/ 18` → `/ 21`
2. Renumbered slides: `now` span text updated to new number

**Files (all 21 slides):**
- All files in `shuiyuan-market/site/deck/slides/`

- [ ] **Step 1: Bulk replace `/ 18` → `/ 21` across all slides**

  Run from `shuiyuan-market/site/deck/slides/`:
  ```bash
  cd "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site/deck/slides"
  # Use sed in-place. Watch for line-ending issues on Windows.
  for f in *.html; do
    sed -i 's| / 18<| / 21<|g' "$f"
  done
  ```

  If sed isn't available or Windows line endings break things, use the Edit tool on each file. The exact match string is ` / 18<` (note leading space and trailing `<` to anchor to the closing tag).

- [ ] **Step 2: Spot-check 3 random slides**

  Open `01-title.html`, `11-tier1.html`, `21-stay.html`. Search for `page-indicator`. Each should show `/ 21`.

- [ ] **Step 3: Update `now` span value for renumbered slides**

  These slides had their file renamed, so their internal `now` value also needs updating:

  | File | Old `now` | New `now` |
  |---|---|---|
  | 13-tier2-ba.html | 12 | 13 |
  | 15-tier3.html | 13 | 15 |
  | 17-personas.html | 14 | 17 |
  | 18-loop.html | 15 | 18 |
  | 19-sdg.html | 16 | 19 |
  | 20-principles.html | 17 | 20 |
  | 21-stay.html | 18 | 21 |

  For each file, use Edit tool. The match string is `<span class="now">OLD</span>` → `<span class="now">NEW</span>`.

- [ ] **Step 4: Spot-check renumbered slides**

  Open `15-tier3.html` and `21-stay.html`. Search for `class="now"`. Should show `>15<` and `>21<` respectively.

- [ ] **Step 5: Commit**

  ```bash
  cd ../..
  git add deck/slides/*.html
  git commit -m "refactor(deck): update page indicators to N / 21"
  ```

---

## Task 10: Update deck shell (if hardcoded)

Depends on Task 0 Step 3 finding.

**Files:**
- Modify (conditional): `shuiyuan-market/site/deck/index.html`

- [ ] **Step 1: If shell uses hardcoded slide list**

  Open `deck/index.html`. Find the slide array (e.g., `const slides = [...]`). Update it to:

  ```javascript
  const slides = [
    '01-title.html',
    '02-hook.html',
    '03-oily-food.html',
    '04-sanitation.html',
    '05-no-seating.html',
    '06-second-floor.html',
    '07-method.html',
    '08-quote.html',
    '09-pad-causal.html',
    '10-pyramid.html',
    '11-tier1.html',
    '12-tier1-hero-toilet.html',
    '13-tier2-ba.html',
    '14-tier2-hero-tray.html',
    '15-tier3.html',
    '16-tier3-hero-floors.html',
    '17-personas.html',
    '18-loop.html',
    '19-sdg.html',
    '20-principles.html',
    '21-stay.html',
  ];
  ```

  Also check for any "total slides" constant (e.g., `const TOTAL = 18`) and update to 21.

- [ ] **Step 2: If shell is dynamic (glob)**

  No change needed. Document this in the commit.

- [ ] **Step 3: Verify navigation works end-to-end**

  Open `http://localhost:8767/deck/`. Use arrow keys (or whatever the deck navigation is) to step through slides 1 → 21. Confirm:
  - Order is correct (each slide leads to the next expected one)
  - Hero slides 12 / 14 / 16 appear in their right positions
  - No 404 in the network tab for any slide HTML
  - Cache-bust `?v=Date.now()` query still present on iframe src

- [ ] **Step 4: Commit**

  ```bash
  git add deck/index.html
  git commit -m "refactor(deck): update shell slide list to 21 entries"
  ```

  Skip this commit if shell is dynamic and no edits were needed.

---

## Task 11: End-to-end verification

- [ ] **Step 1: Cold-load each new hero slide**

  Open in separate browser tabs (Ctrl+F5 to bust cache):
  - `http://localhost:8767/deck/slides/12-tier1-hero-toilet.html`
  - `http://localhost:8767/deck/slides/14-tier2-hero-tray.html`
  - `http://localhost:8767/deck/slides/16-tier3-hero-floors.html`

  Each should:
  - Render without console errors
  - Animate in order: band fadeup → image scale/blur cleanup → 3 dna-chips stagger
  - Play SFX (tap / focus / tap / sparkle / tap / tap / tap) if browser audio is unlocked

- [ ] **Step 2: Navigate via deck shell**

  Open `http://localhost:8767/deck/`. Walk 1 → 21. Confirm:
  - Slides 11 → 12 → 13 → 14 → 15 → 16 sequence makes narrative sense (论述 → hero → 论述 → hero → 论述 → hero)
  - No layout breakage on any slide (especially the renumbered ones)
  - Page indicators show correct N / 21 on every slide

- [ ] **Step 3: Cross-reference click test**

  - On slide 03 / 05: bottom anchor reads "SLIDE 13"
  - On slide 06: bottom anchor reads "SLIDE 15"
  - On slide 08: bridge anchor reads "SLIDE 20"
  - On slide 10: timeline anchors read 11 / 13 / 15

- [ ] **Step 4: Image quality check**

  Open each AI image full-size in browser by navigating to `/img/ai-tier1-toilet.png` etc. Confirm:
  - All 4 images load
  - Each shows the Shuiyuan Heart DNA elements claimed in the dna-chips (cobalt blue accents, pixelated mosaic, azalea pictogram). If a DNA chip doesn't match what's visible in the image, edit that chip's text.

---

## Task 12: Final commit and push

- [ ] **Step 1: Check git status**

  ```bash
  cd "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site"
  git status
  git log --oneline -10
  ```

  Expected: working tree clean. Last ~6-8 commits should be the Task 1-10 commits in order.

- [ ] **Step 2: Push to origin**

  ```bash
  git push origin main
  ```

  Should succeed. If push is rejected (e.g., upstream changes), pull-rebase first:
  ```bash
  git pull --rebase origin main && git push origin main
  ```

- [ ] **Step 3: Update CLAUDE.md status note**

  Open `shuiyuan-market/site/CLAUDE.md`. Find the "Status" section and add a line:

  ```markdown
  - **2026-05-14**: Added 3 hero slides (12 / 14 / 16) showcasing 4 AI architectural renders. Deck now 21 slides total. All cross-refs and page indicators renumbered.
  ```

  Commit:
  ```bash
  git add CLAUDE.md
  git commit -m "docs: note 21-slide deck after AI hero slide additions"
  git push origin main
  ```

- [ ] **Step 4: Smoke test the live GitHub Pages URL**

  Once Pages rebuilds (~1 min), open the published URL (per CLAUDE.md: `https://Zane-Hao.github.io/shuiyuan-market/`). Walk through all 21 slides.

---

## Rollback

If anything goes wrong mid-implementation:

```bash
git -C "C:/Users/zane0/Documents/Claude/水源市場/shuiyuan-market/site" reset --hard backup/before-classmate-overlay-2026-05-14
```

This rolls back BOTH the AI hero work AND the classmate overlay. To keep classmate overlay but discard only AI hero work, create another safety branch before starting Task 1:

```bash
git branch backup/before-ai-hero-2026-05-14
```

Then `git reset --hard backup/before-ai-hero-2026-05-14` to roll back just the AI hero changes.

---

## Out of scope (recorded for future)

- 1F dining-commons hero (Prompt B output) — user hasn't generated this image yet. If created, add a 4th hero slide (or expand slide 16 to a 3-up grid).
- Tier 1 plumbing AI hero (Prompt E output) — user hasn't generated this yet. If created, swap into slide 11's existing `phase1-plumbing.jpg` slot, or add a 4th hero.
- Video version (`shuiyuan-market/video/MainV2`) does not need updating — it's a separate deliverable.
