// Section · Sources · 引用與資料來源
// Each entry is anchored as id="source-N" so <Citation n={N}/> links to it.

const SOURCES = [
  {
    n: 1, group: "academic",
    title: "Mehrabian, A. & Russell, J. A. (1974)",
    detail: "An Approach to Environmental Psychology. Cambridge, MA: MIT Press. ISBN 0-262-13090-4.（PAD 情緒模型原典）",
    url: null,
  },
  {
    n: 2, group: "academic",
    title: "McAdams, D. & Biggar, S. (2007) — Path Intelligence 9-month UK retail study",
    detail: "Time is Money: Shoppers buy more when they stay longer. 原研究指出停留時間每增加 1%，銷售額隨之增加 1.3%。本案透過 Retail Sensing 公開引用取得（見 [3]）。",
    url: null,
  },
  {
    n: 3, group: "academic",
    title: "Retail Sensing (2024)",
    detail: "Retail Dwell Time — the Route to Higher Spending. 2024 年 5 月發表，引用 Path Intelligence 2007 原研究確認 +1% 停留 → +1.3% 銷售之關係。",
    url: "https://www.retailsensing.com/people-counting/retail-dwell-time-metric/",
  },
  {
    n: 4, group: "press",
    title: "自由時報藝文網（2025）",
    detail: "公館水源市場外牆變美 多視角看 57 色漸層杜鵑。報導台北市文化局 2024–2025 年「斥資逾 4000 萬元」優化外牆公共藝術，藝術家為以色列動力藝術大師亞科夫．亞剛（Yaacov Agam），原作於 2010 年完成，2025 年 8 月優化完工。",
    url: "https://art.ltn.com.tw/article/breakingnews/5163879",
  },
  {
    n: 5, group: "gov",
    title: "臺北市公共藝術網",
    detail: "「水源之心」作品頁 — 公共藝術官方登錄資料。",
    url: "https://publicart.taipei/Works_detail.aspx?id=507",
  },
  {
    n: 6, group: "gov",
    title: "臺北市市場處",
    detail: "公有水源市場介紹頁 — 民國 42 年（1953）創建，民國 69 年（1980）大樓重新開幕，地址臺北市中正區羅斯福路四段 92 號。1F 為美食、生活雜貨、水果、花卉，2F 為鮮肉攤、海鮮攤、沙龍、服飾修改。（具體攤位數未於官方頁面列出。）",
    url: "https://www.tcma.gov.taipei/News_Content.aspx?n=1A4C7120ABFD0F9F&sms=26C5BF03E7963F4E&s=55F3A5B5995A421B",
  },
  {
    n: 7, group: "press",
    title: "Google 公開評論（觀察樣本）",
    detail: "本案 PAD「現況」評估部分依據對水源市場 Google Maps 公開評論的主題分析。評論文本為公開資料；具體評論數與時點請以最近一次擷取為準。",
    url: null,
  },
  {
    n: 8, group: "press",
    title: "TripAdvisor 水源市場頁面",
    detail: "公開評論與用戶上傳照片，作為輔助觀察資料。",
    url: "https://www.tripadvisor.com/Attraction_Review-g293913-d9712976-Reviews-Shuiyuan_Market-Taipei.html",
  },
  {
    n: 9, group: "press",
    title: "南門市場改建報導集（2023–2024）",
    detail: "ShoppingDesign、TRAVELER Luxe、CP值 等多家媒體報導，紀錄南門市場玻璃帷幕、自然採光、明亮動線等改建後特色。本案「南門案例」並未引用其量化客流／營收數據，量化結論僅來自本團隊一手訪談（見 [10]）。",
    url: "https://www.shoppingdesign.com.tw/post/view/4514",
  },
  {
    n: 10, group: "interview",
    title: "南門市場資深攤商訪談（2026，本團隊）",
    detail: "結構化訪談 + 現場錄音 + 逐字稿整理。受訪者為改建前後皆營業的資深攤商，已徵得拍照與引用同意。完整摘要見 §一手案例研究（4 段引用）。本訪談為本案最重要的一手證據來源。",
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
        <div className="text-[13.5px] text-ink/80 leading-[1.6] mt-1">{s.detail}</div>
        {s.url && (
          <a href={s.url} target="_blank" rel="noopener"
             className="font-mono text-[11px] text-accent break-all hover:underline mt-1.5 inline-block">
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
          每一項主張均可追溯到原始出處；本團隊的一手訪談為最重要證據來源。
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
