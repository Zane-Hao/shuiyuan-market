# AI Hero Slides — 設計 Spec

**Date**: 2026-05-14
**Status**: Approved by user, ready for plan
**Related**: `AI_images/` folder (4 renders), slides 11/12/13 (Tier banded slides)

## Context

水源市場 SDG 提案 deck 已完稿（18 張，46.5/50, A-）。用戶另外用 ChatGPT Image 2 生成了 4 張改造後 architectural render，所有圖都載入了**水源之心設計 DNA**（鈷藍 accent、像素馬賽克、杜鵑花 pictogram）：

| 檔案 | 對應 Tier | 場景 |
|---|---|---|
| `AI_images/RFGT_toilet.png` | Tier 1 | 多元友善廁所翻修 |
| `AI_images/tray_system.webp` | Tier 2 | 集中餐盤回收/消毒站 |
| `AI_images/B1_market.webp` | Tier 3 | B1 生鮮果菜市場 |
| `AI_images/2f_apparel.webp` | Tier 3 | 2F 成衣與修改 |

為了讓提案視覺更有說服力，要把這 4 張圖以 hero slide 形式注入 deck，每張 hero 緊接對應的 Tier slide。

## 已對齊的設計決策

1. **方案**：新增 3 張 dedicated hero slide（不嵌入既有 slide layout，避免細節縮小看不清）
2. **版面**：Banded layout 跟 11/12/13 一致（PHASE band + image + caption strip）
3. **slide 16 (Tier 3 hero)**：只放 B1 + 2F 並排，1F 不出現（因為沒有對應 AI 圖）
4. **編號**：重編，deck 從 18 張 → 21 張，所有 cross-ref 與 page-indicator 同步更新

## 1. Hero Slide Template

3 張新 slide 共用同一 template，CSS / 動畫節奏跟既有 banded slide（11/12/13）一致。

### Layout

```
┌────────────────────────────────────┐
│ .tier-band                         │
│   PHASE 0X · 視覺示意               │
│   (timeline-pill: 改造後 · AFTER)   │
├────────────────────────────────────┤
│ .hero-image (~70% slide height)    │
│   <img src="…" object-fit:cover>   │
├────────────────────────────────────┤
│ .dna-strip                         │
│   3 chips: 鈷藍 X · 馬賽克 Y · 杜鵑 Z │
└────────────────────────────────────┘
```

### CSS structure

```css
.slide {
  display: grid;
  grid-template-columns: 1fr;       /* 避免 11/12/13 那個 grid-columns 沒設的 gotcha */
  grid-template-rows: auto 1fr auto;
}
.tier-band { /* 直接 reuse 11/12/13 的 .tier-band class */ }
.hero-image {
  width: 100%; height: 100%;
  position: relative;
  overflow: hidden;
}
.hero-image img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.dna-strip {
  border-top: 1px solid var(--hairline);  /* top hairline, 不要 left border accent (anti-AI slop) */
  padding: 20px 56px;
  display: flex;
  gap: 32px;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.18em;
  color: var(--muted);
}
.dna-chip { /* 個別 chip 樣式 */ }
```

### Slide 16 例外：split image layout

```css
/* slide 16 only */
.hero-image-split {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
}
.hero-image-split .col-b1,
.hero-image-split .col-2f {
  position: relative;
  overflow: hidden;
}
.hero-image-split .divider {
  background: var(--hairline);
}
.hero-image-split .col-label {
  position: absolute;
  bottom: 18px; left: 22px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--bg);
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
```

### Animation

延用既有 banded slide 的 `.fadeup` + `data-delay` 系統，**重用既有延遲值避免 number collision**（CLAUDE.md gotcha）：

| element | data-delay | data-sfx |
|---|---|---|
| `.phase-num` | 200 | tap |
| `.tier-title` | 500 | focus |
| `.timeline-pill` | 800 | tap |
| `.hero-image` (整張圖 fadeup) | 1300 | sparkle |
| `.dna-chip:nth-child(1)` | 1700 | tap |
| `.dna-chip:nth-child(2)` | 1900 | tap |
| `.dna-chip:nth-child(3)` | 2100 | tap |

## 2. 3 張新 Slide 內容

### Slide 12 · `12-tier1-hero-toilet.html`

- **tier-band 色**：`#5C7A85`（teal，跟 slide 11 一致）
- **PHASE num**：`PHASE 01`
- **tier-title**：`多元友善廁所 · 視覺示意`
- **timeline-pill**：`改造後 · AFTER`
- **hero-image**：`<img src="../../img/ai-tier1-toilet.png" alt="RGFT 模組翻修後">`
- **DNA chips**（3 個）：
  - `鈷藍 stall hardware`
  - `馬賽克 feature strip`
  - `杜鵑花 wayfinding glyph`

### Slide 14 · `14-tier2-hero-tray.html`

- **tier-band 色**：`var(--accent)` 橘（跟 slide 13 (new tier2-ba) 一致）
- **PHASE num**：`PHASE 02`
- **tier-title**：`集中餐盤系統 · 視覺示意`
- **timeline-pill**：`改造後 · AFTER`
- **hero-image**：`<img src="../../img/ai-tier2-tray.webp" alt="統一餐盤回收與消毒站">`
- **DNA chips**：
  - `鈷藍 counter edge`
  - `馬賽克 logo wall`
  - `杜鵑花 workflow signage`

### Slide 16 · `16-tier3-hero-floors.html`

- **tier-band 色**：`var(--ink)` 深綠（跟 slide 15 (new tier3) 一致）
- **PHASE num**：`PHASE 03`
- **tier-title**：`樓層再造 · 視覺示意`
- **timeline-pill**：`改造後 · AFTER`
- **hero-image-split**：
  - 左：`ai-tier3-2f.webp` + label `2F · 成衣與修改`
  - 右：`ai-tier3-b1.webp` + label `B1 · 生鮮市場`
- **DNA chips**：
  - `鈷藍 column collars`
  - `馬賽克 totem & feature wall`
  - `杜鵑花 directory pictogram`

（注：2F 放左、B1 放右 — 跟原 slide 15 (tier3) 的 floor 順序 2F → 1F → B1 一致，**1F 沒出現所以從 2F 直接跳 B1**）

## 3. 檔案重編 Map

| 舊檔名 | 新檔名 | 動作 |
|---|---|---|
| 11-tier1.html | 11-tier1.html | 不動 |
| — | **12-tier1-hero-toilet.html** | NEW |
| 12-tier2-ba.html | 13-tier2-ba.html | git mv |
| — | **14-tier2-hero-tray.html** | NEW |
| 13-tier3.html | 15-tier3.html | git mv |
| — | **16-tier3-hero-floors.html** | NEW |
| 14-personas.html | 17-personas.html | git mv |
| 15-loop.html | 18-loop.html | git mv |
| 16-sdg.html | 19-sdg.html | git mv |
| 17-principles.html | 20-principles.html | git mv |
| 18-stay.html | 21-stay.html | git mv |

01–10 不動。

**git mv 必要**：避免 git 把 rename 看成 delete + add，保留 blame 歷史。

## 4. 圖片資產處理

```bash
# Move from AI_images/ to site/img/ with consistent naming
mv AI_images/RFGT_toilet.png  shuiyuan-market/site/img/ai-tier1-toilet.png
mv AI_images/tray_system.webp shuiyuan-market/site/img/ai-tier2-tray.webp
mv AI_images/B1_market.webp   shuiyuan-market/site/img/ai-tier3-b1.webp
mv AI_images/2f_apparel.webp  shuiyuan-market/site/img/ai-tier3-2f.webp
```

4 個檔案，每個 ~2MB，總共 ~8MB，git push 沒問題（已有 `http.postBuffer=500MB` 設定）。

## 5. Cross-Reference 更新清單

### Anchor 改動

| 來源檔 | 原 anchor 文字 | 新 anchor 文字 |
|---|---|---|
| 03-oily-food.html | `→ 解方對應 · Tier 2 · SLIDE 12` | `→ 解方對應 · Tier 2 · SLIDE 13` |
| 05-no-seating.html | `→ 解方對應 · Tier 2 · SLIDE 12` | `→ 解方對應 · Tier 2 · SLIDE 13` |
| 06-second-floor.html | `→ 解方對應 · Tier 3 · SLIDE 13` | `→ 解方對應 · Tier 3 · SLIDE 15` |
| 08-quote.html | bridge → `SLIDE 17` | bridge → `SLIDE 20` |
| 10-pyramid.html | Phase 2 → `詳見 Slide 12` | `詳見 Slide 13` |
| 10-pyramid.html | Phase 3 → `詳見 Slide 13` | `詳見 Slide 15` |
| 04-sanitation.html | `Tier 1 · SLIDE 11` | (no change) |
| 10-pyramid.html | Phase 1 → `詳見 Slide 11` | (no change) |

### Page indicator

每張 slide 都有：
```html
<div class="page-indicator"><span class="now">N</span> / 18</div>
```

兩個變動：
1. `/ 18` → `/ 21`（所有 21 張 slide）
2. `now` 值在 12 之後的 slide 都 +1, 13 之後再 +1, 15 之後再 +1 — 跟 renumbering map 一致

實作建議：寫一個 sed-style 腳本批次處理，或一張一張開檔改（21 個檔案，可手動）。

## 6. Deck Shell

`deck/index.html` 的 slide 列舉方式需先確認：
- 如果是硬編 array `['01-title.html', '02-hook.html', ...]` → 要加入 3 個新檔名 + 重排
- 如果是動態 glob / fetch directory → 改檔名後自動跟進

實作前 grep `deck/index.html` 確認，再決定要不要改 shell。

iframe `?v=Date.now()` cache-bust 已存在，不動。

## 7. SFX 約束

新 slide 只用既有的 `data-sfx="tap|focus|sparkle|stamp|chime|whoosh|dissolve"`，不要發明新音效（CLAUDE.md gotcha）。Hero image 進場用 `sparkle`，DNA chip 用 `tap`。

## 8. Risks / 已知陷阱

從 CLAUDE.md 警告 list 抽出來，新檔案要避開的雷：

1. **`.slide { display: grid }` 必須設 `grid-template-columns: 1fr`** — 否則 tier-band 不會 edge-to-edge
2. **不要用 `.tier-band > *` 通配選擇器** — break nested children；明確標 `.fadeup`
3. **不要重新引入 placeholder badge** — 「★ PLACEHOLDER · 替換為真實評論」橘色標已全部移除
4. **不要左 border accent + 圓角卡片** — anti-AI-slop，改 top hairline
5. **不要發明 hex 色** — 全用 `tokens.css` 變數
6. **data-delay 數值不要撞** — 用上方表格列的 200/500/800/1300/1700/1900/2100
7. **剛 overlay 同學版本（commit ae8daa7）** — tokens.css 多了 235 行，slide 11/12/13 的 tier-band 色變數有可能跟原本 CLAUDE.md 記載的不同。實作前先打開新版 11/12/13 確認三張 tier-band 用的色，hero 直接 reuse 同一變數，不要 hardcode hex

## 9. Verification

實作完成後依序檢查：
1. dev server 跑起來：`http://localhost:8767/deck/`
2. 切到 slide 12（新 hero）— tier-band 是 teal、image 進場有 sparkle SFX、3 個 DNA chip 依序跳出
3. 切到 slide 14（新 hero）— tier-band 是橘、image 是 tray_system
4. 切到 slide 16（新 hero）— tier-band 是深綠、左右兩張並排、中間 hairline 1px
5. 切到 slide 03 — anchor 文字寫「SLIDE 13」（而非 12）
6. 切到 slide 10 — timeline 3 個欄底連結指向 11 / 13 / 15
7. 任一張 slide page-indicator 顯示 `N / 21`
8. iframe cache-bust 有作用（強制 reload 拿到最新 HTML）

## 10. Out of scope

- 1F 那張 AI 圖 — user 還沒生（Prompt B 的 1F 共享座位 dining commons hero）。如果之後生出來，可以加進 slide 16 變成 3-up grid，或新增 slide 17 補 1F hero（再做一次重編）
- Tier 1 plumbing AI 圖 — user 還沒生（Prompt E）。如果生出來，可以替換 slide 11 既有的 `phase1-plumbing.jpg`
- 影片版本（`video/MainV2`）的對應更新 — out of scope，影片是獨立 deliverable
