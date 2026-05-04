// Sections 0–2: Hero, Problem, Data
const { useState: uS1, useEffect: uE1, useRef: uR1 } = React;

// ============ [0] HERO ============
function Hero() {
  const sectionRef = uR1(null);
  const progress = useScrollProgress(sectionRef);
  // photo subtly zooms 1.0 → 1.08 as user scrolls past hero
  const photoScale = 1 + Math.min(0.08, Math.max(0, progress * 0.18));
  const photoOpacity = 1 - Math.min(0.2, Math.max(0, (progress - 0.5) * 0.6));

  return (
    <section ref={sectionRef} id="hero" data-section="hero" className="relative h-screen min-h-[680px] w-full overflow-hidden text-paper" style={{color: "var(--bg)", background:"#0d1f1a"}}>
      {/* real facade night photo with scroll-driven zoom */}
      <img src="img/facade-pink.jpg" alt="水源市場大樓外牆藝術"
           className="absolute inset-0 w-full h-full object-cover"
           style={{
             filter:"saturate(0.9) brightness(0.45)",
             transform: `scale(${photoScale.toFixed(4)})`,
             opacity: photoOpacity,
             transformOrigin: "50% 55%",
             transition: "transform 0.1s linear, opacity 0.1s linear",
             willChange: "transform, opacity",
           }}/>

      {/* dark overlay for text legibility */}
      <div className="absolute inset-0" style={{background:"linear-gradient(180deg, rgba(13,31,26,0.7) 0%, rgba(13,31,26,0.5) 40%, rgba(13,31,26,0.92) 100%)"}}></div>

      {/* warm accent radial */}
      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 20% 80%, rgba(224,122,60,0.22), transparent 55%)"}}></div>

      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col">
        {/* top bar */}
        <Reveal from="down" delay={0}>
          <div className="pt-8 md:pt-12 flex items-center justify-between">
            <div className="label-sm flex items-center gap-3" style={{color:"rgba(251,247,238,0.75)"}}>
              <span className="inline-block w-8 h-px bg-current opacity-60"></span>
              <span>水源市場 SDG 提案 · 2026</span>
            </div>
            <div className="font-mono text-[11px] tracking-[0.2em] opacity-70 hidden md:block">SHUI-YUAN MARKET · TAIPEI</div>
          </div>
        </Reveal>

        {/* center title */}
        <div className="flex-1 flex flex-col justify-center max-w-[1000px]">
          {/* Word-stagger: split phrase into segments that fade up sequentially */}
          <WordStagger
            as="h1"
            segments={["一場", "關於", <span key="dwell" className="italic" style={{color:"var(--accent)"}}>停留</span>, " ", "的", "提案"]}
            step={120}
            baseDelay={350}
            className="font-display font-black t-hero tracking-tight"
          />
          <Reveal delay={1300}>
            <p className="mt-8 max-w-[640px] text-[clamp(1rem,1.2vw,1.2rem)] md:text-[clamp(1rem,1.4vw,1.375rem)] leading-[1.6]" style={{color:"rgba(251,247,238,0.85)"}}>
              從衛生底線到動線重構，三層解方<br/>讓公館的傳統市場再被看見。
            </p>
          </Reveal>

          <Reveal delay={1600}>
            <div className="mt-10 font-mono text-[11px] md:text-[12px] tracking-[0.18em] flex flex-wrap items-center gap-x-3 gap-y-2" style={{color:"rgba(251,247,238,0.65)"}}>
              <span>SDG · 8 · 9 · 11 · 12</span>
              <span style={{color:"rgba(251,247,238,0.3)"}}>/</span>
              <span>三層解方架構</span>
              <span style={{color:"rgba(251,247,238,0.3)"}}>/</span>
              <span>PAD 情緒模型</span>
            </div>
          </Reveal>
        </div>

        {/* bottom */}
        <Reveal from="up" delay={1900}>
          <div className="pb-10 flex items-end justify-between">
            <div className="font-mono text-[11px] tracking-[0.2em] opacity-70">
              郝思澄 · 陳品睿 · 林子佑<br/>
              臺北市公有水源市場 · 公館商圈
            </div>
            <div className="flex items-center gap-2 opacity-80 bounce">
              <span className="font-mono text-[11px] tracking-[0.3em]">SCROLL</span>
              <Icon.Chevron width="16" height="16"/>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Auto-advancing image slideshow with manual controls
function Slideshow({ imgs, alt, interval = 3500 }) {
  const [i, setI] = uS1(0);
  const [paused, setPaused] = uS1(false);
  uE1(() => {
    if (paused || imgs.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % imgs.length), interval);
    return () => clearInterval(t);
  }, [paused, imgs.length, interval]);

  const go = (delta) => setI((x) => (x + delta + imgs.length) % imgs.length);

  return (
    <div className="photo-card photo-warn aspect-[16/10] relative group"
         onMouseEnter={() => setPaused(true)}
         onMouseLeave={() => setPaused(false)}>
      {imgs.map((src, k) => (
        <img key={k} src={src} alt={alt} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === k ? 1 : 0,
            transition: "opacity 0.7s ease-in-out",
          }}/>
      ))}
      {imgs.length > 1 && (
        <>
          {/* Counter */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink/80 text-paper font-mono text-[11px] tracking-[0.15em]" style={{color:"var(--bg)"}}>
            {String(i+1).padStart(2,"0")} / {String(imgs.length).padStart(2,"0")}
          </div>
          {/* Prev / Next */}
          <button onClick={() => go(-1)} aria-label="previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{background:"rgba(47,93,79,0.6)", color:"var(--bg)", backdropFilter:"blur(4px)"}}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button onClick={() => go(1)} aria-label="next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{background:"rgba(47,93,79,0.6)", color:"var(--bg)", backdropFilter:"blur(4px)"}}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {imgs.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`slide ${k+1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === k ? 22 : 7,
                  height: 7,
                  background: i === k ? "var(--bg)" : "rgba(251,247,238,0.5)",
                }}/>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============ [1] PROBLEM ============
const PROBLEMS = [
  {
    n: "01",
    title: "油膩餐食區",
    body: "熟食攤位佔比近兩成，但排煙與廢水處理仍停留在 1980 年的初代規格。攤前直接用餐，油煙、廢水、走道氣味彼此交疊。",
    imgs: ["img/foodzone-1.jpg", "img/foodzone-2.jpg"],
    annotations: [
      { x: "30%", y: "30%", label: "排煙設備不足" },
      { x: "55%", y: "65%", label: "走道與烹飪檯距離過近" },
      { x: "78%", y: "82%", label: "攤前直接用餐" },
    ],
    hot: { x: 32, y: 62 },
  },
  {
    n: "02",
    title: "衛生底線",
    body: "肉攤血水、檯面與走道之間沒有明確分界。地板濕滑、檯面狼藉 — 這是 Google 評論中最高頻的負評來源，也是市場長年被「不敢進來」標籤的核心原因。",
    img: "img/sanitation-issue.png",
    annotations: [
      { x: "18%", y: "30%", label: "肉品塑膠袋懸掛展示" },
      { x: "55%", y: "55%", label: "走道兼通道、人車混流" },
      { x: "78%", y: "75%", label: "肉品袋裝後置於開放檯面" },
    ],
    hot: { x: 70, y: 30 },
  },
  {
    n: "03",
    title: "無集中座位",
    body: "全棟逾 200 攤、0 個正式集中用餐區。消費者在攤販前直接吃，名攤如龍記前永遠是站著等的人潮，不只衛生，更讓人不願久留。",
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
    body: "服飾修改、雜貨、職人服務集中於二樓，但能見度與指引不足；連顯眼的紅色箭頭也無法引導出實質人流 — 二樓成了一樓人潮的「上不去的天花板」。",
    imgs: ["img/longji.jpg", "img/escalator.jpg", "img/2f-shops.jpg"],
    annotations: [
      { x: "50%", y: "30%", label: "樓層指引不顯眼" },
      { x: "70%", y: "70%", label: "走道照明強度低" },
    ],
    hot: { x: 78, y: 50 },
  },
];

function FloorPlan({ activeIndex }) {
  return (
    <svg viewBox="0 0 400 480" className="w-full h-auto">
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeOpacity="0.1" strokeWidth="2"/>
        </pattern>
      </defs>

      {/* outer building */}
      <rect x="20" y="20" width="360" height="440" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5"/>
      {/* second floor strip */}
      <rect x="20" y="20" width="360" height="180" fill="url(#hatch)" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3"/>
      <text x="32" y="40" className="font-mono" fontSize="10" fill="var(--muted)" letterSpacing="2">2F · 慢節奏</text>

      {/* 1F label */}
      <text x="32" y="226" className="font-mono" fontSize="10" fill="var(--muted)" letterSpacing="2">1F · 快節奏</text>

      {/* central aisle */}
      <rect x="180" y="200" width="40" height="260" fill="var(--bg)" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="200" y1="210" x2="200" y2="450" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4"/>

      {/* 1F stalls grid */}
      {Array.from({length: 14}).map((_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 40 : 240;
        const y = 220 + row * 32;
        return <rect key={"s"+i} x={x} y={y} width="120" height="24" fill="var(--bg)" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1"/>;
      })}

      {/* 2F stalls grid */}
      {Array.from({length: 8}).map((_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 40 : 240;
        const y = 50 + row * 32;
        return <rect key={"t"+i} x={x} y={y} width="120" height="24" fill="var(--bg)" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 2"/>;
      })}

      {/* escalator */}
      <polygon points="186,180 214,180 220,210 180,210" fill="var(--accent)" opacity="0.25" stroke="var(--accent)" strokeWidth="1"/>
      <text x="200" y="198" textAnchor="middle" fontSize="9" fill="var(--ink)" className="font-mono">電扶梯</text>

      {/* hotspots */}
      {PROBLEMS.map((p, i) => {
        const cx = 20 + (p.hot.x / 100) * 360;
        const cy = 20 + (p.hot.y / 100) * 440;
        const isActive = i === activeIndex;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={isActive ? 18 : 10}
              fill={isActive ? "var(--warn)" : "rgba(168,54,42,0.35)"}
              stroke="var(--bg)" strokeWidth="2"
              style={{ transition: "all 0.5s ease" }}
            />
            {isActive && (
              <circle cx={cx} cy={cy} r="26" fill="none" stroke="var(--warn)" strokeWidth="1.5" opacity="0.4">
                <animate attributeName="r" from="18" to="36" dur="1.6s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.5" to="0" dur="1.6s" repeatCount="indefinite"/>
              </circle>
            )}
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize={isActive ? "11" : "9"} fill="var(--bg)" fontWeight="700" className="font-mono">{p.n}</text>
          </g>
        );
      })}

      {/* legend */}
      <g transform="translate(20, 470)">
        <text x="0" y="0" fontSize="9" fill="var(--muted)" className="font-mono" letterSpacing="2">
          1F+2F · 200 餘攤 / 上方 3-10F 為市府機關共構
        </text>
      </g>
    </svg>
  );
}

function ProblemSection() {
  const [active, setActive] = uS1(0);
  const articleRefs = uR1([]);

  uE1(() => {
    const updateActive = () => {
      const probe = window.innerHeight * 0.45;
      let cur = 0;
      articleRefs.current.forEach((el, i) => {
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
    <Section id="problem">
      <Reveal>
        <Label num="01">CURRENT · 現況診斷</Label>
        <h2 className="font-display font-black t-h2 mt-4 whitespace-nowrap" style={{fontSize:"clamp(24px, 3.6vw, 46px)"}}>
          公館商圈最熱鬧的角落，卻是<span className="text-warn">最無法停留</span>的市場。
        </h2>
        <p className="mt-6 max-w-[65ch] text-[18px] leading-[1.75] text-ink/85">
          自 1980 年大樓落成<Citation n={6}/>至今，市府於 2024–2025 年斥資逾 4000 萬元優化<span className="text-accent font-medium">外牆公共藝術</span><Citation n={4}/>，
          內部排煙、排水、空間配置卻從未全面更新。當熟食攤位佔比近兩成，
          原始硬體早就承載不了現代餐飲的密度。
        </p>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-12 gap-10">
        {/* left sticky floor plan */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="card-warm p-5 rounded-md">
              <div className="flex items-center justify-between mb-4">
                <Label>FLOOR PLAN · B1 / 1F / 2F</Label>
                <span className="font-mono text-[11px] text-muted">{active+1}/{PROBLEMS.length}</span>
              </div>

              {/* real floor plan image with floor highlight */}
              <div className="relative rounded-md overflow-hidden border border-ink/10 bg-paper">
                <img src="img/floorplan-real.webp" alt="水源市場 平面圖" className="w-full block"/>
                {/* dim overlay regions for non-active floors */}
                {(() => {
                  // floor positions as % of image height (B1=top ~6-30%, 1F=middle ~32-58%, 2F=bottom ~60-86%)
                  const map = [
                    { floor: "1F", top: 32, bot: 58 },  // 01 油膩餐食區
                    { floor: "1F", top: 32, bot: 58 },  // 02 衛生底線
                    { floor: "1F", top: 32, bot: 58 },  // 03 無集中座位
                    { floor: "2F", top: 60, bot: 86 },  // 04 二樓低利用率
                  ];
                  const cur = map[active] || map[0];
                  return (
                    <>
                      <div className="absolute left-0 right-0 pointer-events-none transition-all duration-500"
                        style={{
                          top: `${cur.top}%`,
                          height: `${cur.bot - cur.top}%`,
                          boxShadow: "inset 0 0 0 3px var(--warn), 0 0 0 9999px rgba(251,247,238,0.55)",
                          mixBlendMode: "normal",
                        }}/>
                      <div className="absolute right-3 px-2.5 py-1 rounded-full font-mono text-[11px] tracking-[0.15em] transition-all duration-500"
                        style={{
                          top: `calc(${cur.top}% + 6px)`,
                          background: "var(--warn)",
                          color: "var(--bg)",
                        }}>
                        {cur.floor} · 問題 {active+1}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[12px] text-muted">
                <span className="inline-block w-3 h-3 border-2 border-warn"></span>
                <span>橘色框：當前段落對應的樓層位置</span>
              </div>
            </div>
          </div>
        </div>

        {/* right scrolling text */}
        <div className="lg:col-span-7 space-y-20">
          {PROBLEMS.map((p, i) => (
            <Reveal key={i} from="right" delay={0}>
            <article ref={el => articleRefs.current[i] = el} className="space-y-5">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[15px] font-bold text-warn">{p.n}.</span>
                <h3 className="font-display font-bold t-h3">{p.title}</h3>
              </div>
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
              <p className="text-[17px] leading-[1.75] text-ink/85">{p.body}</p>
            </article>
            </Reveal>
          ))}

          <Reveal from="up">
          <div className="border-t border-ink/15 pt-8 grid grid-cols-3 gap-4">
            {[
              {k:"200+", l:"攤位總數"},
              {k:"0", l:"集中用餐區"},
              {k:"近兩成", l:"熟食攤佔比"},
            ].map((s,i)=>(
              <Reveal key={i} from="scale" delay={i * 150}>
                <div className="num-counter text-[44px] md:text-[56px] leading-none text-ink">{s.k}</div>
                <div className="label-sm mt-2">{s.l}</div>
              </Reveal>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// ============ [2] DATA ============
const PAD_DATA = [
  {
    key: "P", k: "Pleasure 愉悅度", cur: 30, post: 75,
    desc: "環境帶給消費者的舒適與正向情緒。空氣、氣味、視覺乾淨度是主要決定因子。",
    drivers: [
      { n: "空氣／油煙",   cur: 25, post: 80, fix: "全棟排煙管路重整、增設通風" },
      { n: "嗅覺／積水",   cur: 30, post: 78, fix: "排水溝重做、生熟食分流" },
      { n: "視覺／招牌",   cur: 35, post: 70, fix: "統一招牌系統、補強照明" },
    ],
  },
  {
    key: "A", k: "Arousal 激發度", cur: 25, post: 60,
    desc: "環境給消費者的感官刺激與探索意願。動線層次與節點事件決定逛街節奏。",
    drivers: [
      { n: "動線／通道",   cur: 30, post: 65, fix: "拓寬主通道、增設節點休憩區" },
      { n: "活動／節奏",   cur: 20, post: 60, fix: "月度主題日、市集活動" },
      { n: "視覺焦點",     cur: 25, post: 58, fix: "招牌入口意象、夜間光飾設計" },
    ],
  },
  {
    key: "D", k: "Dominance 支配感", cur: 20, post: 70,
    desc: "消費者對環境的掌控感與信任感。資訊清晰、衛生可見、結帳便利缺一不可。",
    drivers: [
      { n: "資訊／指標",   cur: 20, post: 72, fix: "樓層導引、美食地圖、問路 AI" },
      { n: "衛生／信任",   cur: 25, post: 75, fix: "透明工作檯、中央清洗區" },
      { n: "支付／點餐",   cur: 18, post: 68, fix: "QR 點餐、行動支付、發票載具" },
    ],
  },
];

function PADBars({ after, active, setActive }) {
  const [barsRef, barsInView] = useInView({ threshold: 0.4 });
  return (
    <div ref={barsRef} className="grid grid-cols-3 gap-4 md:gap-8 h-[300px] items-end">
      {PAD_DATA.map((d,i)=>{
        const h = (after ? d.post : d.cur);
        const visibleH = barsInView ? h : 0;
        const isActive = active === i;
        return (
          <button
            key={i}
            onClick={()=>setActive(isActive ? null : i)}
            className="flex flex-col items-center h-full justify-end group cursor-pointer relative"
            style={{ transitionDelay: `${i * 120}ms` }}
            aria-label={`查看 ${d.k} 細節`}>
            <div className="num-counter text-[clamp(1.8rem,2.8vw,2.75rem)] leading-none mb-2 transition-colors"
              style={{color: after ? "var(--accent)" : "var(--warn)"}}>
              {h}
              <span className="text-[14px] font-mono text-muted ml-1">/100</span>
            </div>
            {/* delta tag */}
            <div className="text-[11px] font-mono tracking-[0.1em] mb-2 transition-opacity"
              style={{
                color: "var(--accent)",
                opacity: after ? 1 : 0.35,
              }}>
              {after ? `+${d.post - d.cur}` : `Δ +${d.post - d.cur} 待提升`}
            </div>
            <div className="w-full relative rounded-t-sm overflow-hidden" style={{height: "200px",
                outline: isActive ? "2px solid var(--ink)" : "1px solid rgba(47,93,79,0.15)",
                outlineOffset: isActive ? 4 : 0,
                transition:"outline .2s ease",
              }}>
              {/* ghost: "after" reference shown faintly when in current mode */}
              {!after && (
                <div className="absolute left-0 right-0 border-t border-dashed pointer-events-none"
                  style={{ bottom: `${d.post}%`, borderColor: "var(--accent)", opacity: 0.6 }}>
                  <span className="absolute -top-4 right-1 font-mono text-[10px]" style={{color:"var(--accent)"}}>
                    target {d.post}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0"
                style={{
                  height: `${visibleH}%`,
                  background: after ? "linear-gradient(to top, var(--accent) 0%, #f0a06b 100%)" : "linear-gradient(to top, var(--warn) 0%, #c25646 100%)",
                  transition: `height 1.1s var(--ease-out-expo) ${i * 150}ms, background 0.4s ease`,
                }}>
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage:"repeating-linear-gradient(0deg, transparent 0 19px, rgba(47,93,79,0.08) 19px 20px)"
              }}></div>
            </div>
            <div className="mt-3 text-[13px] font-medium text-center text-ink/85 flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-muted">{d.key}.</span>
              <span>{d.k}</span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.15em] text-muted mt-1 transition-opacity"
              style={{opacity: isActive ? 0 : 1}}>
              點擊展開 ↓
            </div>
          </button>
        );
      })}
    </div>
  );
}

function PADDetail({ d, after }) {
  return (
    <div className="mt-6 p-5 md:p-6 rounded-md border-2 border-ink/15 bg-paper">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-muted">DIMENSION · {d.key}</div>
          <div className="font-display font-bold text-[20px] mt-1">{d.k}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] tracking-[0.2em] text-muted">改造後</div>
          <div className="num-counter text-[24px]" style={{color:"var(--accent)"}}>+{d.post - d.cur}</div>
        </div>
      </div>
      <p className="text-[14px] leading-[1.7] text-ink/85 mb-5">{d.desc}</p>
      <div className="font-mono text-[10px] tracking-[0.2em] text-muted mb-3">驅動因子 × 改造手段</div>
      <div className="space-y-3">
        {d.drivers.map((dr, j) => {
          const v = after ? dr.post : dr.cur;
          return (
            <div key={j} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-12 md:col-span-3 text-[13px] font-medium text-ink/90">{dr.n}</div>
              <div className="col-span-9 md:col-span-5 relative h-[26px] rounded-sm overflow-hidden"
                style={{ background: "rgba(47,93,79,0.08)" }}>
                {/* current ghost when in after mode */}
                {after && (
                  <div className="absolute top-0 bottom-0 left-0 border-r border-dashed"
                    style={{ width: `${dr.cur}%`, borderColor: "var(--warn)", opacity: 0.6 }}/>
                )}
                <div className="absolute top-0 bottom-0 left-0 transition-all duration-700"
                  style={{
                    width: `${v}%`,
                    background: after ? "var(--accent)" : "var(--warn)",
                  }}/>
                <div className="absolute inset-0 flex items-center px-2 font-mono text-[11px]"
                  style={{color: v > 50 ? "#fff" : "var(--ink)"}}>{v}</div>
              </div>
              <div className="col-span-3 md:col-span-4 text-[12px] text-ink/75 leading-[1.45]">→ {dr.fix}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScaleNote({ open, setOpen }) {
  return (
    <div className="mt-4 border-t border-ink/15 pt-4">
      <button onClick={()=>setOpen(!open)}
        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted hover:text-ink transition-colors">
        <span style={{
          width:16, height:16, borderRadius:9999, border:"1.5px solid currentColor",
          display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, lineHeight:1,
        }}>{open ? "−" : "i"}</span>
        <span>SCALE 0–100 · 分數怎麼來？</span>
      </button>
      <div style={{
          maxHeight: open ? 400 : 0, opacity: open ? 1 : 0,
          overflow: "hidden", transition: "max-height .4s ease, opacity .3s ease",
        }}>
        <div className="mt-3 text-[13px] leading-[1.75] text-ink/85 space-y-2">
          <p>
            本圖採 <strong>Mehrabian–Russell 環境心理量表</strong>的 0–100 標準化指數，
            由「空氣／嗅覺／視覺／動線／資訊／衛生／支付」七項環境因子合成。
          </p>
          <p>
            <span className="font-mono text-[11px] text-muted">CURRENT　</span>
            分數來自 <strong>Google 評論文本主題分析</strong> 與 <strong>多次現場觀察</strong>
            （見 §現況診斷攝影紀錄），屬質性評估。
          </p>
          <p>
            <span className="font-mono text-[11px] text-muted">POST　　　</span>
            分數為 <strong>示意性推估值</strong>，表達各維度若依本案三層解方執行後可能達到的相對水準，
            非實測結果，不作為定量預測。
          </p>
        </div>
      </div>
    </div>
  );
}

function DataSection() {
  const [after, setAfter] = uS1(false);
  const [activePAD, setActivePAD] = uS1(0);
  const [scaleOpen, setScaleOpen] = uS1(false);
  const [counterRef, counterIn] = useInView({ threshold: 0.4 });
  const stayPct = useCounter(1, { duration: 1200, decimals: 0 }, counterIn);
  const salesPct = useCounter(1.3, { duration: 1500, decimals: 1 }, counterIn);

  return (
    <Section id="data">
      <Reveal>
        <Label num="02">DATA · 數據錨點</Label>
        <h2 className="font-display font-black t-h2 mt-4 max-w-[820px]">
          停留時間是<span className="italic text-accent">因</span>，銷售額是<span className="italic text-accent">果</span>。
        </h2>
      </Reveal>

      {/* Act A: PAD */}
      <div className="mt-20 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="label-sm">ACT · A</div>
            <h3 className="font-display font-bold t-h3 mt-3">PAD 情緒模型</h3>
            <p className="mt-5 text-[17px] leading-[1.75] text-ink/85 max-w-[42ch]">
              零售環境品質透過<strong>愉悅度、激發度、支配感</strong>三項情緒中介，
              影響消費者的停留與購買決策。水源市場現況在三項指標上皆偏低 — 進場容易，但留不住人。
            </p>
            <div className="mt-7 inline-flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted">SCENARIO</span>
              <div className="inline-flex rounded-full border-2 border-ink overflow-hidden">
                {[[false,"現況"],[true,"改造後"]].map(([k,l])=>(
                  <button key={String(k)} onClick={()=>setAfter(k)}
                    className="px-5 py-2 text-[13px] font-mono tracking-wider transition-colors"
                    style={{
                      background: after === k ? "var(--ink)" : "transparent",
                      color: after === k ? "var(--bg)" : "var(--ink)",
                    }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 italic text-muted text-[13px]">
              Mehrabian &amp; Russell, <em>An Approach to Environmental Psychology</em>, 1974.<Citation n={1}/>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <div className="card-warm p-6 md:p-8 rounded-md">
              <PADBars after={after} active={activePAD} setActive={setActivePAD}/>
              <div className="mt-5 pt-4 border-t border-ink/15 flex items-center justify-between text-[12px] font-mono text-muted">
                <span>STATE · {after ? "POST-RENOVATION" : "CURRENT"}</span>
                <span>{activePAD !== null ? `FOCUS · ${PAD_DATA[activePAD].key}` : "TAP A BAR"}</span>
              </div>
              {activePAD !== null && <PADDetail d={PAD_DATA[activePAD]} after={after}/>}
              <ScaleNote open={scaleOpen} setOpen={setScaleOpen}/>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Act B: huge counter */}
      <div ref={counterRef} className="mt-32 py-16 border-y border-ink/15">
        <Reveal>
          <div className="label-sm">ACT · B</div>
          <div className="mt-6 flex flex-col md:flex-row md:items-end gap-6 md:gap-10 flex-wrap">
            <div>
              <div className="font-mono text-[12px] tracking-[0.2em] text-muted">停留時間</div>
              <div className="num-counter text-[clamp(2.5rem,6vw,7.5rem)] leading-none text-ink">+{stayPct}<span className="text-accent">%</span></div>
            </div>
            <div className="font-display text-[clamp(1.8rem,2.5vw,2.5rem)] md:text-[60px] text-muted">→</div>
            <div>
              <div className="font-mono text-[12px] tracking-[0.2em] text-muted">銷售額</div>
              <div className="num-counter text-[clamp(2.5rem,6vw,7.5rem)] leading-none" style={{color:"var(--accent)"}}>+{salesPct.toFixed(1)}<span className="text-ink">%</span></div>
            </div>
          </div>
          <p className="mt-8 max-w-[60ch] text-[16px] leading-[1.7] text-ink/80">
            停留時間每增加 1%，銷售額隨之增加 1.3%。<Citation n={2}/><Citation n={3}/>對全棟 200 餘個攤位而言，
            這不是裝修預算，而是直接的營收槓桿。
          </p>
          <div className="mt-4 italic text-muted text-[13px]">
            Path Intelligence, 9-month UK retail study, 2007（via Retail Sensing, 2024）.
          </div>
        </Reveal>
      </div>

      {/* Act C: bridge */}
      <div className="mt-24">
        <Reveal>
          <div className="label-sm">ACT · C</div>
          <p className="font-display font-bold text-[28px] md:text-[clamp(1.8rem,2.5vw,2.5rem)] leading-[1.35] mt-6 max-w-[24ch]">
            停留時間是因，銷售額是果。<br/>
            <span className="text-accent">設計</span>，就是改寫這條因果。
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

Object.assign(window, { Hero, ProblemSection, DataSection });
