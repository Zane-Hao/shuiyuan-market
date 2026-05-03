# Evidence Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip 2 fabricated methodology claims, surface a real 南門市場 vendor interview as a new Field Evidence section, add a Sources bibliography with footnote citations, annotate problem photos, and add 2 small content patches the interview revealed.

**Architecture:** Static React-via-CDN site (no build step). Add 2 new JSX section files alongside existing 3, plus 2 small shared components in helpers.jsx. Modify index.html for CSS, mini-nav, and script tags. Edit 3 existing section files for content patches and inline citations.

**Tech Stack:** HTML + Tailwind CDN + React 18 UMD + Babel-standalone + JetBrains Mono + Noto Serif TC + Noto Sans TC. No build, no test framework, no package.json. Verification = grep + browser preview via `python -m http.server` + `mcp__Claude_Preview__*` tools.

**Spec:** [`docs/superpowers/specs/2026-05-03-evidence-upgrade-design.md`](../specs/2026-05-03-evidence-upgrade-design.md)

---

## File Structure

```
shuiyuan-market/site/
├── index.html                 ← MODIFY: CSS rules, 2 nav <li>s, 2 script tags
├── app.jsx                    ← MODIFY: mount <EvidenceSection/> and <SourcesSection/>
├── helpers.jsx                ← MODIFY: add <Citation/> and <AnnotatedPhoto/> components
├── sections-1.jsx             ← MODIFY: rewrite ScaleNote (lines 515–528); replace problem photos with <AnnotatedPhoto/>; sprinkle inline citations
├── sections-2.jsx             ← MODIFY: interim-market sidebar in Tier 3
├── sections-3.jsx             ← MODIFY: add 4th structural principle "攤商共識先行"
├── sections-evidence.jsx      ← CREATE: <EvidenceSection/> — methodology box + 4 quote cards
├── sections-sources.jsx       ← CREATE: <SourcesSection/> — 2-col bibliography
└── docs/superpowers/
    ├── specs/2026-05-03-evidence-upgrade-design.md
    ├── plans/2026-05-03-evidence-upgrade.md   ← (this file)
    └── research/sources.md    ← CREATE in Task 0: verified URLs + Google review stats
```

---

## Task 0: Source Research

Fetch real URLs and statistics for the bibliography. Output is `docs/superpowers/research/sources.md` — a verified list that Tasks 6 and 8–10 will consume.

**Files:**
- Create: `docs/superpowers/research/sources.md`

- [ ] **Step 0.1: Create research output file with template structure**

```bash
mkdir -p shuiyuan-market/site/docs/superpowers/research
```

Write to `docs/superpowers/research/sources.md`:

```markdown
# Source Verification — Evidence Upgrade

**Retrieved:** 2026-05-03
**Principle:** If a source can't be verified, the claim it backs gets rephrased or removed, not finessed.

## ¹ Mehrabian–Russell PAD model
[fill: full citation with publisher + URL or ISBN]

## ² Path Intelligence dwell-time study
[fill: URL or secondary citation showing the +1% → +1.3% claim]

## ³ Retail Sensing
[fill: full title + URL]

## ⁴ 千萬投資外牆藝術 — 自由時報 2025
[fill: article URL + verified cost figure + retrieval date]

## ⁵ 水源之心 公共藝術 — 公共藝術網
[fill: URL]

## ⁶ 水源市場基本資料 — 臺北市市場處
[fill: URL + 1980 落成 / 212 攤 / 19% 熟食佔比 — confirm each from page]

## ⁷ Google Reviews snapshot
[fill: total review count, % 1-star, top 3 complaint themes by frequency, retrieval date]

## ⁸ TripAdvisor 水源市場
[fill: URL + review count + retrieval date]

## ⁹ 南門市場改建報導
[fill: 1–2 article URLs with renovation impact data]

## ¹⁰ 南門市場改建影響量化資料
[fill: visitor counts / revenue / sentiment — or mark UNVERIFIED if no source found]
```

- [ ] **Step 0.2: Fetch each source via WebFetch**

For each numbered entry, run WebFetch with a focused prompt extracting only the specific data needed. Use the URLs already documented in [`水源市場_視覺參考清單.md`](../../../../水源市場_視覺參考清單.md) as starting points for ⁴, ⁵, ⁶, ⁸, ⁹.

For ⁷ (Google Reviews), if WebFetch cannot read Google Maps reviews, fall back to: search for news articles aggregating the review sentiment, OR record what the public-facing review summary shows on the Maps card.

For ², if Path Intelligence's original 2007 report is unfindable, cite a secondary source that quotes it (Retail Sensing white paper, academic paper).

- [ ] **Step 0.3: Mark each entry VERIFIED / PARTIAL / UNVERIFIED**

Add a status line at the top of each entry:
- VERIFIED — URL works, claim confirmed
- PARTIAL — URL works but a sub-claim couldn't be verified; rephrase how it's used
- UNVERIFIED — no real source found; the claim that depends on it must be removed in later tasks

- [ ] **Step 0.4: Commit research notes**

```bash
cd shuiyuan-market/site
git add docs/superpowers/research/sources.md
git commit -m "research: verified source list for evidence upgrade"
```

---

## Task 1: Strip ScaleNote fabrications

Smallest, most isolated change. Lowest risk, ships visible improvement immediately.

**Files:**
- Modify: `sections-1.jsx:515-528` (the inner `<div>` of `ScaleNote`)

- [ ] **Step 1.1: Verify the fabricated text is exactly where the spec says**

```bash
cd shuiyuan-market/site
grep -n "攤商訪談 8 位\|35–50 分" sections-1.jsx
```

Expected output: 2 lines (one with "攤商訪談 8 位", one with "35–50 分").

- [ ] **Step 1.2: Replace lines 515–528 with the rewritten copy**

Use Edit to replace this block:

```jsx
        <div className="mt-3 text-[13px] leading-[1.75] text-ink/85 space-y-2">
          <p>
            本圖採 <strong>Mehrabian–Russell 環境心理量表</strong>的 0–100 標準化指數，
            由「空氣／嗅覺／視覺／動線／資訊／衛生／支付」七項環境因子合成。
          </p>
          <p>
            <span className="font-mono text-[11px] text-muted">CURRENT　</span>
            分數來自<strong>現場田野調查（攤商訪談 8 位、消費者攔訪 24 位）</strong>＋公開評論文本分析。
          </p>
          <p>
            <span className="font-mono text-[11px] text-muted">POST　　　</span>
            分數為<strong>推估值</strong>，依據同類市場改造案例（南門、新富、士東）改造前後平均提升 35–50 分之文獻基準推算，
            非實測結果。
          </p>
        </div>
```

with:

```jsx
        <div className="mt-3 text-[13px] leading-[1.75] text-ink/85 space-y-2">
          <p>
            本圖採 <strong>Mehrabian–Russell 環境心理量表</strong>的 0–100 標準化指數,
            由「空氣／嗅覺／視覺／動線／資訊／衛生／支付」七項環境因子合成。
          </p>
          <p>
            <span className="font-mono text-[11px] text-muted">CURRENT　</span>
            分數來自 <strong>Google 評論文本主題分析</strong> 與 <strong>多次現場觀察</strong>
            (見 §現況診斷攝影紀錄), 屬質性評估。
          </p>
          <p>
            <span className="font-mono text-[11px] text-muted">POST　　　</span>
            分數為 <strong>示意性推估值</strong>, 表達各維度若依本案三層解方執行後
            可能達到的相對水準, 非實測結果, 不作為定量預測。
          </p>
        </div>
```

- [ ] **Step 1.3: Verify fabrications are gone**

```bash
grep -c "攤商訪談 8 位\|24 位\|35–50 分" sections-1.jsx
```

Expected output: `0`

- [ ] **Step 1.4: Commit**

```bash
git add sections-1.jsx
git commit -m "strip fabricated PAD methodology claims"
```

---

## Task 2: Add `<Citation />` component to helpers.jsx

Inline footnote marker `[N]` that scrolls to the corresponding entry in the Sources section.

**Files:**
- Modify: `helpers.jsx` (add component before `Object.assign(window, ...)` line at end)

- [ ] **Step 2.1: Add Citation component**

Edit `helpers.jsx` — insert before the final `Object.assign(window, ...)` line:

```jsx
// Inline footnote citation marker — links to #sources-N entry
function Citation({ n }) {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(`source-${n}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.style.background = "rgba(224,122,60,0.18)";
      setTimeout(() => { target.style.background = ""; }, 1600);
    }
  };
  return (
    <a href={`#source-${n}`} onClick={handleClick}
       className="cite" aria-label={`Citation ${n}`}>
      [{n}]
    </a>
  );
}
```

- [ ] **Step 2.2: Export Citation on the window assignment line**

Find:

```jsx
Object.assign(window, { useInView, useCounter, Reveal, Label, Section, Icon });
```

Replace with:

```jsx
Object.assign(window, { useInView, useCounter, Reveal, Label, Section, Icon, Citation });
```

- [ ] **Step 2.3: Verify**

```bash
grep -n "function Citation\|Citation }" helpers.jsx
```

Expected output: 2 lines — one with `function Citation({ n })`, one with `Citation })` in the export.

- [ ] **Step 2.4: Commit**

```bash
git add helpers.jsx
git commit -m "feat: add Citation component for inline footnote markers"
```

---

## Task 3: Add `<AnnotatedPhoto />` component to helpers.jsx

CSS-overlay annotations on photos. Labels positioned by `{x, y}` percentages, scale with the image.

**Files:**
- Modify: `helpers.jsx` (add component below `Citation`, before `Object.assign`)

- [ ] **Step 3.1: Add AnnotatedPhoto component**

Edit `helpers.jsx` — insert below the `Citation` function, before `Object.assign`:

```jsx
// Photo with CSS-overlay annotations — labels describe only what's visibly in the image.
// annotations: [{ x: "20%", y: "35%", label: "...", arrow?: "→" }]
function AnnotatedPhoto({ src, alt, annotations = [], className = "" }) {
  return (
    <figure className={`annotated-photo photo-card photo-warn aspect-[16/10] relative ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover"/>
      {annotations.map((a, i) => (
        <div key={i} className="annot" style={{ top: a.y, left: a.x }}>
          <span className="annot-arrow">{a.arrow || "→"}</span>
          <span className="annot-label">{a.label}</span>
        </div>
      ))}
    </figure>
  );
}
```

- [ ] **Step 3.2: Export AnnotatedPhoto**

Find:

```jsx
Object.assign(window, { useInView, useCounter, Reveal, Label, Section, Icon, Citation });
```

Replace with:

```jsx
Object.assign(window, { useInView, useCounter, Reveal, Label, Section, Icon, Citation, AnnotatedPhoto });
```

- [ ] **Step 3.3: Verify**

```bash
grep -n "function AnnotatedPhoto\|AnnotatedPhoto }" helpers.jsx
```

Expected output: 2 lines.

- [ ] **Step 3.4: Commit**

```bash
git add helpers.jsx
git commit -m "feat: add AnnotatedPhoto component"
```

---

## Task 4: Add CSS rules and mini-nav entries to index.html

CSS for the new `.cite`, `.annotated-photo`, `.annot` classes; 2 new `<li>`s in mini-nav; 2 new `<script>` tags loading the new section files.

**Files:**
- Modify: `index.html` (3 separate edits in `<style>`, `<nav id="mini-nav">`, and the script-loading block)

- [ ] **Step 4.1: Add CSS rules**

Edit `index.html` — find the closing `</style>` tag in the `<head>` block. Insert these rules immediately before it:

```css
  /* citation marker */
  .cite {
    font-family: var(--font-mono);
    font-size: 0.62em;
    vertical-align: super;
    color: var(--accent);
    text-decoration: none;
    padding: 0 2px;
    cursor: pointer;
    transition: background .25s ease;
  }
  .cite:hover { text-decoration: underline; background: rgba(224,122,60,0.08); }

  /* annotated photo overlays */
  .annotated-photo { position: relative; }
  .annotated-photo .annot {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex; align-items: center; gap: 6px;
    pointer-events: none;
    z-index: 2;
  }
  .annotated-photo .annot-arrow {
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--accent);
    text-shadow: 0 0 6px rgba(0,0,0,0.6);
    line-height: 1;
  }
  .annotated-photo .annot-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    background: var(--accent);
    color: var(--bg);
    padding: 3px 8px;
    white-space: nowrap;
  }

  /* highlighted source on cite-click */
  .source-entry { transition: background .35s ease; padding: 4px 6px; margin: -4px -6px; }
```

- [ ] **Step 4.2: Add 2 mini-nav `<li>` entries**

Find this section in `index.html`:

```html
    <li><button class="mini-item" data-target="problem"><span class="mini-dot"></span><span class="mini-label">現況診斷</span></button></li>
    <li><button class="mini-item" data-target="data"><span class="mini-dot"></span><span class="mini-label">數據洞察</span></button></li>
```

Replace with:

```html
    <li><button class="mini-item" data-target="problem"><span class="mini-dot"></span><span class="mini-label">現況診斷</span></button></li>
    <li><button class="mini-item" data-target="evidence"><span class="mini-dot"></span><span class="mini-label">案例研究</span></button></li>
    <li><button class="mini-item" data-target="data"><span class="mini-dot"></span><span class="mini-label">數據洞察</span></button></li>
```

Then find:

```html
    <li><button class="mini-item" data-target="sdg"><span class="mini-dot"></span><span class="mini-label">SDG 對齊</span></button></li>
    <li><button class="mini-item" data-target="cta"><span class="mini-dot"></span><span class="mini-label">結語</span></button></li>
```

Replace with:

```html
    <li><button class="mini-item" data-target="sdg"><span class="mini-dot"></span><span class="mini-label">SDG 對齊</span></button></li>
    <li><button class="mini-item" data-target="sources"><span class="mini-dot"></span><span class="mini-label">引用來源</span></button></li>
    <li><button class="mini-item" data-target="cta"><span class="mini-dot"></span><span class="mini-label">結語</span></button></li>
```

- [ ] **Step 4.3: Add 2 script tags for new section files**

Find:

```html
<script type="text/babel" src="helpers.jsx"></script>
<script type="text/babel" src="sections-1.jsx"></script>
<script type="text/babel" src="sections-2.jsx"></script>
<script type="text/babel" src="sections-3.jsx"></script>
<script type="text/babel" src="app.jsx"></script>
```

Replace with:

```html
<script type="text/babel" src="helpers.jsx"></script>
<script type="text/babel" src="sections-1.jsx"></script>
<script type="text/babel" src="sections-evidence.jsx"></script>
<script type="text/babel" src="sections-2.jsx"></script>
<script type="text/babel" src="sections-3.jsx"></script>
<script type="text/babel" src="sections-sources.jsx"></script>
<script type="text/babel" src="app.jsx"></script>
```

- [ ] **Step 4.4: Verify all 3 edits**

```bash
grep -c 'data-target="evidence"\|data-target="sources"' index.html
```

Expected: `2`

```bash
grep -c "sections-evidence.jsx\|sections-sources.jsx" index.html
```

Expected: `2`

```bash
grep -c "\.cite\b\|\.annotated-photo\|\.annot " index.html
```

Expected: `>= 5` (CSS rule selectors).

- [ ] **Step 4.5: Commit**

```bash
git add index.html
git commit -m "feat: scaffold for new evidence + sources sections (CSS, nav, scripts)"
```

---

## Task 5: Create `sections-evidence.jsx` — Field Evidence section

The 南門案例研究 section. Methodology box (sticky on lg) + 4 quote cards mapped to 水源 design choices.

**Files:**
- Create: `sections-evidence.jsx`

- [ ] **Step 5.1: Write the new section file**

Create `shuiyuan-market/site/sections-evidence.jsx` with:

```jsx
// Section · Field Evidence · 南門案例研究
const { useState: uSE, useEffect: uEE } = React;

const NANMEN_QUOTES = [
  {
    n: "A",
    theme: "硬體感受",
    timestamp: "0:08–0:16",
    quote: "改建前天花板比較低,它的空氣品質與環境感覺就沒有那麼舒服…現在不同的裝置都達到了一流的水準。",
    mapsTo: "Tier 1 衛生底線重建 · 通風、廁所翻修、照明",
    mapsToTarget: "pyramid",
  },
  {
    n: "B",
    theme: "管理透明化",
    timestamp: "0:37–0:46",
    quote: "現在分工分得很細,電工或水電的部分,它都分得很專業…像以前可能透過紅包,或是由特定單位在負責。",
    mapsTo: "新建議 · 公開招標、外部稽核、攤商代表會 (補強 Tier 3)",
    mapsToTarget: "pyramid",
  },
  {
    n: "C",
    theme: "中繼安排",
    timestamp: "1:43–1:48",
    quote: "中間的過渡市場也是市政府的安排…據我們觀察,這樣的安排都是很成功的,而且裝置又好。",
    mapsTo: "新建議 · 改建期間中繼市場規劃 (見 §三層解方/補充)",
    mapsToTarget: "pyramid",
  },
  {
    n: "D",
    theme: "決定性因素",
    timestamp: "3:20",
    quote: "主要是看攤商跟政府配合的程度,那是一個決定性的因素。",
    mapsTo: "結構性原則第 4 條 · 攤商共識先行",
    mapsToTarget: "sdg",
  },
];

function MethodologyBox() {
  return (
    <div className="card-warm p-5 rounded-md">
      <Label>METHODOLOGY · 方法</Label>
      <dl className="mt-4 space-y-3 text-[13.5px]">
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <dt className="font-mono text-[11px] tracking-[0.15em] text-muted pt-0.5">時間</dt>
          <dd>2026 年</dd>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <dt className="font-mono text-[11px] tracking-[0.15em] text-muted pt-0.5">地點</dt>
          <dd>臺北市公有南門市場 (Nanmen Public Market)<br/>
            <span className="text-muted text-[12px]">post-renovation reference case</span>
          </dd>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <dt className="font-mono text-[11px] tracking-[0.15em] text-muted pt-0.5">對象</dt>
          <dd>資深攤商 1 位 — 改建前後皆營業</dd>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <dt className="font-mono text-[11px] tracking-[0.15em] text-muted pt-0.5">形式</dt>
          <dd>結構化訪談 + 現場錄音 + 逐字稿整理<br/>
            <span className="text-muted text-[12px]">受訪者已徵得拍照與引用同意</span>
          </dd>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <dt className="font-mono text-[11px] tracking-[0.15em] text-muted pt-0.5">補充</dt>
          <dd>多次現場非結構化對話與觀察 (未錄音)</dd>
        </div>
      </dl>

      <div className="mt-5 pt-4 border-t border-ink/15">
        <div className="font-mono text-[11px] tracking-[0.15em] text-muted mb-2">研究設計</div>
        <p className="text-[13px] leading-[1.65] text-ink/85">
          採「<strong>比較案例研究</strong>」(comparative case study) — 訪問已完成改建的南門市場攤商,
          擷取改建後成功要素與轉場期經驗,作為水源市場改建設計的依據,而非以水源攤商為對象的問卷調查。
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-ink/15">
        <div className="font-mono text-[11px] tracking-[0.15em] text-muted mb-2">限制</div>
        <p className="text-[13px] leading-[1.65] text-ink/85">
          樣本數小 (N=1 結構化錄音);本研究不主張統計推論,
          僅作為改建後成功要素的質性證據。
        </p>
      </div>
    </div>
  );
}

function QuoteCard({ q, idx }) {
  return (
    <Reveal delay={idx * 80}>
      <article className="card-warm rounded-md overflow-hidden border-l-4 border-accent">
        <div className="p-6 md:p-7">
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[14px] font-bold text-accent">{q.n}.</span>
              <span className="label-sm">{q.theme}</span>
            </div>
            <span className="font-mono text-[11px] tracking-[0.1em] text-muted">{q.timestamp}</span>
          </div>
          <blockquote className="font-display text-[20px] md:text-[22px] leading-[1.55] text-ink relative pl-6">
            <span className="absolute left-0 top-[-4px] text-accent text-[40px] leading-none font-display">「</span>
            {q.quote}
            <span className="text-accent text-[28px] leading-none font-display">」</span>
          </blockquote>
          <div className="mt-4 text-[12px] text-muted font-mono tracking-[0.05em]">
            南門市場資深攤商 · 已同意引用 · 2026 訪談
          </div>
          <div className="mt-5 pt-4 border-t border-ink/15 flex items-start gap-3">
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted shrink-0 pt-0.5">→ 對應水源</span>
            <span className="text-[13.5px] text-ink/85 leading-[1.55]">{q.mapsTo}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function EvidenceSection() {
  return (
    <Section id="evidence">
      <Reveal>
        <Label num="01.5">EVIDENCE · 一手案例研究</Label>
        <h2 className="font-display font-black t-h2 mt-4 max-w-[920px]">
          在「<span className="text-accent">成功改建</span>」的市場現場,攤商怎麼說?
        </h2>
        <p className="mt-6 max-w-[65ch] text-[18px] leading-[1.75] text-ink/85">
          我們前往已完成改建的<strong>南門市場</strong>,採訪資深攤商,
          蒐集改建前後的第一手對照、轉場期經驗,以及攤商眼中「改建成功的決定性因素」。
          每段引用皆為原文逐字稿,並對應水源改建提案的具體設計選擇。
        </p>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <MethodologyBox/>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          {NANMEN_QUOTES.map((q, i) => (
            <QuoteCard key={i} q={q} idx={i}/>
          ))}
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { EvidenceSection });
```

- [ ] **Step 5.2: Verify file syntax**

```bash
ls -la sections-evidence.jsx && wc -l sections-evidence.jsx
```

Expected: file exists, ~140 lines.

- [ ] **Step 5.3: Commit**

```bash
git add sections-evidence.jsx
git commit -m "feat: add Field Evidence section (南門案例研究)"
```

---

## Task 6: Create `sections-sources.jsx` — Sources / 引用與資料來源 section

Two-column bibliography. Each entry has `id="source-N"` so `<Citation n={N}/>` markers can scroll to it.

**Files:**
- Create: `sections-sources.jsx`
- Read: `docs/superpowers/research/sources.md` (from Task 0) for verified URLs and data

- [ ] **Step 6.1: Write the new section file**

Create `shuiyuan-market/site/sections-sources.jsx`:

```jsx
// Section · Sources · 引用與資料來源
const { useState: uSS } = React;

// Each entry: { n, group, title, detail, url, status }
// Populated from docs/superpowers/research/sources.md (Task 0 output).
// Replace the placeholder strings below with verified data before committing Task 6 final.
const SOURCES = [
  {
    n: 1, group: "academic",
    title: "Mehrabian, A. & Russell, J. A. (1974)",
    detail: "An Approach to Environmental Psychology. MIT Press.",
    url: null,
  },
  {
    n: 2, group: "academic",
    title: "Path Intelligence (2007)",
    detail: "9-month UK retail dwell-time study. +1% dwell time → +1.3% sales.",
    url: null,
  },
  {
    n: 3, group: "academic",
    title: "Retail Sensing (2020)",
    detail: "[fill from research/sources.md ³]",
    url: null,
  },
  {
    n: 4, group: "press",
    title: "自由時報 (2025)",
    detail: "公館水源市場外牆變美 多視角看 57 色漸層杜鵑 — 外牆公共藝術投資紀錄",
    url: "https://art.ltn.com.tw/article/breakingnews/5163879",
  },
  {
    n: 5, group: "gov",
    title: "臺北市公共藝術網",
    detail: "「水源之心」作品頁 — 國際藝術家動力公共藝術",
    url: "https://publicart.taipei/Works_detail.aspx?id=507",
  },
  {
    n: 6, group: "gov",
    title: "臺北市市場處",
    detail: "公有水源市場介紹頁 — 1980 年落成 / 共 212 攤 / 熟食佔比 19%",
    url: "https://www.tcma.gov.taipei/News_Content.aspx?n=1A4C7120ABFD0F9F&sms=26C5BF03E7963F4E&s=55F3A5B5995A421B",
  },
  {
    n: 7, group: "press",
    title: "Google Reviews 公開評論快照",
    detail: "[fill review count, % 1-star, top 3 complaint themes from research/sources.md ⁷]",
    url: null,
  },
  {
    n: 8, group: "press",
    title: "TripAdvisor 水源市場頁面",
    detail: "[fill review count + retrieval date]",
    url: "https://www.tripadvisor.com/Attraction_Review-g293913-d9712976-Reviews-Shuiyuan_Market-Taipei.html",
  },
  {
    n: 9, group: "press",
    title: "南門市場改建案 (2023)",
    detail: "ShoppingDesign / TRAVELER Luxe 等多篇報導 — 玻璃帷幕、自然採光、明亮動線",
    url: "https://www.shoppingdesign.com.tw/post/view/4514",
  },
  {
    n: 10, group: "interview",
    title: "南門市場資深攤商訪談 (2026)",
    detail: "本團隊結構化錄音訪談,逐字稿存檔。受訪者已同意引用。完整摘要見 §一手案例研究。",
    url: null,
  },
];

const GROUP_LABEL = {
  academic: "學術文獻",
  gov: "政府／公部門資料",
  press: "新聞報導與輿情",
  interview: "本團隊一手訪談",
};

function SourceEntry({ s }) {
  return (
    <li id={`source-${s.n}`} className="source-entry flex gap-4 py-3">
      <span className="font-mono text-[12px] font-bold text-accent shrink-0 w-7 pt-0.5">
        [{s.n}]
      </span>
      <div className="flex-1">
        <div className="font-display font-bold text-[15px] text-ink">{s.title}</div>
        <div className="text-[13.5px] text-ink/80 leading-[1.55] mt-0.5">{s.detail}</div>
        {s.url && (
          <a href={s.url} target="_blank" rel="noopener"
             className="font-mono text-[11px] text-accent break-all hover:underline mt-1 inline-block">
            {s.url}
          </a>
        )}
      </div>
    </li>
  );
}

function SourcesSection() {
  const groups = ["academic", "gov", "press", "interview"];
  return (
    <Section id="sources">
      <Reveal>
        <Label num="06.5">SOURCES · 引用與資料來源</Label>
        <h2 className="font-display font-black t-h2 mt-4 max-w-[820px]">
          所有數據與主張的<span className="text-accent">出處清單</span>。
        </h2>
        <p className="mt-6 max-w-[65ch] text-[17px] leading-[1.7] text-ink/85">
          本提案中所有數字、引用、案例都來自下列公開資料、學術文獻或本團隊的一手訪談。
          每一項主張均可追溯到原始出處。
        </p>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-8">
        {groups.map((g) => {
          const items = SOURCES.filter((s) => s.group === g);
          if (items.length === 0) return null;
          return (
            <div key={g}>
              <Label>{GROUP_LABEL[g]}</Label>
              <ul className="mt-4 divide-y divide-ink/10">
                {items.map((s) => <SourceEntry key={s.n} s={s}/>)}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

Object.assign(window, { SourcesSection });
```

- [ ] **Step 6.2: Replace placeholder strings with verified data from Task 0**

Open `docs/superpowers/research/sources.md`. For each entry marked VERIFIED or PARTIAL, copy the verified detail/URL into the corresponding `SOURCES` entry above. For entries marked UNVERIFIED, either:
- Remove the entry from the list AND remove its citation marker `[N]` from any later task, OR
- Keep the entry with `detail: "[未公開資料 — 暫缺出處]"` and `status: "PARTIAL"` so it's transparently marked.

- [ ] **Step 6.3: Verify**

```bash
ls -la sections-sources.jsx && wc -l sections-sources.jsx
grep -c "id=\`source-" sections-sources.jsx
```

Expected: file exists, ~110 lines, count of `id=` matches `SOURCES.length`.

- [ ] **Step 6.4: Commit**

```bash
git add sections-sources.jsx docs/superpowers/research/sources.md
git commit -m "feat: add Sources section with verified bibliography"
```

---

## Task 7: Wire new sections into `app.jsx`

Mount `<EvidenceSection/>` between `<ProblemSection/>` and `<DataSection/>`. Mount `<SourcesSection/>` between `<SDGSection/>` and `<CTASection/>`.

**Files:**
- Modify: `app.jsx` (the `return (<>...</>)` block in `ProposalSite`)

- [ ] **Step 7.1: Read current composition**

```bash
grep -A 12 "function ProposalSite" app.jsx
```

Confirm the return JSX currently is:

```jsx
    <>
      <Hero />
      <ProblemSection />
      <DataSection />
      <PyramidSection />
      <UsersSection />
      <LoopSection />
      <SDGSection />
      <CTASection />
    </>
```

- [ ] **Step 7.2: Replace with new composition**

Use Edit to replace exactly:

```jsx
    <>
      <Hero />
      <ProblemSection />
      <DataSection />
      <PyramidSection />
      <UsersSection />
      <LoopSection />
      <SDGSection />
      <CTASection />
    </>
```

with:

```jsx
    <>
      <Hero />
      <ProblemSection />
      <EvidenceSection />
      <DataSection />
      <PyramidSection />
      <UsersSection />
      <LoopSection />
      <SDGSection />
      <SourcesSection />
      <CTASection />
    </>
```

- [ ] **Step 7.3: Verify**

```bash
grep -c "EvidenceSection\|SourcesSection" app.jsx
```

Expected: `2`.

- [ ] **Step 7.4: Browser verification — first end-to-end check**

Start preview server. Open localhost:8765. The page should load without errors and the mini-nav should show 10 dots. The new sections should render between Problem/Data and SDG/CTA respectively.

```bash
# Use mcp__Claude_Preview__preview_start with name "site"
# Then mcp__Claude_Preview__preview_eval with:
#   document.querySelectorAll('[data-section]').length
# Expected: 10
#
# Then mcp__Claude_Preview__preview_eval with:
#   [...document.querySelectorAll('[data-section]')].map(s => s.dataset.section)
# Expected: ["hero","problem","evidence","data","pyramid","users","loop","sdg","sources","cta"]
#
# Then mcp__Claude_Preview__preview_console_logs with level="error"
# Expected: no errors
```

- [ ] **Step 7.5: Commit**

```bash
git add app.jsx
git commit -m "feat: mount EvidenceSection and SourcesSection in composition"
```

---

## Task 8: Replace problem photos with `<AnnotatedPhoto/>` in sections-1.jsx

Each of the 4 problems gets one annotated lead photo. The other photos in the slideshows stay as-is to keep the variety.

**Files:**
- Modify: `sections-1.jsx` — the `PROBLEMS` array (lines ~128–157) gains an `annotations` field per problem; the JSX rendering swaps out the lead photo for `<AnnotatedPhoto/>`

- [ ] **Step 8.1: Add annotations field to each PROBLEMS entry**

Find the `PROBLEMS = [` array. For each entry, add an `annotations` array describing labels visibly anchored to features in the FIRST image. Replace the array with:

```jsx
const PROBLEMS = [
  {
    n: "01",
    title: "油膩餐食區",
    body: "熟食攤位佔比 19%,但排煙與廢水處理仍停留在 1980 年的初代規格。攤前直接用餐,油煙、廢水、走道氣味彼此交疊。",
    imgs: ["img/foodzone-1.jpg", "img/foodzone-2.jpg"],
    annotations: [
      { x: "30%", y: "28%", label: "排煙設備缺位" },
      { x: "55%", y: "65%", label: "走道與烹飪檯距離 < 50cm" },
      { x: "78%", y: "82%", label: "攤前用餐位置" },
    ],
    hot: { x: 32, y: 62 },
  },
  {
    n: "02",
    title: "衛生底線",
    body: "肉攤血水、檯面與走道之間沒有明確分界。地板濕滑、檯面狼藉 — 這是 Google 評論中最高頻的負評來源,也是市場長年被「不敢進來」標籤的核心原因。",
    img: "img/meat-tools.jpg",
    annotations: [
      { x: "35%", y: "52%", label: "工具放置面" },
      { x: "65%", y: "70%", label: "檯面與走道無分隔" },
    ],
    hot: { x: 70, y: 30 },
  },
  {
    n: "03",
    title: "無集中座位",
    body: "212 攤、0 個正式集中用餐區。消費者在攤販前直接吃,名攤如龍記前永遠是站著等的人潮,不只衛生,更讓人不願久留。",
    imgs: ["img/no-seat-stall.jpg", "img/nanmen-seat-cross.jpg"],
    annotations: [
      { x: "45%", y: "55%", label: "站立用餐人潮" },
      { x: "75%", y: "78%", label: "塑膠椅臨時擺放" },
    ],
    hot: { x: 48, y: 78 },
  },
  {
    n: "04",
    title: "二樓低利用率",
    body: "服飾修改、雜貨、職人服務集中於二樓,但能見度與指引不足;連顯眼的紅色箭頭也無法引導出實質人流 — 二樓成了一樓人潮的「上不去的天花板」。",
    imgs: ["img/longji.jpg", "img/escalator.jpg", "img/2f-shops.jpg"],
    annotations: [
      { x: "50%", y: "30%", label: "樓層指引不顯眼" },
      { x: "70%", y: "70%", label: "走道照明強度低" },
    ],
    hot: { x: 78, y: 50 },
  },
];
```

(Note: x/y values are starting estimates. The implementer should preview the page, see where labels actually land on each image, and tune the percentages so they overlay the right features.)

- [ ] **Step 8.2: Update the rendering JSX in `ProblemSection` to use `<AnnotatedPhoto/>` for the lead image**

Find:

```jsx
              {p.imgs ? (
                <Slideshow imgs={p.imgs} alt={p.title}/>
              ) : (
                <div className="photo-card photo-warn aspect-[16/10]">
                  <img src={p.img} alt={p.title} loading="lazy"/>
                </div>
              )}
```

Replace with:

```jsx
              {p.imgs ? (
                <>
                  <AnnotatedPhoto
                    src={p.imgs[0]}
                    alt={p.title}
                    annotations={p.annotations}/>
                  {p.imgs.length > 1 && (
                    <div className="mt-3">
                      <Slideshow imgs={p.imgs.slice(1)} alt={`${p.title} — 補充`}/>
                    </div>
                  )}
                </>
              ) : (
                <AnnotatedPhoto
                  src={p.img}
                  alt={p.title}
                  annotations={p.annotations}/>
              )}
```

- [ ] **Step 8.3: Browser verification — annotations land on visible features**

Restart preview server. Scroll to `#problem`. For each of the 4 problems, take a screenshot and confirm each label arrow points at the feature its text claims.

```bash
# mcp__Claude_Preview__preview_eval:
#   document.querySelector('[data-section="problem"]').scrollIntoView()
# Then take screenshot, examine each annotated photo
```

If a label is misaligned, edit the corresponding `{x, y}` in the PROBLEMS array. Repeat until all labels overlay correctly.

- [ ] **Step 8.4: Commit**

```bash
git add sections-1.jsx
git commit -m "feat: annotated lead photos for the 4 problem cards"
```

---

## Task 9: Add interim-market sidebar in Pyramid Tier 3 (sections-2.jsx)

A small "改建期間中繼市場" callout box at the end of Tier 3's content. Cited from the 南門 interview Card C.

**Files:**
- Modify: `sections-2.jsx` — find the Tier 3 rendering block (`{i === 2 && (` around line ~340) and add the sidebar.

- [ ] **Step 9.1: Locate the Tier 3 block**

```bash
grep -n "i === 2" sections-2.jsx
```

Expected: at least one match around `{i === 2 && (` inside `PyramidSection`.

- [ ] **Step 9.2: Add the interim-market block at the end of the Tier 3 content**

Find this passage in `sections-2.jsx`:

```jsx
                {i === 2 && (
                  <div className="mt-8">
                    <div className="label-sm mb-3">FLOOR FUNCTION · 三層分工 · B1 / 1F / 2F</div>
                    <FloorSchematic/>
                  </div>
                )}
```

Replace with:

```jsx
                {i === 2 && (
                  <div className="mt-8">
                    <div className="label-sm mb-3">FLOOR FUNCTION · 三層分工 · B1 / 1F / 2F</div>
                    <FloorSchematic/>

                    {/* Interim-market sidebar — sourced from Card C of Field Evidence */}
                    <div className="mt-8 p-6 border-l-4 border-accent bg-paper">
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="font-mono text-[11px] tracking-[0.2em] text-accent font-bold">補充</span>
                        <span className="font-display font-bold text-[18px]">改建期間中繼市場規劃</span>
                      </div>
                      <p className="text-[14px] text-ink/85 leading-[1.65] mb-4">
                        南門案例顯示,改建期間的中繼市場安排是<strong>成功與否的關鍵</strong>之一。
                        水源市場改建期間應同步規劃:
                      </p>
                      <ul className="space-y-2 text-[13.5px] text-ink/85 mb-4">
                        <li className="flex gap-2"><span className="text-accent">·</span><span>由市府主導選址、規劃、興建中繼市場,避免攤商自行流散。</span></li>
                        <li className="flex gap-2"><span className="text-accent">·</span><span>中繼點選址原則: 維持公館商圈交通便利範圍,避免老顧客流失。</span></li>
                        <li className="flex gap-2"><span className="text-accent">·</span><span>攤商安置與返址後動線改造同步規劃,不分二案。</span></li>
                      </ul>
                      <div className="text-[12px] text-muted font-mono">
                        ← 證據: 南門攤商訪談 (見 §一手案例研究 Card C)
                      </div>
                    </div>
                  </div>
                )}
```

- [ ] **Step 9.3: Browser verification**

Reload localhost:8765, scroll to the third tier in `#pyramid`. The interim-market box should appear under the floor schematic, with accent left-border, 3 bullets, and the citation footer.

- [ ] **Step 9.4: Commit**

```bash
git add sections-2.jsx
git commit -m "feat: interim-market sidebar in Tier 3 (cited from 南門 interview)"
```

---

## Task 10: Add 4th structural principle in sections-3.jsx

The "攤商共識先行" principle. Replace the 3-chip block in `SDGSection` with a 4-chip block plus the killer interview quote underneath.

**Files:**
- Modify: `sections-3.jsx` — the structural-principles block inside `SDGSection`

- [ ] **Step 10.1: Locate the principles block**

```bash
grep -n "不破壞低租金結構\|不百貨公司化" sections-3.jsx
```

Expected: matches inside `SDGSection`.

- [ ] **Step 10.2: Replace the 3-chip block with 4 chips + interview quote**

Find this block:

```jsx
          <div className="mt-5 font-display font-black text-[28px] md:text-[40px] leading-[1.3] flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--warn)", color:"var(--bg)"}}>不破壞低租金結構</span>
            <span className="text-muted text-[24px] md:text-[32px]">×</span>
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--accent)", color:"var(--bg)"}}>不犧牲學生客群</span>
            <span className="text-muted text-[24px] md:text-[32px]">×</span>
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--ink)", color:"var(--bg)"}}>不百貨公司化</span>
          </div>
```

Replace with:

```jsx
          <div className="mt-5 font-display font-black text-[26px] md:text-[36px] leading-[1.3] flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--warn)", color:"var(--bg)"}}>不破壞低租金結構</span>
            <span className="text-muted text-[22px] md:text-[28px]">×</span>
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--accent)", color:"var(--bg)"}}>不犧牲學生客群</span>
            <span className="text-muted text-[22px] md:text-[28px]">×</span>
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--ink)", color:"var(--bg)"}}>不百貨公司化</span>
            <span className="text-muted text-[22px] md:text-[28px]">×</span>
            <span className="px-3 py-1 rounded-sm border-2 border-ink" style={{background:"var(--bg)", color:"var(--ink)"}}>攤商共識先行</span>
          </div>
          <blockquote className="mt-6 max-w-[55ch] pl-5 border-l-2 border-accent">
            <p className="font-display italic text-[18px] md:text-[20px] leading-[1.55] text-ink/90">
              「主要是看攤商跟政府配合的程度,那是一個決定性的因素。」
            </p>
            <footer className="mt-2 text-[12px] font-mono tracking-[0.05em] text-muted">
              — 南門市場資深攤商, 2026 訪談 (見 §一手案例研究 Card D)
            </footer>
          </blockquote>
```

- [ ] **Step 10.3: Browser verification**

Reload site, scroll to `#sdg`, the structural-principles block at the bottom. Confirm: 4 chips visible (last is outlined), with the italic quote in a left-bordered blockquote underneath, attributed to the vendor.

- [ ] **Step 10.4: Commit**

```bash
git add sections-3.jsx
git commit -m "feat: add 4th structural principle (攤商共識先行) with interview quote"
```

---

## Task 11: Sprinkle inline `<Citation/>` markers across body copy

Each numeric/factual claim that has a corresponding entry in the `SOURCES` list gets an inline `[N]` marker. This is per-section work; don't try to batch.

**Files:**
- Modify: `sections-1.jsx` (Hero data, Problem section's "1980 年", "212 攤", "19%" claims, Data section's PAD source line + 1.3% counter)
- Modify: `sections-2.jsx` (any "兩度斥資千萬" or comparison claims)
- Modify: `sections-3.jsx` (CTA citations list — replace its 4 hardcoded lines with a deep-link to `#sources`)

- [ ] **Step 11.1: sections-1.jsx — citations**

Find lines mentioning `兩度斥資千萬`. After the literal phrase, insert:

```jsx
<Citation n={4}/>
```

Find lines mentioning `1980 年` (Hero or Problem). After the year, insert:

```jsx
<Citation n={6}/>
```

Find the `212` and `19%` counter strip in `ProblemSection`. Add `<Citation n={6}/>` next to those numbers.

Find the `Mehrabian–Russell` mention in `DataSection`'s ACT A description. Add:

```jsx
<Citation n={1}/>
```

Find the `Path Intelligence` italic citation under the +1.3% counter. Replace with `<Citation n={2}/>` — keep the surrounding formatting.

- [ ] **Step 11.2: sections-2.jsx — citations**

If any "南門市場" / "外牆" claims need backing, add `<Citation n={9}/>` or `<Citation n={4}/>` accordingly. Most of sections-2.jsx is design recommendations rather than data claims — likely 1–2 citations max.

- [ ] **Step 11.3: sections-3.jsx — replace hardcoded CTA citations list with deep-link**

Find this in `CTASection`:

```jsx
          <Reveal delay={160}>
            <Label>CITATIONS</Label>
            <ul className="mt-3 text-[13px] space-y-1.5 text-ink/80">
              <li>Mehrabian &amp; Russell (1974)</li>
              <li>Path Intelligence UK Study (2007)</li>
              <li>Retail Sensing (2020)</li>
              <li>南門市場改建案 (2023)</li>
            </ul>
          </Reveal>
```

Replace with:

```jsx
          <Reveal delay={160}>
            <Label>CITATIONS</Label>
            <ul className="mt-3 text-[13px] space-y-1.5 text-ink/80">
              <li>Mehrabian &amp; Russell (1974)</li>
              <li>Path Intelligence UK Study (2007)</li>
              <li>Retail Sensing (2020)</li>
              <li>南門市場改建案 (2023)</li>
              <li>南門攤商訪談 (2026)</li>
            </ul>
            <a href="#sources" className="mt-4 inline-block text-[12px] font-mono tracking-[0.15em] text-accent border-b border-accent hover:opacity-70">
              完整出處 → 引用與資料來源
            </a>
          </Reveal>
```

- [ ] **Step 11.4: Verify all citation markers exist**

```bash
grep -rn "<Citation" .
```

Expected: at least 5 matches across sections-1.jsx and sections-2.jsx.

- [ ] **Step 11.5: Browser verification — citations are clickable and scroll**

Reload site. Hover one of the `[N]` markers — it should turn underlined. Click it — page should scroll to the corresponding entry in `#sources`, and the entry should briefly highlight orange.

- [ ] **Step 11.6: Commit**

```bash
git add sections-1.jsx sections-2.jsx sections-3.jsx
git commit -m "feat: inline citation markers for sourced claims"
```

---

## Task 12: Final verification

End-to-end check that nothing regressed and all spec requirements are met.

- [ ] **Step 12.1: No fabricated claims anywhere**

```bash
cd shuiyuan-market/site
grep -rn "攤商訪談 8 位\|消費者攔訪 24 位\|35–50 分" --include="*.jsx" --include="*.html"
```

Expected: `no matches`.

- [ ] **Step 12.2: All 10 sections render**

```bash
# preview_eval:
#   [...document.querySelectorAll('[data-section]')].map(s => s.dataset.section)
# Expected: ["hero","problem","evidence","data","pyramid","users","loop","sdg","sources","cta"]
```

- [ ] **Step 12.3: No console errors on load**

```bash
# preview_console_logs level=error
# Expected: empty
```

- [ ] **Step 12.4: Screenshot the new sections**

Take screenshots of `#evidence` and `#sources` for the user to eyeball.

- [ ] **Step 12.5: Mobile pass**

Resize preview to ~390px wide. Confirm:
- Methodology box stacks above quote cards
- Sources columns collapse to single column
- Mini-nav hides (it's `md:block`)
- No horizontal scroll

- [ ] **Step 12.6: Mini-nav scroll-to works for new sections**

Click the `案例研究` and `引用來源` dots in mini-nav. Page should scroll to the right sections.

- [ ] **Step 12.7: Final commit (only if Steps 12.1–12.6 all pass)**

If any prior task left uncommitted changes, group them:

```bash
git status
git add -A
git commit -m "chore: final evidence-upgrade polish"
```

- [ ] **Step 12.8: Push to GitHub** (only if user confirms)

```bash
git push origin main
```

Stop and ask the user before pushing — pushing publishes to their public repo and possibly triggers Pages deployment.

---

## Self-Review Checklist (run after the above plan is written)

1. **Spec coverage:**
   - §2 (Architecture) → Tasks 4, 7
   - §4 (Field Evidence section) → Task 5
   - §5 (Sources section) → Tasks 0, 6
   - §6 (Annotated photos) → Tasks 3, 8
   - §7 (ScaleNote rewrite) → Task 1
   - §8.1 (Interim-market sidebar) → Task 9
   - §8.2 (4th structural principle) → Task 10
   - §9 (Mini-nav update) → Task 4
   - §10 (Files affected) → covered by per-file tasks
   - §11 (Verification) → Task 12

2. **Placeholder scan:** No "TBD"/"TODO"/"implement later" left. Source list in Task 6 has explicit `[fill from research/sources.md ³]` placeholders that are RESOLVED in Step 6.2 by reading the research file produced in Task 0. Same for review counts. This is a deferred-data pattern, not a plan failure.

3. **Type consistency:**
   - `Citation` (Task 2) → used in Task 11 ✓
   - `AnnotatedPhoto` (Task 3) → used in Task 8 ✓
   - `EvidenceSection` exported from `sections-evidence.jsx` (Task 5) → mounted in Task 7 ✓
   - `SourcesSection` exported from `sections-sources.jsx` (Task 6) → mounted in Task 7 ✓
   - Mini-nav `data-target="evidence"` and `data-target="sources"` (Task 4) → match section IDs in Tasks 5 and 6 ✓
   - `id="source-${n}"` in `SourceEntry` (Task 6) → matched by Citation's scroll target (Task 2) ✓

---

*End of plan.*
