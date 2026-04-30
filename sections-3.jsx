// Sections 5–7: Causal Loop, SDG, CTA
const { useState: uS3, useEffect: uE3, useRef: uR3 } = React;

// ============ [5] CAUSAL LOOP ============
const LOOP_NODES = [
  {
    l: "環境改善", s: "Hygiene + Spatial",
    unit: "/100", values: [30, 60, 70, 75, 78, 82],
    why: "三層解方完成後，排煙、排水、生熟食動線、招牌系統皆升級到 2025 公衛規格。",
    drives: "潔淨、舒適的環境是延長停留時間的前提。",
  },
  {
    l: "停留時間", s: "Dwell Time",
    unit: "分鐘", values: [25, 35, 42, 48, 52, 55],
    why: "PAD 三項情緒指標提升後，消費者願意逗留、二次採買、用餐而非外帶。",
    drives: "停留每增加 1%，銷售增加 1.3%（Path Intelligence, 2007）。",
  },
  {
    l: "消費金額", s: "Spend per Visit",
    unit: "元/客", values: [180, 215, 240, 260, 278, 295],
    why: "停留變長 → 多攤位採購、多品項購買；集中食堂讓即食消費自然發生。",
    drives: "客單價提高 = 攤商營收基數放大。",
  },
  {
    l: "攤商營收", s: "Stall Revenue",
    unit: "Index", values: [100, 115, 130, 145, 156, 165],
    why: "212 個攤位人均消費上升、來客數穩定，整體營收成長。基期 = 改造前 100。",
    drives: "現金流改善後，攤商有餘力升級設備、招牌、食安培訓。",
  },
  {
    l: "投資意願", s: "Reinvestment",
    unit: "% 攤商", values: [20, 35, 50, 60, 68, 75],
    why: "看到鄰攤升級後生意變好，會帶動同業跟進；市場自我汰換而非外力強迫。",
    drives: "攤商主動升級 = 市場整體品質再被推一次。",
  },
  {
    l: "市場品質", s: "Market Quality",
    unit: "/100", values: [40, 55, 65, 73, 78, 84],
    why: "硬體 + 軟體 + 攤商素質都被整體拉升，形成可被感知的「水源市場感」。",
    drives: "高品質市場吸引新客、留住舊客 → 環境改善有理由再投資。",
  },
];

function CausalLoop() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [year, setYear] = uS3(0);
  const [playing, setPlaying] = uS3(false);
  const [hovered, setHovered] = uS3(null);
  const [pinned, setPinned] = uS3(null);

  const cx = 400, cy = 400, R = 230;
  const N = LOOP_NODES.length;
  const positions = LOOP_NODES.map((_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  });

  // Auto-loop slowly — restarts at 0 after reaching 5
  uE3(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setYear(y => {
        const next = Math.round((y + 0.05) * 100) / 100;
        if (next > 5) return 0;
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [inView]);

  const valueAt = (n, y) => {
    const i = Math.min(4, Math.floor(y));
    const f = y - i;
    return Math.round(n.values[i] + (n.values[i+1] - n.values[i]) * f);
  };

  const focus = pinned ?? hovered;

  // arc paths
  const arcs = positions.map((p, i) => {
    const next = positions[(i + 1) % N];
    const mx = (p.x + next.x) / 2, my = (p.y + next.y) / 2;
    const dx = mx - cx, dy = my - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const k = 1.18;
    return { from: p, to: next, ctrlX: cx + (dx/dist) * dist * k, ctrlY: cy + (dy/dist) * dist * k };
  });

  // Arrow active strength based on year (each arrow lights at its year mark)
  const arrowOpacity = (i) => {
    const start = i * 0.6;
    const v = (year - start) / 0.8;
    return Math.max(0.18, Math.min(1, v));
  };

  const isArrowFocused = (i) => {
    if (focus === null) return null;
    if (i === focus) return "out";              // outgoing from focus
    if (i === (focus - 1 + N) % N) return "in"; // incoming to focus
    return false;
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Loop SVG */}
      <div className="relative w-full max-w-[680px] mx-auto">
        <svg viewBox="0 0 800 800" className="w-full h-auto">
          <defs>
            <marker id="loopHead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--accent)"/>
            </marker>
            <marker id="loopHeadBold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--accent)"/>
            </marker>
          </defs>

          {/* arrows */}
          {arcs.map((a, i) => {
            const d = `M ${a.from.x} ${a.from.y} Q ${a.ctrlX} ${a.ctrlY} ${a.to.x} ${a.to.y}`;
            const focusState = isArrowFocused(i);
            const baseOp = arrowOpacity(i);
            const op = focus === null ? baseOp : (focusState ? 1 : 0.12);
            const sw = focusState ? 4.5 : 2.5;
            const flowing = year > i * 0.6 && year < 5;

            // Particle position along the arc — moves continuously while flowing
            const tParticle = ((Date.now()/1500 + i*0.15) % 1);
            return (
              <g key={i} style={{transition:"opacity .35s ease"}}>
                <path d={d} fill="none" stroke="var(--accent)" strokeWidth={sw}
                  strokeDasharray="1000" strokeDashoffset={inView ? 0 : 1000}
                  style={{
                    opacity: op,
                    transition:`stroke-dashoffset 1.2s ease-out ${0.4 + i*0.18}s, opacity .35s, stroke-width .25s`
                  }}
                  markerEnd={focusState ? "url(#loopHeadBold)" : "url(#loopHead)"}/>

                {/* Animated flow particle */}
                {flowing && (
                  <circle r="5" fill="var(--accent)" opacity={op}>
                    <animateMotion dur={`${2.6 - Math.min(1.4, year*0.25)}s`} repeatCount="indefinite" path={d}/>
                  </circle>
                )}

                {/* + badge midpoint */}
                {(() => {
                  const t = 0.5;
                  const mx = (1-t)*(1-t)*a.from.x + 2*(1-t)*t*a.ctrlX + t*t*a.to.x;
                  const my = (1-t)*(1-t)*a.from.y + 2*(1-t)*t*a.ctrlY + t*t*a.to.y;
                  return (
                    <g style={{opacity: op*1.2, transition:"opacity .35s"}}>
                      <circle cx={mx} cy={my} r="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2"/>
                      <text x={mx} y={my+5} textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--accent)" className="font-display">+</text>
                    </g>
                  );
                })()}
              </g>
            );
          })}

          {/* nodes */}
          {positions.map((p, i) => {
            const node = LOOP_NODES[i];
            const v = valueAt(node, year);
            const v0 = node.values[0];
            const isFocus = focus === i;
            const dimmed = focus !== null && !isFocus;
            const r = isFocus ? 78 : 68;
            return (
              <g key={i}
                style={{
                  opacity: inView ? (dimmed ? 0.4 : 1) : 0,
                  transform: inView ? "scale(1)" : "scale(0.6)",
                  transformOrigin: `${p.x}px ${p.y}px`,
                  transition:`opacity .25s, transform .35s cubic-bezier(.5,1.6,.5,1) ${i*0.1}s`,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setPinned(pinned === i ? null : i)}>
                <circle cx={p.x} cy={p.y} r={r} fill="var(--bg)"
                  stroke={isFocus ? "var(--ink)" : "var(--accent)"} strokeWidth={isFocus ? 4 : 2.5}
                  style={{transition:"all .25s"}}/>
                <text x={p.x} y={p.y - 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)" className="font-display">{node.l}</text>
                <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize="26" fontWeight="900" fill="var(--accent)" className="font-display num-counter">
                  {v.toLocaleString()}
                </text>
                <text x={p.x} y={p.y + 22} textAnchor="middle" fontSize="10" fill="var(--ink)" opacity="0.6" className="font-mono">{node.unit}</text>
                {year > 0.2 && (
                  <text x={p.x} y={p.y + 38} textAnchor="middle" fontSize="10" fontWeight="700"
                    fill={v >= v0 ? "#2F5D4F" : "#A8362A"} className="font-mono">
                    {v >= v0 ? "+" : ""}{Math.round((v - v0) / v0 * 100)}%
                  </text>
                )}
              </g>
            );
          })}

          {/* center year */}
          <g style={{opacity: inView ? 1 : 0, transition:"opacity .8s ease-out 1.5s"}}>
            <text x={cx} y={cy+35} textAnchor="middle" fontSize="5vw" fontWeight="900" fill="var(--accent)" className="font-display">
              {year.toFixed(1)}
            </text>
            <text x={cx} y={cy+62} textAnchor="middle" fontSize="13" fill="var(--bg)" opacity="0.45" letterSpacing="3" className="font-mono">/ 5.0</text>
          </g>
        </svg>
      </div>

      {/* Hover detail panel */}
      <div className="max-w-[680px] mx-auto mt-6 px-2">
        <div className="rounded-md p-5 md:p-6 min-h-[140px] transition-colors"
          style={{
            background: "rgba(251,247,238,0.06)",
            border: "1px solid rgba(251,247,238,0.15)",
          }}>
          {focus === null ? (
            <div className="flex flex-col items-center justify-center h-[100px] gap-1.5">
              <div className="font-mono text-[11px] tracking-[0.2em]" style={{color:"rgba(251,247,238,0.5)"}}>
                HOVER · 滑過任一節點檢視因果
              </div>
              <div className="font-mono text-[11px] tracking-[0.15em]" style={{color:"rgba(251,247,238,0.4)"}}>
                ▶ 五年自動模擬循環中…
              </div>
            </div>
          ) : (() => {
            const n = LOOP_NODES[focus];
            const prev = LOOP_NODES[(focus - 1 + N) % N];
            const next = LOOP_NODES[(focus + 1) % N];
            const v = valueAt(n, year);
            return (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-black text-[24px]" style={{color:"var(--accent)"}}>{n.l}</span>
                    <span className="font-mono text-[11px] tracking-[0.15em]" style={{color:"rgba(251,247,238,0.55)"}}>{n.s}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-[36px] num-counter" style={{color:"#fff"}}>{v.toLocaleString()}</span>
                    <span className="font-mono text-[11px]" style={{color:"rgba(251,247,238,0.55)"}}>{n.unit}</span>
                    <span className="font-mono text-[12px] ml-2" style={{color:"#9bd9a4"}}>
                      Y0 → Y{year.toFixed(1)} · {n.values[0]} → {v}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 pt-3 border-t" style={{borderColor:"rgba(251,247,238,0.15)"}}>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.2em] mb-1.5" style={{color:"rgba(251,247,238,0.5)"}}>← 由「{prev.l}」驅動</div>
                    <p className="text-[13px] leading-[1.65]" style={{color:"rgba(251,247,238,0.85)"}}>{n.why}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.2em] mb-1.5" style={{color:"rgba(251,247,238,0.5)"}}>→ 驅動「{next.l}」</div>
                    <p className="text-[13px] leading-[1.65]" style={{color:"rgba(251,247,238,0.85)"}}>{n.drives}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

function LoopSection() {
  return (
    <section id="loop" data-section="loop" className="relative py-20 md:py-32 px-6 md:px-12" style={{background: "var(--ink)", color: "var(--bg)"}}>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <Label num="05" className="!text-[rgba(251,247,238,0.65)]">FEEDBACK · 自我強化迴路</Label>
          <h2 className="font-display font-black t-h2 mt-4 max-w-[820px]">
            一個能<span className="italic" style={{color:"var(--accent)"}}>自己長大</span>的迴路。
          </h2>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.75]" style={{color:"rgba(251,247,238,0.8)"}}>
            改造的價值不在某一階段的單點改善，而在讓六個節點彼此餵養 — 環境讓人停留，停留帶來消費，消費讓攤商敢投資，投資再回到環境。
          </p>
        </Reveal>

        <div className="mt-12">
          <CausalLoop/>
        </div>

        <div className="mt-12 text-center">
          <p className="font-display italic text-[clamp(1.1rem,1.7vw,1.75rem)]" style={{color:"rgba(251,247,238,0.85)"}}>
            「停留是設計能介入的最早一個槓桿。」
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ [6] SDG MAPPING ============
const SDGS = [
  {
    n: 8, t: "尊嚴就業與經濟成長", c: "sdg-8", img: "img/sdg-8.png",
    desc: "促進包容和永續的經濟成長、就業及人人有尊嚴的工作。",
    why: "212 個攤商透過環境升級延長停留時間，直接帶動營收與就業穩定；攤商家庭得以在公館核心商圈持續經營下去，避免被連鎖品牌取代。",
  },
  {
    n: 9, t: "產業創新與基礎建設", c: "sdg-9", img: "img/sdg-9.png",
    desc: "建立具韌性的基礎設施，促進包容與永續的工業化，並推動創新。",
    why: "排煙、排水、餐盤回收與數位支付系統翻新，把 1980 年的硬體升級為現代基礎建設；以最小工程介入完成最大效能更新，是中小型公有市場的可複製範本。",
  },
  {
    n: 11, t: "永續城市與社區", c: "sdg-11", img: "img/sdg-11.png",
    desc: "建立具包容、安全、韌性及永續特質的城市與人類社區。",
    why: "在不破壞低租金結構、不百貨公司化的前提下，讓公館核心商圈的傳統市場與社區共存共榮，保留庶民日常與文化記憶。",
  },
  {
    n: 12, t: "責任消費與生產", c: "sdg-12", img: "img/sdg-12.png",
    desc: "確保永續的消費與生產模式。",
    why: "統一餐盤、集中清洗、生熟食分流降低廢水與一次性餐具，建立可複製到其他傳統市場的節能減廢模式。",
  },
];

function SDGCard({ s, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${s.c} rounded-md text-left w-full h-full flex flex-col p-6 transition-all duration-300 cursor-pointer relative`}
      style={{
        color: "#fff",
        boxShadow: active ? "0 12px 32px -8px rgba(0,0,0,0.4)" : "none",
        transform: active ? "translateY(-4px)" : "none",
        outline: active ? "3px solid var(--ink)" : "none",
        outlineOffset: active ? 4 : 0,
      }}
      aria-pressed={active}>
      <div className="flex items-baseline justify-between">
        <span className="font-display font-black text-[clamp(2.5rem,4vw,4rem)] leading-none">{s.n}</span>
        <span className="font-mono text-[10px] tracking-[0.2em] opacity-80">SDG</span>
      </div>
      <div className="mt-4 font-display font-bold text-[18px] leading-[1.3]">{s.t}</div>
      <div className="mt-auto pt-6 flex items-center gap-2 text-[11px] font-mono tracking-[0.15em] opacity-85">
        <span style={{
          width:16, height:16, borderRadius:9999, border:"1.5px solid rgba(255,255,255,0.7)",
          display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, lineHeight:1,
        }}>{active ? "−" : "+"}</span>
        <span>{active ? "已選取" : "查看細節"}</span>
      </div>
    </button>
  );
}

function SDGDetail({ s }) {
  if (!s) return null;
  return (
    <div className="mt-6 grid md:grid-cols-12 gap-6 rounded-md overflow-hidden border-2 border-ink/15 card-warm">
      {s.img && (
        <div className="md:col-span-5 relative min-h-[240px] md:min-h-[300px]" style={{background:"#222"}}>
          <img src={s.img} alt={`SDG ${s.n} 視覺`} className="absolute inset-0 w-full h-full object-cover"/>
          <div className={`${s.c} absolute top-4 left-4 px-3 py-1.5 rounded-sm font-mono text-[11px] tracking-[0.15em]`} style={{color:"#fff"}}>
            SDG {s.n}
          </div>
        </div>
      )}
      <div className={`${s.img ? 'md:col-span-7' : 'md:col-span-12'} p-6 md:p-8`}>
        <div className="flex items-baseline gap-3">
          <span className={`${s.c} font-display font-black text-[clamp(1.8rem,2.5vw,2.5rem)] leading-none px-3 rounded-sm`} style={{color:"#fff"}}>{s.n}</span>
          <span className="font-display font-bold text-[clamp(1rem,1.4vw,1.375rem)]">{s.t}</span>
        </div>
        <div className="mt-5">
          <div className="font-mono text-[10px] tracking-[0.2em] text-muted mb-1.5">指標定義</div>
          <p className="text-[14px] leading-[1.7] text-ink/85">{s.desc}</p>
        </div>
        <div className="mt-4">
          <div className="font-mono text-[10px] tracking-[0.2em] text-muted mb-1.5">本案如何對應</div>
          <p className="text-[14.5px] leading-[1.75] text-ink/90">{s.why}</p>
        </div>
      </div>
    </div>
  );
}

function SDGSection() {
  const [open, setOpen] = uS3(0);
  return (
    <Section id="sdg" className="bg-paper">
      <Reveal>
        <Label num="06">ALIGNMENT · SDG 對應</Label>
        <h2 className="font-display font-black t-h2 mt-4 max-w-[820px]">
          對齊聯合國<span className="text-accent">永續發展目標</span>。
        </h2>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {SDGS.map((s, i) => (
          <Reveal key={i} delay={i*80}>
            <SDGCard s={s} active={open === i} onClick={() => setOpen(i)}/>
          </Reveal>
        ))}
      </div>

      <SDGDetail s={open !== null ? SDGS[open] : null}/>

      <div className="mt-3 text-[12px] font-mono tracking-[0.15em] text-muted text-center">
        點擊任一指標卡，下方面板會切換對應內容
      </div>

      <div className="mt-16 p-7 md:p-10 rounded-md card-warm">
        <Reveal>
          <Label>STRUCTURAL · 結構性原則</Label>
          <div className="mt-5 font-display font-black text-[28px] md:text-[clamp(1.8rem,2.5vw,2.5rem)] leading-[1.3] flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--warn)", color:"var(--bg)"}}>不破壞低租金結構</span>
            <span className="text-muted text-[24px] md:text-[32px]">×</span>
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--accent)", color:"var(--bg)"}}>不犧牲學生客群</span>
            <span className="text-muted text-[24px] md:text-[32px]">×</span>
            <span className="px-3 py-1 rounded-sm" style={{background:"var(--ink)", color:"var(--bg)"}}>不百貨公司化</span>
          </div>
          <p className="mt-5 max-w-[65ch] text-ink/80 leading-[1.75]">
            水源市場應明確區隔於南門市場的外省熟食文化定位，
            強化「<strong>公館人的便利日常</strong>」這一核心敘事 —
            填補路邊攤（缺乏舒適環境）與南門市場（距離較遠）之間的市場空缺。
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ============ [7] CTA / FOOTER ============
function CTASection() {
  return (
    <section id="cta" data-section="cta" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden" style={{background:"var(--surface)"}}>
      {/* facade motif strip */}
      <div className="absolute top-0 left-0 right-0 t-h2" style={{
        background: "repeating-linear-gradient(90deg, #1f74c4 0 18px, #d65a8e 18px 30px, #8e5fb5 30px 48px, #f0a0c5 48px 60px, #5fa6d5 60px 78px)"
      }}></div>

      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <h2 className="font-display font-black text-[clamp(1.8rem,2.5vw,2.625rem)] md:text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-tight">
            改造一座市場，<br/>
            留下<span className="italic text-accent">一個社區</span>。
          </h2>
          <p className="mt-8 max-w-[70ch] text-[clamp(1rem,1.4vw,1.5rem)] leading-[1.85] text-ink/85">
            水源市場不需要變成南門市場，也不需要變成百貨公司——它需要被理解為公館人的日常基礎設施，在這座城市裡已經默默運作 46 年，而下一步，是讓它再被看見。
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-10 pt-10 border-t border-ink/15">
          <Reveal>
            <Label>AUTHORS</Label>
            <div className="mt-3 font-display font-bold text-[16px]">郝思澄 · 陳品睿 · 林子佑</div>
            <div className="mt-1 text-[13px] text-muted">SDGs 未來城市規劃師提案 · 2026</div>
          </Reveal>
          <Reveal delay={80}>
            <Label>SITE</Label>
            <div className="mt-3 font-display font-bold text-[16px]">臺北市公有水源市場</div>
            <div className="mt-1 text-[13px] text-muted">中正區羅斯福路四段 92 號 1–2F · 共 212 攤</div>
          </Reveal>
          <Reveal delay={160}>
            <Label>CITATIONS</Label>
            <ul className="mt-3 text-[13px] space-y-1.5 text-ink/80">
              <li>Mehrabian &amp; Russell (1974)</li>
              <li>Path Intelligence UK Study (2007)</li>
              <li>Retail Sensing (2020)</li>
              <li>南門市場改建案 (2023)</li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-muted">
          <span>© 2026 · 一場關於停留的提案</span>
          <span>BUILT FOR SDG URBAN PLANNING · TAIPEI</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LoopSection, SDGSection, CTASection });
