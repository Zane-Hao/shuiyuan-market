# Evidence Upgrade — Design Spec

**Date:** 2026-05-03
**Site:** [`shuiyuan-market/site/`](../../../) (水源市場 SDG 提案)
**Authors:** 郝思澄 · 陳品睿 · 林子佑
**Goal:** Strengthen "problem identification & evidence" rigor for SDG competition judging.

---

## 1. Context

The site is a competition-judging artifact. The team's strongest scoring axis is **problem identification & evidence**. The current site has a polished narrative shell but two weak spots in the evidence layer:

1. **Two fabricated methodology claims** are buried inside an "i" disclosure tooltip in the Data section ([sections-1.jsx:522](../../../sections-1.jsx#L522)):
   - `"攤商訪談 8 位、消費者攔訪 24 位"` — primary research that did not happen at this scale.
   - `"南門、新富、士東 平均提升 35–50 分之文獻基準"` — invented academic benchmark.

2. **The team's actual primary research is missing from the site.** They conducted a structured recorded interview with a senior vendor at 南門市場 (the renovated reference case), plus multiple informal site-visit conversations and observation. None of this appears anywhere on the proposal site. The interview includes a quote — *"主要是看攤商跟政府配合的程度，那是一個決定性的因素"* — that materially strengthens the proposal's case if surfaced.

This spec replaces the fabricated claims with honest sourcing and surfaces the real interview as the centrepiece of a new **Field Evidence** section, plus a proper bibliography section, photo annotations, and a footnote citation system.

## 2. Scope

**In scope:**
- Strip two fabricated claims from `ScaleNote` (sections-1.jsx).
- New section: **Field Evidence · 南門案例研究** (between `#problem` and `#data`).
- New section: **Sources / 引用與資料來源** (between `#sdg` and `#cta`).
- Annotated problem photos (CSS-overlay labels) on the 4 photos in `#problem`.
- Inline footnote citation system for numeric/factual claims.
- Mini-nav update to include the 2 new sections.
- Two small content additions revealed by the interview:
  - 改建期間中繼市場規劃 (sidebar in Tier 3 / before CTA).
  - "攤商共識先行" added as a 4th structural principle.

**Out of scope:**
- Visual redesign (the warm aesthetic stays).
- Restructuring existing sections (Hero, Problem, Data, Pyramid, Users, Loop, SDG, CTA stay in place).
- New primary research (no additional interviews planned this iteration).
- i18n / English version.

## 3. Architecture summary

```
[hero]
[problem]                     ← annotated photos added (Section 6)
[evidence]   ← NEW            ← Section 4
[data]                        ← ScaleNote rewritten (Section 7)
[pyramid]                     ← +interim-market sidebar in Tier 3 (Section 8)
[users]
[loop]
[sdg]                         ← +"攤商共識先行" 4th principle (Section 8)
[sources]    ← NEW            ← Section 5
[cta]
```

Mini-nav goes from 8 → 10 items (`evidence`, `sources` added).

## 4. New section · `#evidence` — Field Evidence · 南門案例研究

### 4.1 Layout

12-col grid, consistent with existing sections:

- **Top block (full width):** Section label `04 · EVIDENCE · 一手案例研究` + H2 `「在「成功改建」的市場現場，攤商怎麼說？」` + intro paragraph.
- **Middle block (left 5 / right 7):**
  - **Left:** Methodology box (sticky on `lg:`).
  - **Right:** 4 quote cards stacked vertically.

### 4.2 Methodology box — copy

```
方法 · METHODOLOGY

時間  · 2026 年 [月份待填]
地點  · 臺北市公有南門市場 (Nanmen Public Market, post-renovation reference case)
對象  · 資深攤商 1 位 — 改建前後皆營業
形式  · 結構化訪談 + 現場錄音 + 逐字稿整理
       受訪者已徵得拍照與引用同意
補充  · 多次現場非結構化對話與觀察 (未錄音)

研究設計
本案採「比較案例研究」(comparative case study) — 訪問已完成改建的
南門市場攤商，擷取改建後的成功要素與轉場期經驗，作為水源市場
改建設計的依據,而非以水源攤商為對象的問卷調查。

限制
樣本數小 (N=1 結構化錄音);本研究不主張統計推論,
僅作為改建後成功要素的質性證據。
```

### 4.3 Quote cards · 4 cards, each maps to a 水源 design choice

Each card is a stand-alone block: timestamp · verbatim quote (Traditional Chinese, original wording) · attribution · "→ 對應水源" mapping.

| # | Theme | Quote (timestamp) | Maps to |
|---|---|---|---|
| A | 硬體感受 | 「改建前天花板比較低，它的空氣品質與環境感覺就沒有那麼舒服…現在不同的裝置都達到了一流的水準」(0:08–0:16) | Tier 1 衛生底線重建 (通風、廁所翻修、照明) |
| B | 管理透明化 | 「現在分工分得很細，電工或水電的部分，它都分得很專業…像以前可能透過紅包，或是由特定單位在負責」(0:37–0:46) | **新建議**: 公開招標、外部稽核、攤商代表會 (補強 Tier 3) |
| C | 中繼安排 | 「中間的過渡市場也是市政府的安排…據我們觀察，這樣的安排都是很成功的，而且裝置又好」(1:43–1:48) | **新建議**: 改建期間中繼市場規劃 (見 §三層解方/補充) |
| D | 決定性因素 | 「主要是看攤商跟政府配合的程度，那是一個決定性的因素」(3:20) | **新建議**: 結構性原則第 4 條「攤商共識先行」 |

Attribution under each quote: `南門市場資深攤商 · 已同意引用 · 2026 訪談`

### 4.4 Component implementation notes

- New file: `sections-evidence.jsx` (separate file so existing sections-1/2/3 stay focused; loaded via new `<script type="text/babel" src="sections-evidence.jsx">` tag in `index.html`).
- Mount in `app.jsx` between `<ProblemSection />` and `<DataSection />`.
- Re-use existing `<Section>`, `<Reveal>`, `<Label>` helpers from `helpers.jsx`.
- Each quote card: `card-warm` styling + accent left border + `font-mono` for timestamp + `t-h3`-equivalent for the pull-quote.
- Vendor portrait: deferred — user to confirm whether a usable photo exists.

## 5. New section · `#sources` — Sources / 引用與資料來源

### 5.1 Layout

Two-column grid, full width.

- **Left col · 學術文獻 + 政府資料**
- **Right col · 新聞報導與輿情資料**

Each entry: numbered `[¹]`, `[²]`, … so it links from inline citation markers.

### 5.2 Source list (to be fetched and verified during implementation)

**Confirmed needs (must fetch real URLs / page numbers):**

| Ref | Used by | Source | Status |
|---|---|---|---|
| ¹ | PAD model citation (Data §) | Mehrabian, A. & Russell, J. A. (1974). *An Approach to Environmental Psychology.* MIT Press. | Need ISBN / publisher confirmation |
| ² | "+1% dwell → +1.3% sales" (Data §) | Path Intelligence (2007). 9-month UK retail study. | Need URL or secondary citation; may be referenced in Retail Sensing white paper |
| ³ | Retail dwell-time research | Retail Sensing (2020) | Need full title + URL |
| ⁴ | "兩度斥資千萬升級外牆公共藝術" (Problem §) | 自由時報 2025 「公館水源市場外牆變美 多視角看 57 色漸層杜鵑」 | Visual reference doc lists URL — need to verify and pull cost figure |
| ⁵ | 水源之心 公共藝術背景 | 臺北市公共藝術網 作品頁 ID:507 | Already in 視覺參考清單.md |
| ⁶ | 水源市場基礎資料 (1980 年, 212 攤, etc.) | 臺北市市場處 公有水源市場介紹頁 | Already in 視覺參考清單.md |
| ⁷ | Google reviews snapshot — N reviews, X% 1-star, dominant complaint themes | Google Maps public reviews | Fetch during implementation; record retrieval date |
| ⁸ | TripAdvisor reference | TripAdvisor 水源市場頁面 | Already in 視覺參考清單.md |
| ⁹ | 南門市場改建後對比 | ShoppingDesign / TRAVELER Luxe / CP值 articles | Already in 視覺參考清單.md |
| ¹⁰ | 南門市場改建影響數據 (人流、營業額) | 臺北市市場處 / 新聞 | Need to find — claim removed from site if no source |

**Implementation principle:** if a source can't be verified, the corresponding claim is **rephrased or removed**, not finessed.

### 5.3 Inline footnote markers

Every numeric claim in body copy gets `[¹]` etc. as a small superscript. CSS:

```css
.cite {
  font-family: var(--font-mono);
  font-size: 0.7em;
  vertical-align: super;
  color: var(--accent);
  cursor: pointer;
  text-decoration: none;
}
.cite:hover { text-decoration: underline; }
```

Click behaviour: anchor link to `#sources-N` (the corresponding entry).

## 6. Annotated problem photos

CSS-overlay annotations (not edited image files) — labels stay editable, scale with the photo, work at any resolution.

### 6.1 Component shape

```jsx
function AnnotatedPhoto({ src, alt, annotations }) {
  return (
    <figure className="annotated-photo relative">
      <img src={src} alt={alt} />
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

### 6.2 Labels per problem (initial cut, refined during implementation by re-examining each photo)

| Problem | Photo | Labels (visible-only) |
|---|---|---|
| 01 油膩餐食區 | foodzone-1.jpg / foodzone-2.jpg | 攤前明火位置 / 走道與烹飪檯距離 / 排煙口缺位 |
| 02 衛生底線 | meat-tools.jpg | 血水堆積點 / 工作檯面與走道無分隔 / 工具放置面 |
| 03 無集中座位 | no-seat-stall.jpg | 站立用餐人潮 / 食物與走道距離 / 塑膠椅位置 |
| 04 二樓低利用率 | longji.jpg / 2f-shops.jpg | 樓層指引 / 照明強度 / 走道寬度 |

**Constraint:** labels describe only what's visibly in the photo. No interpretive labels ("骯髒", "落後") that judges could challenge.

## 7. ScaleNote rewrite (sections-1.jsx)

### 7.1 Replace lines 515–528 of `sections-1.jsx` with:

```jsx
<div className="mt-3 text-[13px] leading-[1.75] text-ink/85 space-y-2">
  <p>
    本圖採 <strong>Mehrabian–Russell 環境心理量表</strong>的 0–100 標準化指數,
    由「空氣／嗅覺／視覺／動線／資訊／衛生／支付」七項環境因子合成。
  </p>
  <p>
    <span className="font-mono text-[11px] text-muted">CURRENT　</span>
    分數來自 <strong>Google 評論文本主題分析</strong> 與 <strong>多次現場觀察</strong>
    (見 §現況診斷攝影紀錄),屬質性評估。
  </p>
  <p>
    <span className="font-mono text-[11px] text-muted">POST　　　</span>
    分數為 <strong>示意性推估值</strong>,表達各維度若依本案三層解方執行後
    可能達到的相對水準,非實測結果,不作為定量預測。
  </p>
</div>
```

### 7.2 Two facts removed
- ❌ "現場田野調查（攤商訪談 8 位、消費者攔訪 24 位）" (line 522)
- ❌ "南門、新富、士東 改造前後平均提升 35–50 分之文獻基準" (line 526)

These are replaced by honest framing. The PAD chart itself stays — but its scoring is now described as informed estimation, not measurement.

## 8. Content additions revealed by interview

### 8.1 改建期間中繼市場規劃 — sidebar in Pyramid Tier 3

Add a small 3-bullet aside after Tier 3 content (or as a new "implementation considerations" block):

> **改建期間中繼市場 · 來自南門案例的啟示**
> · 由市府主導選址、規劃、興建中繼市場,避免攤商自行流散
> · 中繼點選址原則: 維持公館商圈交通便利範圍, 避免老顧客流失
> · 攤商安置與返址後動線改造同步規劃, 不分二案

Sourced via Card C in the Field Evidence section (anchored citation).

### 8.2 「攤商共識先行」 — 4th structural principle

Current site (sections-3.jsx, SDG section structural principles block):
> 不破壞低租金結構 × 不犧牲學生客群 × 不百貨公司化

Becomes:
> 不破壞低租金結構 × 不犧牲學生客群 × 不百貨公司化 × **攤商共識先行**

With the interview's killer quote as inline justification:
> *"主要是看攤商跟政府配合的程度,那是一個決定性的因素。"*
> — 南門市場資深攤商, 2026 訪談

## 9. Mini-nav update (app.jsx + index.html)

Add 2 entries to the right-side nav:

```html
<!-- after #problem -->
<li><button class="mini-item" data-target="evidence">
  <span class="mini-dot"></span><span class="mini-label">案例研究</span>
</button></li>

<!-- after #sdg, before #cta -->
<li><button class="mini-item" data-target="sources">
  <span class="mini-dot"></span><span class="mini-label">引用來源</span>
</button></li>
```

Section count display updates from 8 → 10 wherever it appears.

## 10. Files affected

| File | Change |
|---|---|
| `index.html` | Add 2 mini-nav `<li>`s; add `.cite`, `.annotated-photo`, `.annot` CSS rules |
| `app.jsx` | Mount `<EvidenceSection />` and `<SourcesSection />` in correct order |
| `helpers.jsx` | (optional) Add `<Citation n={N}>` component for inline footnote markers; add `<AnnotatedPhoto />` component |
| `sections-1.jsx` | Rewrite `ScaleNote` body (lines 515–528) — strip 2 fabricated claims; replace problem section's 4 photos with `<AnnotatedPhoto />` |
| `sections-2.jsx` | Add interim-market sidebar in `<PyramidSection>` Tier 3 |
| `sections-3.jsx` | Update structural principles block (add 4th principle); ensure SDG section sits BEFORE the new sources section |
| `sections-evidence.jsx` | **New** — `<EvidenceSection />` component (methodology box + 4 quote cards) |
| `sections-sources.jsx` | **New** — `<SourcesSection />` component (2-col bibliography) |

## 11. Verification

1. **Open the site locally** (`python -m http.server 8765 --directory shuiyuan-market/site` → http://localhost:8765).
2. **Navigate the new sections** via the mini-nav: confirm `案例研究` and `引用來源` appear and scroll-link works.
3. **Check the 4 quote cards** render with timestamps, attribution, and "→ 對應水源" mappings.
4. **Click an inline citation marker** `[¹]` somewhere in the body copy — should scroll to and highlight the corresponding entry in the Sources section.
5. **Confirm fabricated claims are gone:** open the SCALE 0–100 disclosure under PAD bars; the words "攤商訪談 8 位" and "35–50 分文獻基準" must not appear.
6. **Annotated photos:** all 4 problem photos show CSS-overlay labels positioned over the relevant features; resize the window and verify labels stay anchored correctly.
7. **Structural principles:** SDG section's bottom block shows 4 chips, last one being "攤商共識先行" with the interview quote underneath.
8. **Source URL audit:** every entry in the Sources section is a working URL (or marked clearly as "未公開" / "已洽出處").
9. **Mobile pass:** on a phone-width viewport, methodology box stacks above quote cards; mini-nav hides; no horizontal scroll.
10. **All claims sourced:** every numeric claim in body copy (`19%`, `212 攤`, `1.3%`, `1980`, `兩度斥資千萬`, etc.) has either an inline `[N]` citation or has been removed/rephrased to avoid an unsupported assertion.

## 12. Open items deferred to implementation

- **Sources to actually fetch.** Section 5.2 lists what to look for; the implementation phase actually retrieves URLs, dates, and figures.
- **Photo annotations exact pixel positions.** Section 6.2 lists labels per photo; the implementer eyeballs each photo and sets `{ x, y }` for each label.
- **Vendor portrait decision.** If a photo with the consenting vendor is available, decide framing; if not, use a generic 南門 interior photo from `img/`.
- **Date stamp on Google reviews snapshot.** Whatever date the implementer pulls reviews on goes into `[⁷]`.

---

*End of spec.*
