// Section · Field Evidence · 南門案例研究
const { useState: uSE, useEffect: uEE } = React;

const NANMEN_QUOTES = [
  {
    n: "A",
    theme: "硬體感受",
    timestamp: "0:08–0:24",
    quote: "改建前天花板比較低，它的空氣品質與環境感覺就沒有那麼舒服…現在不同的裝置都達到了一流的水準。",
    mapsTo: "Tier 1 衛生底線重建 · 通風、廁所翻修、照明",
  },
  {
    n: "B",
    theme: "管理透明化",
    timestamp: "0:37–0:46",
    quote: "現在分工分得很細，電工或水電的部分，它都分得很專業…像以前可能透過紅包，或是由特定單位在負責。",
    mapsTo: "新建議 · 公開招標、外部稽核、攤商代表會（補強 Tier 3）",
  },
  {
    n: "C",
    theme: "中繼安排",
    timestamp: "1:43–1:48",
    quote: "中間的過渡市場也是市政府的安排…據我們觀察，這樣的安排都是很成功的，而且裝置又好。",
    mapsTo: "新建議 · 改建期間中繼市場規劃（見 §三層解方/補充）",
  },
  {
    n: "D",
    theme: "決定性因素",
    timestamp: "3:20",
    quote: "主要是看攤商跟政府配合的程度，那是一個決定性的因素。",
    mapsTo: "結構性原則第 4 條 · 攤商共識先行",
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
          <dd>臺北市公有南門市場（Nanmen Public Market）<br/>
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
          <dd>多次現場非結構化對話與觀察（未錄音）</dd>
        </div>
      </dl>

      <div className="mt-5 pt-4 border-t border-ink/15">
        <div className="font-mono text-[11px] tracking-[0.15em] text-muted mb-2">研究設計</div>
        <p className="text-[13px] leading-[1.65] text-ink/85">
          採「<strong>比較案例研究</strong>」（comparative case study）— 訪問已完成改建的南門市場攤商，
          擷取改建後成功要素與轉場期經驗，作為水源市場改建設計的依據，而非以水源攤商為對象的問卷調查。
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-ink/15">
        <div className="font-mono text-[11px] tracking-[0.15em] text-muted mb-2">限制</div>
        <p className="text-[13px] leading-[1.65] text-ink/85">
          樣本數小（N=1 結構化錄音）；本研究不主張統計推論，
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
          在「<span className="text-accent">成功改建</span>」的市場現場，攤商怎麼說？
        </h2>
        <p className="mt-6 max-w-[65ch] text-[18px] leading-[1.75] text-ink/85">
          我們前往已完成改建的<strong>南門市場</strong>，採訪資深攤商，
          蒐集改建前後的第一手對照、轉場期經驗，以及攤商眼中「改建成功的決定性因素」。
          每段引用皆為原文逐字稿，並對應水源改建提案的具體設計選擇。
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
