# 水源市場 · SDG 提案簡報

公館水源市場現況診斷 + 永續活化提案的 21 頁 web-based 簡報。學校專題作業，目前在收尾階段。

## Status

**現在的狀態**：完稿。剛完成一次 5 維度 editorial review（39 → 46.5/50, A-）。準備錄影 / 推 GitHub。

**已完成**：
- 21 張 slide 全部完成（2026-05-14 加入 3 張 AI hero slide：12/14/16）、動畫流暢、cross-reference 系統閉環
- BGM 已加回（`deck/audio/bgm.mp3`，volume 0.18），右上 volume toggle button 控制 BGM + SFX 一起 mute/unmute
- `iframe.src` 加 cache-bust（`?v=Date.now()`）—— CSS 編輯不再被瀏覽器快取卡住

**Slide-by-slide 重點**：
- **01 title** — facade-pink.jpg hero + word-stagger 標題
- **02 hook** — 200+ / **0**（280px warn red 巨型）/ 近兩成 三 stat
- **03 oily-food** — 評論 CTA + 2s 自動展開（教學第一次）
- **04 sanitation** — 評論 CTA + 2s 自動展開（reference 實作，**不要再改**）
- **05 no-seating** — 評論 **inline 直接顯示**，沒有 CTA wrapper
- **06 second-floor** — full-bleed 深底 + 評論 inline 顯示，背景圖 `../../img/2f-actual.jpg`
- **07 method** — 南門訪談方法論，title 用 56px + nowrap 防換行
- **08 quote** — pull-quote「主要是看攤商跟政府配合的程度...」+ 3 行 byline + bridge anchor 連到 17
- **09 PAD-causal** — bars 動畫 + +1% → +1.3% Mehrabian-Russell 引用
- **10 pyramid（已換成 horizontal timeline）** — 三 milestone dot 沿線時間漸進，phase 3 dot 是橘色終點。`pyramid.html` 檔名沒改但內容不再是金字塔
- **11 tier1** — banded layout teal band（衛生底線），edge-to-edge
- **12 tier1-hero-toilet** ★ AI hero — RGFT 多元友善廁所視覺示意 + DNA chips（鈷藍 hardware / 馬賽克 strip / 杜鵑花 wayfinding）
- **13 tier2-ba** — banded layout 橘 band（餐食集中 BA），edge-to-edge
- **14 tier2-hero-tray** ★ AI hero — 集中餐盤系統視覺示意 + DNA chips（鈷藍 counter / 馬賽克 logo wall / 杜鵑花 workflow sign）
- **15 tier3** — banded layout 深綠 band（樓層分工），edge-to-edge
- **16 tier3-hero-floors** ★ AI hero — B1 生鮮 + 2F 服飾並排 split hero（中間 hairline 分隔）+ DNA chips
- **17 personas** — 三類使用者，全部 ink 色，每個 persona 的 peak need 用 accent 橘
- **18 loop** — 6 節點循環圖 + 中央 5.0 YEAR number tween（0.0 → 5.0）
- **19 SDG** — 對齊 UN SDG 8 / 9 / 11 / 12
- **20 principles** — 4 個 chip（3 不做 + 1 先做），quote-block 用 top hairline 不用 left border
- **21 STAY** — 每個字母 stamp 動畫 + 結尾橘 dot bounce + glow，stripes 飽和度 0.55，typewriter h2「改造一座市場，留下一個社區」

**Cross-reference 系統**：
- Problem slides（03/04/05/06）底部加 `→ 解方對應 · Tier N · SLIDE N` anchor
- Slide 10 timeline 每欄底部加 `→ 詳見 Slide 11/13/15` deep-link（renumber 後）
- Slide 08 bridge 連到 20 結構性原則（原為 17）
- 3 張 AI hero slide（12/14/16）放對應 tier slide 之後，banded layout 同色系

**負評來源**：`images/負面評論/` 4 張截圖、OCR 出 10 則 1 星評論。逐字稿 + 對應表在 `docs/reviews.md`。

## Stack

- 純 HTML / CSS / JS — 沒有 build step、沒有 framework
- 每張 slide 一個 HTML 檔，放在 `shuiyuan-market/site/deck/slides/`
- 共用 token 在 `shuiyuan-market/site/deck/shared/tokens.css`（CSS variables）
- Dev server：`http://localhost:8767/deck/#<slide-number>`
- 字型：Noto Sans TC、Noto Serif TC、JetBrains Mono（Google Fonts CDN）
- Git repo: `https://github.com/Zane-Hao/shuiyuan-market`（在 `shuiyuan-market/site/` 這層，**不在外層專案**）

## Animation conventions

- `data-delay="<ms>"` 屬性 → 底部 inline `<script>` 在那個延遲後給元素加上 `.in` class，觸發 CSS transition
- `data-sfx="tap"|"focus"|"sparkle"|"stamp"|"chime"|"whoosh"|"dissolve"` → `postMessage({type:'sfx',cue})` 給 parent window 播放音效
- 標準的 reveal class 是 `.fadeup`（translateY + blur + opacity）
- 緩動曲線：大部分用 `var(--ease-out-expo)`、簽名級 pop / bounce 用 `var(--ease-out-back)` 或 `cubic-bezier(0.34, 1.6, 0.5, 1)`

## 評論區塊的兩種 pattern

**A. CTA + 自動展開**（slide 03 / 04）— 觀眾按按鈕看到評論，2 秒後也會自動開：
```js
const cta = document.getElementById('reviewsCta');
const panel = document.getElementById('reviews');
let opened = false;
function open() { if (opened) return; opened = true; cta.classList.add('open'); panel.classList.add('open'); sfx('focus'); }
cta.addEventListener('click', open);
setTimeout(open, 2000);
```

**B. Inline 直接顯示**（slide 05 / 06）— 沒有 CTA wrapper、評論卡用 `.fadeup` + `data-delay` 自然進場：
```html
<div class="reviews">
  <div class="reviews-label fadeup" data-delay="1700">Google <span class="count">1★</span> 高頻負評</div>
  <div class="review-card fadeup" data-delay="1900" data-sfx="focus">...</div>
  <div class="review-card fadeup" data-delay="2150">...</div>
</div>
```

**為什麼分兩種**：03/04 第一次出現用 CTA 教學 pattern，05/06 觀眾已熟、改 inline 避免重複麻木。**不要把 05/06 改回 CTA 版本**。

## Slide layout 差異

- **03 / 04 / 05** — split pane（`grid-template-columns: 1.2fr 1fr` 或 `1fr 1.2fr`），文字一邊、照片一邊。
- **06-second-floor.html** — full-bleed 背景照片 + 深色 overlay + 淺色文字。Review card 用半透明深色背景 + 淺色字。**不要把 04 的淺底樣式複製過去**。
- **10 pyramid.html** — 不是 pyramid！是 horizontal timeline 三欄式 magazine spread。檔名沒改避免 git rename noise。
- **11 / 12 / 13** — banded layout，最上方 PHASE band（teal / orange / dark green）+ 下方 body content。Band 必須 edge-to-edge（見下方 gotcha）。

## Gotchas

- **`display: grid` 必須配 `grid-template-columns`**：之前 11/12/13 的 tier-band 只到 slide 中間（不 edge-to-edge），原因是 `.slide { display: grid; grid-template-rows: auto 1fr }` 但沒設 columns → grid items 自動 shrink-to-content。修法：加 `grid-template-columns: 1fr`。新做 banded slide 記得加。
- **`.tier-band > *` blanket animation rule 會 break nested children**：之前在 11/13 的 tier-band 加了 `.left-group` flex container 把 phase-num + title 包進去，但原本 CSS 的 `.tier-band > * { opacity: 0 }` 變成讓 .left-group 永遠隱形。改用 `.fadeup` class 明確標在每個動畫元素上，**不要用 `> *` 通配選擇器**。
- **iframe 快取**：`deck/index.html` 已經給 `frame.src` 加 `?v=Date.now()` cache-bust。改 slide 後 Ctrl+F5 一次（重整 deck 容器頁），之後切 slide 都會自動拿最新 CSS。
- **Many-image API limit（2000px）**：之前 user 的高解析手機照（4032×3024）讓對話爆掉。`images/` 裡所有圖已縮成長邊 ≤1800px。如果之後 user 又丟新的高解析圖：
  ```bash
  find images -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0 \
    | xargs -0 mogrify -resize "1800x1800>"
  ```
- **不要重新引入 placeholder**：早期有橘色 `★ PLACEHOLDER · 替換為真實評論` 標籤。已全部換成真實 review。**永遠用 `docs/reviews.md` 裡的逐字稿**。
- **jhu022 在 P03 不在 P04**：理由是「攤販座位凌亂 / 規劃成共用座位區」跟 P03 更直接對應。不要再搬回 P04。
- **06-second-floor.html 背景圖**：是 `../../img/2f-actual.jpg`。不要改回 longji.jpg。
- **AI slop 黑名單**（CLAUDE.md 跟 huashu-design skill 都禁）：
  - 圓角卡片 + 左彩色 border accent → 改成 top hairline + 編號
  - 裝飾性 SVG icon 每個標題都配 → 拿掉，靠 typography
  - 紫色漸變 / Inter / Roboto / system font display → 用 brand 字體（Noto Serif TC + Sans TC）
  - 凡發明的 hex 色 → 一律從 tokens.css 抽
- **`data-delay` 數值不要撞**：常見過的延遲：200 / 350 / 450 / 600 / 700 / 800 / 900 / 1100 / 1300 / 1500 / 1700 / 1900 / 2000 / 2100 / 2200 / 2300 / 2400 / 2500 / 2700 / 2900 / 3100 / 3500。新元素挑沒撞到的、或挑緊接前一個 200ms 後的合理 stagger。

## Git workflow

- 主 repo 在 `shuiyuan-market/site/`（**不在外層 `水源市場/` 目錄**），remote `origin` 是 `https://github.com/Zane-Hao/shuiyuan-market.git`
- User 偏好直推 `main`（不開 PR）
- PowerShell 推法：`git -C "C:\Users\zane0\Documents\Claude\水源市場\shuiyuan-market\site" push origin main`
- repo 已設 `core.quotepath=false` / `i18n.commitencoding=utf-8` / `http.postBuffer=500MB`（給中文路徑 + 大圖片首次推送用）

## Where to find more

- `docs/reviews.md` — 10 則 OCR'd 評論 + 對應 slide + reasoning。**動任何 slide 之前先讀這個**。
- `docs/review-pattern.md` — 04-sanitation.html review CTA 區塊的完整 HTML / CSS / JS（A pattern 參考）。
- `images/負面評論/` — 截圖原檔（已 OCR 過）。
- `images/A_肉攤生鮮區`、`B_美食街用餐區`、`C_走道動線`、`D_水源之心外牆`、`E_南門市場對比`、`F_衛生環境真實照`、`G_兩市場對比圖` — 視覺素材庫。
- `水源市場_視覺參考清單.md` — 視覺素材索引。
