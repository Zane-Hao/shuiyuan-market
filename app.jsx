// App entry — composes sections, wires top progress bar + mini-nav
const { useEffect: uEm, useState: uSm } = React;

function ProposalSite() {
  // top progress bar via scrollY
  uEm(() => {
    const bar = document.getElementById("progress-bar");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const k = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = `scaleX(${k})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mini-nav active dot via scroll position (more reliable than IntersectionObserver)
  uEm(() => {
    const items = document.querySelectorAll("#mini-nav .mini-item");
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length || !items.length) return;

    const map = {};
    sections.forEach((s) => { map[s.dataset.section] = s; });

    items.forEach((d) => {
      d.addEventListener("click", () => {
        const t = map[d.dataset.target];
        if (t) window.scrollTo({ top: t.offsetTop - 20, behavior: "smooth" });
      });
    });

    // Active-section detection: pick the section whose top is just above viewport's 35% line
    const updateActive = () => {
      const probe = window.innerHeight * 0.35;
      let activeId = sections[0].dataset.section;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe) activeId = s.dataset.section;
        else break;
      }
      items.forEach((d) => {
        d.classList.toggle("active", d.dataset.target === activeId);
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
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
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProposalSite />);
