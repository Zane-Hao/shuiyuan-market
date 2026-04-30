// Sections 3–4: Solution Pyramid, Users & Comparison
const { useState: uS2, useEffect: uE2, useRef: uR2, useCallback: uC2 } = React;

// ============ [3] SOLUTION PYRAMID ============
const TIERS = [
  {
    n: "01",
    title: "衛生底線重建",
    sub: "建立「敢進來、願意再來」的環境基準。",
    timeline: "短期 · 3–6 個月",
    color: "tier-stripe-1",
    accent: "#5C7A85",
    items: [
      { icon: "Droplet", t: "排水管線清淤、截油槽定期清洗" },
      { icon: "Footprint", t: "二樓生鮮區地板防滑與沖洗系統升級" },
      { icon: "Wind", t: "廁所全面翻修、加強通風" },
      { icon: "Shield", t: "定期病媒防治機制（鼠患／蟑螂）" },
      { icon: "Bulb", t: "內側攤位採光與基礎照明強化" },
    ],
  },
  {
    n: "02",
    title: "餐食區集中化改造",
    sub: "從「攤販分散式服務」轉型為「集中食堂模式」。",
    timeline: "中期 · 6–12 個月",
    color: "tier-stripe-2",
    accent: "#E07A3C",
    items: [
      { icon: "Plate", t: "統一餐盤與集中回收清洗站" },
      { icon: "Chair", t: "獨立用餐區，與生鮮採購動線分離" },
      { icon: "Split", t: "生熟食空間明確分區、動線不交叉" },
      { icon: "Wind", t: "增加排煙系統解決油煙與悶熱" },
    ],
  },
  {
    n: "03",
    title: "動線與樓層功能再造",
    sub: "B1 生鮮、1F 熟食、2F 服飾 — 三層垂直分工。",
    timeline: "長期 · 12 個月以上",
    color: "tier-stripe-3",
    accent: "#2F5D4F",
    items: [
      { icon: "Compass", t: "B1 生鮮獨立分區與卸貨動線" },
      { icon: "Plus", t: "1F 熟食集中、雙主入口與用餐區" },
      { icon: "Eye", t: "2F 成衣販售與修改衣服複合層" },
      { icon: "Sparkle", t: "外牆藝術視覺延伸至室內導引系統" },
    ],
  },
];

function PyramidSVG({ active }) {
  return (
    <svg viewBox="0 0 360 380" className="w-full h-auto">
      {/* Base tier */}
      <polygon points="20,360 340,360 300,250 60,250"
        fill={active === 0 ? "#5C7A85" : "rgba(92,122,133,0.4)"}
        stroke="var(--ink)" strokeWidth="1.5" style={{transition:"all .5s"}}/>
      <text x="180" y="320" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" className="font-display">第一階段</text>
      <text x="180" y="340" textAnchor="middle" fontSize="11" fill="#fff" opacity="0.8" className="font-mono" letterSpacing="2">SANITATION</text>

      {/* Mid tier */}
      <polygon points="60,250 300,250 260,140 100,140"
        fill={active === 1 ? "#E07A3C" : "rgba(224,122,60,0.4)"}
        stroke="var(--ink)" strokeWidth="1.5" style={{transition:"all .5s"}}/>
      <text x="180" y="210" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" className="font-display">第二階段</text>
      <text x="180" y="230" textAnchor="middle" fontSize="11" fill="#fff" opacity="0.85" className="font-mono" letterSpacing="2">DINING</text>

      {/* Top tier */}
      <polygon points="100,140 260,140 180,30"
        fill={active === 2 ? "#2F5D4F" : "rgba(47,93,79,0.4)"}
        stroke="var(--ink)" strokeWidth="1.5" style={{transition:"all .5s"}}/>
      <text x="180" y="100" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" className="font-display">第三階段</text>
      <text x="180" y="118" textAnchor="middle" fontSize="10" fill="#fff" opacity="0.85" className="font-mono" letterSpacing="2">SPATIAL</text>

      {/* upward arrow on the side */}
      <g transform="translate(348, 60)">
        <line x1="0" y1="0" x2="0" y2="280" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 4" opacity="0.4"/>
        <polygon points="-5,5 5,5 0,-5" fill="var(--ink)" opacity="0.4"/>
        <text x="6" y="150" fontSize="10" fill="var(--muted)" className="font-mono" letterSpacing="2" transform="rotate(90, 6, 150)">由下而上 · 累積式建構</text>
      </g>
    </svg>
  );
}

// Before-After slider
function BeforeAfter() {
  const [pct, setPct] = uS2(50);
  const ref = uR2(null);
  const dragging = uR2(false);

  const update = uC2((clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = clientX - r.left;
    const p = Math.max(0, Math.min(100, (x / r.width) * 100));
    setPct(p);
  }, []);

  uE2(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      update(cx);
      e.preventDefault();
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("touchmove", onMove, {passive:false});
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="ba-slider relative w-full aspect-[16/10] rounded-md overflow-hidden border border-ink/20"
         onPointerDown={(e)=>{dragging.current = true; update(e.clientX);}}>
      {/* AFTER (full background) */}
      <div className="absolute inset-0 grain" style={{background:"#f0e2c8"}}>
        <img src="img/nanmen-foodcourt.jpg" className="w-full h-full object-cover" alt="集中食堂改造後參考"/>
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg, rgba(47,93,79,0.15), rgba(224,122,60,0.05))"}}></div>
        <div className="absolute bottom-4 right-5 px-3 py-1.5 rounded-full bg-paper/95 text-ink text-[12px] font-mono tracking-[0.15em] shadow-md">AFTER · 集中食堂</div>
      </div>
      {/* BEFORE (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{width: `${pct}%`}}>
        <img src="img/aisle-2.jpg" className="w-full h-full object-cover" alt="改造前 — 攤前用餐、生熟食混雜" style={{width:`${100/(pct/100)}%`, maxWidth:"none"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg, rgba(168,54,42,0.15), rgba(0,0,0,0.18))"}}></div>
        <div className="absolute bottom-4 left-5 px-3 py-1.5 rounded-full bg-warn text-paper text-[12px] font-mono tracking-[0.15em] shadow-md">BEFORE · 攤前用餐</div>
      </div>
      {/* divider */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-paper" style={{left:`${pct}%`, transform:"translateX(-1px)"}}>
        <div className="ba-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon.Split width="22" height="22"/>
        </div>
      </div>
    </div>
  );
}

function FloorSchematic() {
  const floors = [
    {
      level: "B1",
      title: "生鮮果菜市場",
      sub: "Fresh produce",
      color: "#5BA66B",
      items: [
        "生鮮蔬果、肉品、魚鮮",
        "冷藏／冷凍設備與倉儲",
        "貨物卸貨區、後勤動線",
        "貨物、垃圾暫存",
      ],
    },
    {
      level: "1F",
      title: "現成食物市場",
      sub: "Cooked food",
      color: "#5B9BD5",
      items: [
        "熟食、餐飲、食品",
        "美食廣場／共享座位區",
        "洗手間、服務台",
        "開放明亮、人流匯集",
      ],
    },
    {
      level: "2F",
      title: "成衣與修改衣服",
      sub: "Apparel & alteration",
      color: "#E8A04F",
      items: [
        "成衣販售區",
        "布料／配件區、試衣間",
        "修改衣服／縫紉服務區",
        "櫃位服務台、休息區",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero plan image */}
      <figure className="photo-card">
        <img src="img/floorplan-real.webp" alt="水源市場改建方案 平面圖 — B1 / 1F / 2F" loading="lazy" className="w-full"/>
        <figcaption className="px-5 py-3 bg-paper border-t border-ink/10 flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted">FLOOR PLAN · 1:250 · B1 / 1F / 2F</span>
          <span className="font-mono text-[11px] tracking-[0.15em] text-muted">水源市場改建方案 · 配置與動線設計</span>
        </figcaption>
      </figure>

      {/* Three-floor breakdown - stacked top to bottom */}
      <div className="space-y-4">
        {floors.map((f) => (
          <div key={f.level} className="bg-paper border border-ink/10 rounded-md p-5 hover:border-ink/30 transition-colors flex flex-col md:flex-row gap-4 md:gap-6"
               style={{borderLeft:`4px solid ${f.color}`}}>
            <div className="md:w-[200px] md:flex-shrink-0">
              <div className="flex items-baseline gap-3">
                <span className="font-mono font-bold text-[24px]" style={{color: f.color}}>{f.level}</span>
                <span className="font-display font-bold text-[16px]">{f.title}</span>
              </div>
              <div className="text-[12px] text-muted font-mono mt-1 tracking-wide">{f.sub}</div>
            </div>
            <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
              {f.items.map((it, k) => (
                <li key={k} className="flex gap-2 text-[13.5px] leading-[1.55] text-ink/80">
                  <span style={{color: f.color}}>·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PyramidSection() {
  const [active, setActive] = uS2(0);
  const articleRefs = uR2([]);

  uE2(() => {
    const updateActive = () => {
      const probe = window.innerHeight * 0.45;
      let cur = 0;
      refs.current.forEach((r, i) => {
        const el = r.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe) cur = i;
      });
      setActive(cur);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <Section id="pyramid">
      <Reveal>
        <Label num="03">SOLUTION · 三層解方架構</Label>
        <h2 className="font-display font-black t-h2 mt-4 max-w-[820px]">
          不破壞平價定位的<span className="text-accent">分階段</span>改造。
        </h2>
        <p className="mt-6 max-w-[65ch] text-[18px] leading-[1.75] text-ink/85">
          整潔但不精緻，舒適但不高端。三個階段累積式堆疊，
          每一層都建立在前一層的基礎上 — 先讓人願意進來，再讓人願意停留，最後讓人願意再來。
        </p>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-12 gap-12">
        {/* Sticky pyramid */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="card-warm p-6 rounded-md">
              <Label>FRAMEWORK · 三層架構</Label>
              <div className="mt-4">
                <PyramidSVG active={active}/>
              </div>
              <div className="mt-3 text-[12px] text-muted font-mono">{active+1}/3 · 滾動切換</div>
            </div>
          </div>
        </div>

        {/* Tier text */}
        <div className="lg:col-span-7 space-y-24">
          {TIERS.map((tier, i) => (
            <article key={i} ref={el => articleRefs.current[i] = el} className={`rounded-md overflow-hidden ${tier.color}`}>
              <div className="p-7 md:p-9">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="font-mono text-[13px] tracking-[0.2em] opacity-85">PHASE {tier.n}</div>
                  <div className="font-mono text-[12px] tracking-[0.15em] opacity-80 px-3 py-1 rounded-full border border-white/40">{tier.timeline}</div>
                </div>
                <h3 className="font-display font-black text-[clamp(1.4rem,2.1vw,2.125rem)] mt-3">{tier.title}</h3>
                <p className="mt-3 text-[16px] opacity-90 max-w-[55ch]">{tier.sub}</p>
              </div>
              <div className="bg-paper text-ink p-7 md:p-9">
                <ul className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                  {tier.items.map((it, j) => {
                    const I = Icon[it.icon] || Icon.Sparkle;
                    return (
                      <li key={j} className="flex items-start gap-3">
                        <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{background: tier.accent + "22", color: tier.accent}}>
                          <I width="18" height="18"/>
                        </span>
                        <span className="text-[15.5px] leading-[1.6] pt-1">{it.t}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* per-tier custom visual */}
                {i === 0 && (
                  <div className="mt-8">
                    <div className="label-sm mb-3">EXECUTION · 執行重點</div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <figure className="photo-card">
                        <div className="aspect-[4/3]">
                          <img src="img/phase1-plumbing.jpg" alt="衛生管線重建" loading="lazy"/>
                        </div>
                        <figcaption className="px-4 py-3 bg-paper border-t border-ink/10">
                          <div className="font-mono text-[11px] tracking-[0.15em] text-muted">PLUMBING · 管線重建</div>
                          <div className="text-[14px] mt-1 text-ink/85 leading-[1.55]">排水主幹、截油槽、廢水管全面汰換，建立可定期維護的基礎。</div>
                        </figcaption>
                      </figure>
                      <figure className="photo-card">
                        <div className="aspect-[4/3]">
                          <img src="img/phase1-toilet.jpg" alt="多元友善廁所" loading="lazy"/>
                        </div>
                        <figcaption className="px-4 py-3 bg-paper border-t border-ink/10">
                          <div className="font-mono text-[11px] tracking-[0.15em] text-muted">RESTROOM · 多元友善廁所</div>
                          <div className="text-[14px] mt-1 text-ink/85 leading-[1.55]">採用旋轉式 RGFT 模組（Rotating Gender Friendly Toilet），全面翻新並強化通風。</div>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                )}
                {i === 1 && (
                  <div className="mt-8">
                    <div className="label-sm mb-3">BEFORE / AFTER · 拖動比較</div>
                    <BeforeAfter/>
                    <div className="mt-5 grid md:grid-cols-3 gap-3">
                      {[
                        {t:"統一餐盤", d:"由市場統一管理碗盤回收與消毒"},
                        {t:"集中用餐區", d:"買食物與吃食物的空間明確分離"},
                        {t:"生熟食動線", d:"肉攤回歸採購、用餐區獨立"},
                      ].map((x,k)=>(
                        <div key={k} className="card-warm rounded-md p-4">
                          <div className="font-display font-bold text-[15px]">{x.t}</div>
                          <div className="text-[13px] text-ink/75 mt-1.5 leading-[1.55]">{x.d}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="mt-8">
                    <div className="label-sm mb-3">FLOOR FUNCTION · 三層分工 · B1 / 1F / 2F</div>
                    <FloorSchematic/>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============ [4] USERS & COMPARISON ============
const USERS = [
  {
    icon: "Backpack",
    name: "學生族群",
    sub: "台大、師大、外食族",
    quote: "「便宜、快、有冷氣 — 至少不要悶到吃不下。」",
    needs: [
      { l: "平價選擇", v: 92 },
      { l: "通風／座位", v: 65 },
      { l: "速度", v: 88 },
    ],
    gain: "整潔通風的平價餐食環境、固定用餐區",
    driver: "進場意願 ↑",
    color: "#E07A3C",
  },
  {
    icon: "Bag",
    name: "在地居民",
    sub: "在地熟客、中老年主婦",
    quote: "「血水滿地、又沒地方坐，孫子怎麼帶得出來？」",
    needs: [
      { l: "衛生條件", v: 78 },
      { l: "一站購足", v: 85 },
      { l: "動線清楚", v: 60 },
    ],
    gain: "生熟食動線分離、衛生條件提升",
    driver: "採購信心 ↑",
    color: "#2F5D4F",
  },
  {
    icon: "Camera",
    name: "觀光客／老饕",
    sub: "外地名攤朝聖者",
    quote: "「攤點明明很厲害，但環境一進來就想趕快走。」",
    needs: [
      { l: "環境品質", v: 70 },
      { l: "探索性", v: 82 },
      { l: "可拍性", v: 65 },
    ],
    gain: "探索型消費環境、跨攤位停留體驗",
    driver: "消費金額 ↑",
    color: "#A8362A",
  },
];

function NeedBar({ label, value, color }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[12px]">
        <span className="text-ink/75">{label}</span>
        <span className="font-mono font-bold" style={{color}}>{value}</span>
      </div>
      <div className="mt-1.5 h-[6px] bg-ink/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{width:`${value}%`, background: color}}></div>
      </div>
    </div>
  );
}

const RADAR_DATA = {
  current: [
    { axis: "衛生", 水源: 50, 南門: 88, 龍泉: 55, 公館商圈: 70 },
    { axis: "動線", 水源: 45, 南門: 85, 龍泉: 50, 公館商圈: 65 },
    { axis: "品項多樣", 水源: 82, 南門: 82, 龍泉: 60, 公館商圈: 90 },
    { axis: "價格", 水源: 92, 南門: 60, 龍泉: 82, 公館商圈: 75 },
    { axis: "文化氛圍", 水源: 68, 南門: 80, 龍泉: 65, 公館商圈: 75 },
    { axis: "學生友善", 水源: 80, 南門: 50, 龍泉: 60, 公館商圈: 88 },
  ],
  after: [
    { axis: "衛生", 水源: 85, 南門: 88, 龍泉: 55, 公館商圈: 70 },
    { axis: "動線", 水源: 82, 南門: 85, 龍泉: 50, 公館商圈: 65 },
    { axis: "品項多樣", 水源: 88, 南門: 82, 龍泉: 60, 公館商圈: 90 },
    { axis: "價格", 水源: 90, 南門: 60, 龍泉: 82, 公館商圈: 75 },
    { axis: "文化氛圍", 水源: 82, 南門: 80, 龍泉: 65, 公館商圈: 75 },
    { axis: "學生友善", 水源: 90, 南門: 50, 龍泉: 60, 公館商圈: 88 },
  ],
};

const SWOT_DATA = {
  current: [
    { k: "S", t: "優勢", color: "#2F5D4F", items: [
      "公館商圈核心位置、捷運共構",
      "212 攤名攤密度高",
      "外牆藝術已有 IP",
      "學生客群基本盤穩定",
    ]},
    { k: "W", t: "劣勢", color: "#A8362A", items: [
      "內部硬體 1980 年",
      "上方機關共構難改建",
      "缺集中用餐區",
      "二樓能見度低",
    ]},
    { k: "O", t: "機會", color: "#E07A3C", items: [
      "南門市場改建作參考",
      "公館商圈外食需求大",
      "數位支付普及",
      "SDG 政策契合",
    ]},
    { k: "T", t: "威脅", color: "#5C7A85", items: [
      "路邊攤、便利商店競爭",
      "夜市分流年輕客",
      "Google 負評累積",
      "環境負評影響攤商續租",
    ]},
  ],
  after: [
    { k: "S", t: "優勢", color: "#2F5D4F", items: [
      "B1/1F/2F 三層垂直分工成形",
      "中央集中食堂提升停留時間",
      "硬體升級至 2025 公衛規格",
      "外牆 IP 延伸至室內導引",
    ]},
    { k: "W", t: "劣勢", color: "#A8362A", items: [
      "改建工期影響攤商營業",
      "後場物流仍受機關共構限制",
      "二樓引流仍需持續經營",
      "客單價提升空間有限",
    ]},
    { k: "O", t: "機會", color: "#E07A3C", items: [
      "成為公館商圈生活地標",
      "策展／市集活動引入新客群",
      "外帶＋數位支付擴大營收",
      "與 NTU、商圈品牌跨域合作",
    ]},
    { k: "T", t: "威脅", color: "#5C7A85", items: [
      "高人潮對營運維護的長期壓力",
      "周邊夜市與外送平台持續競爭",
      "改建後租金結構需平衡",
      "公共藝術維護成本",
    ]},
  ],
};

function StrategyPanel() {
  const [mode, setMode] = uS2("current");
  return (
    <div>
      {/* Shared toggle */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="font-mono text-[12px] tracking-[0.2em] text-muted">SCENARIO · 場景切換</div>
        <div className="flex rounded-full border-2 border-ink overflow-hidden">
          {[["current","現況"],["after","改造後"]].map(([k,l])=>(
            <button key={k} onClick={()=>setMode(k)}
              className="px-5 py-2 text-[13px] font-mono tracking-wider transition-colors"
              style={{background: mode===k ? "var(--ink)" : "transparent", color: mode===k ? "var(--bg)" : "var(--ink)"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-display font-bold t-h3 mb-5">市場定位 · 四方比較</h3>
        <ComparisonRadar mode={mode}/>
      </div>

      <div>
        <h3 className="font-display font-bold t-h3 mb-5">SWOT · 戰略象限</h3>
        <SWOTGrid mode={mode}/>
      </div>
    </div>
  );
}

function ComparisonRadar({ mode }) {
  const R = window.Recharts;
  if (!R) return <div className="text-muted">Loading chart…</div>;
  const { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } = R;
  const palette = { 水源: "#E07A3C", 南門: "#2F5D4F", 龍泉: "#A8362A", 公館商圈: "#5C7A85" };
  return (
    <div className="card-warm rounded-md p-6 md:p-8">
      <div className="mb-2">
        <Label>RADAR · 四市場六維比較 · {mode === "after" ? "改造後" : "現況"}</Label>
      </div>
      <div style={{width:"100%", height: 420}}>
        <ResponsiveContainer>
          <RadarChart data={RADAR_DATA[mode]} outerRadius="78%">
            <PolarGrid stroke="rgba(47,93,79,0.18)"/>
            <PolarAngleAxis dataKey="axis" tick={{fill:"#2F5D4F", fontSize: 13, fontWeight: 600}}/>
            <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:"rgba(47,93,79,0.45)", fontSize: 10}}/>
            {Object.keys(palette).map((k)=>(
              <Radar key={k} name={k} dataKey={k} stroke={palette[k]} fill={palette[k]} fillOpacity={k==="水源"?0.35:0.08} strokeWidth={k==="水源"?2.5:1.5}/>
            ))}
            <Legend wrapperStyle={{fontSize: 13, paddingTop: 12}}/>
            <Tooltip contentStyle={{background:"var(--bg)", border:"1px solid var(--ink)", borderRadius:4, fontSize:13}}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SWOTGrid({ mode = "current" }) {
  const swot = SWOT_DATA[mode];
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {swot.map((q,i)=>(
        <div key={i} className="rounded-md p-5 md:p-6 transition-all" style={{background: q.color, color:"var(--bg)"}}>
          <div className="flex items-baseline gap-3">
            <span className="font-display font-black text-[clamp(1.8rem,2.5vw,2.5rem)] leading-none opacity-90">{q.k}</span>
            <span className="font-display font-bold text-[18px]">{q.t}</span>
          </div>
          <ul className="mt-4 space-y-2 text-[14px]">
            {q.items.map((x,j)=>(
              <li key={`${mode}-${j}`} className="flex gap-2">
                <span className="opacity-60">·</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function UsersSection() {
  return (
    <Section id="users">
      <Reveal>
        <Label num="04">USERS · 三類使用者</Label>
        <h2 className="font-display font-black t-h2 mt-4 max-w-[820px]">
          一個空間，<span className="text-accent">三種節奏</span>。
        </h2>
        <p className="mt-6 max-w-[65ch] text-[18px] leading-[1.75] text-ink/85">
          三類使用者的共同需求都指向「整潔、通風、可停留」。
          差異化定位不是替誰服務，而是讓不同節奏的人在同一空間內各取所需，互不干擾。
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-5">
        {USERS.map((u, i) => {
          const I = Icon[u.icon];
          return (
            <Reveal key={i} delay={i*100}>
              <div className="card-warm rounded-md p-6 h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: u.color, color:"#fff"}}>
                    <I width="22" height="22"/>
                  </div>
                  <div>
                    <div className="font-display font-bold text-[clamp(1rem,1.2vw,1.2rem)]">{u.name}</div>
                    <div className="font-mono text-[11px] text-muted tracking-[0.1em]">{u.sub}</div>
                  </div>
                </div>
                <blockquote className="mt-5 text-[14.5px] italic text-ink/75 leading-[1.6] border-l-2 pl-4" style={{borderColor: u.color}}>
                  {u.quote}
                </blockquote>
                <div className="mt-5 space-y-3">
                  {u.needs.map((n,j)=><NeedBar key={j} label={n.l} value={n.v} color={u.color}/>)}
                </div>
                <div className="mt-auto pt-5 border-t border-ink/10">
                  <div className="label-sm">改造後獲得</div>
                  <div className="text-[13.5px] mt-1.5 leading-[1.55]">{u.gain}</div>
                  <div className="mt-3 inline-block font-mono text-[12px] tracking-[0.1em] px-2.5 py-1 rounded-full" style={{background: u.color+"15", color: u.color}}>
                    {u.driver}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-20">
        <Reveal>
          <h3 className="font-display font-bold t-h3 mb-3">並排對照 · 南門 vs 水源</h3>
          <p className="text-[15px] text-ink/70 max-w-[58ch] mb-6">
            同樣是公有市場，動線秩序與用餐空間的差距，最直接地反映在「人願不願意停下來」這件事上。
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <figure className="photo-card">
              <img src="img/compare-aisle.png" alt="走道對比：南門 vs 水源" loading="lazy"/>
              <figcaption className="px-4 py-3 bg-paper text-[13px] text-ink/80 border-t border-ink/10">
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted">AISLE · 走道</span>
                <div className="mt-1">南門有秩序的逛街動線　·　水源攤前直接服務、走道擠塞</div>
              </figcaption>
            </figure>
            <figure className="photo-card">
              <img src="img/compare-dining.png" alt="用餐區對比：南門 vs 水源" loading="lazy"/>
              <figcaption className="px-4 py-3 bg-paper text-[13px] text-ink/80 border-t border-ink/10">
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted">DINING · 用餐</span>
                <div className="mt-1">南門集中食堂、桌椅完整　·　水源站著吃、攤前壅塞</div>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>

      <div className="mt-16">
        <Reveal>
          <StrategyPanel/>
        </Reveal>
      </div>
    </Section>
  );
}

Object.assign(window, { PyramidSection, UsersSection });
