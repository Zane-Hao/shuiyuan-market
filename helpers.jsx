// Shared helpers + hooks
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// One-shot intersection observer hook
function useInView(opts = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (opts.once !== false) io.unobserve(el);
          } else if (opts.once === false) {
            setInView(false);
          }
        });
      },
      { threshold: opts.threshold ?? 0.25, rootMargin: opts.rootMargin ?? "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Animated number counter
function useCounter(target, { duration = 1400, start = 0, decimals = 0 } = {}, trigger) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      // ease-out cubic
      const e = 1 - Math.pow(1 - k, 3);
      const v = start + (target - start) * e;
      setValue(decimals ? +v.toFixed(decimals) : Math.round(v));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger]);
  return value;
}

// Reveal wrapper
function Reveal({ children, delay = 0, className = "", as: As = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <As
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

// Label small caps
function Label({ children, className = "", num }) {
  return (
    <div className={`label-sm flex items-center gap-3 ${className}`}>
      {num != null && <span className="text-accent font-mono font-bold">{num}</span>}
      <span className="h-px w-8 bg-current opacity-40"></span>
      <span>{children}</span>
    </div>
  );
}

// Section wrapper
function Section({ id, className = "", children, dark = false }) {
  return (
    <section
      id={id}
      data-section={id}
      className={`relative py-20 md:py-32 px-6 md:px-12 ${dark ? "text-paper" : ""} ${className}`}
      style={dark ? { background: "var(--ink)", color: "var(--bg)" } : {}}
    >
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </section>
  );
}

// Lucide-like icons (inline SVG; we don't pull lucide-react to keep the bundle simple)
const Icon = {
  Wind: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M17.73 17.73A2.5 2.5 0 1 1 19.5 14H2"/><path d="M14.41 4.59A2 2 0 1 0 13 8h7"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Footprint: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="4" cy="6" r="2"/><circle cx="9" cy="3" r="1.5"/><circle cx="14" cy="3.5" r="1.5"/><circle cx="18" cy="6" r="2"/>
      <path d="M5 11c0 4 3 4 3 8 0 1.5 -1 2 -2 2s-2-.5 -2-2c0-3 1-4 1-8z"/>
      <path d="M19 11c0 4-3 4-3 8 0 1.5 1 2 2 2s2-.5 2-2c0-3-1-4-1-8z"/>
    </svg>
  ),
  Droplet: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2.5s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z"/>
    </svg>
  ),
  Bulb: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3v1h6v-1c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>
    </svg>
  ),
  Plate: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>
    </svg>
  ),
  Chair: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 14V4h12v10"/><path d="M4 14h16v3H4z"/><path d="M7 17v4"/><path d="M17 17v4"/>
    </svg>
  ),
  Split: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v18"/><path d="M5 8c2 0 3 2 3 4s-1 4-3 4"/><path d="M19 8c-2 0-3 2-3 4s1 4 3 4"/>
    </svg>
  ),
  Compass: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-4 0 2-6z" fill="currentColor"/>
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v6"/><path d="M12 15v6"/><path d="M3 12h6"/><path d="M15 12h6"/><path d="m6 6 3 3"/><path d="m15 15 3 3"/><path d="m18 6-3 3"/><path d="m9 15-3 3"/>
    </svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14"/><path d="M5 12h14"/>
    </svg>
  ),
  Camera: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.5 4h-5l-2 3H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Bag: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 7h14l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>
    </svg>
  ),
  Backpack: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M9 4V2h6v2"/><path d="M5 13h14"/>
    </svg>
  ),
};

Object.assign(window, { useInView, useCounter, Reveal, Label, Section, Icon });
