(() => {
  const words = {
    en: { instruction: "Scroll to connect the next country", complete: "All seven destinations connected" },
    tr: { instruction: "Sıradaki ülkeye bağlanmak için kaydırın", complete: "Yedi varış noktasına bağlantı tamamlandı" },
    ar: { instruction: "مرر لربط الدولة التالية", complete: "اكتمل الاتصال بالوجهات السبع" }
  };
  let stopHero = null;
  let stopMap = null;

  function paint(lang, state) {
    const copy = words[lang] || words.en;
    const names = window.ThamecoRouteMap.names[lang] || window.ThamecoRouteMap.names.en;
    const name = document.querySelector(".coverage-current-name");
    const status = document.querySelector(".coverage-status");
    const step = document.querySelector(".coverage-step-line span[dir='ltr']");
    const count = document.querySelector(".coverage-list-label span[dir='ltr']");
    if (name) name.textContent = names[state.index];
    if (status) status.textContent = state.arrived === 7 ? copy.complete : copy.instruction;
    if (step) step.textContent = String(state.index + 1).padStart(2, "0") + " / 07";
    if (count) count.textContent = String(state.arrived) + " / 7";
  }

  async function mount(lang) {
    if (stopHero) stopHero();
    if (stopMap) stopMap();
    stopHero = null;
    stopMap = null;
    const hero = document.querySelector("[data-testid='saved-v3-hero']");
    const map = document.querySelector(".accurate-route-map");
    if (hero && window.ThamecoV3Hero) stopHero = await window.ThamecoV3Hero.mount(hero, lang);
    const controls = document.querySelector(".coverage-route-controls");
    if (controls) controls.replaceChildren();
    if (map) map.replaceChildren();
    if (map && window.ThamecoRouteMap) {
      stopMap = await window.ThamecoRouteMap.mount(map, {
        lang,
        onProgress: (state) => paint(lang, state)
      });
    }
  }

  function copyLang(from, to) {
    ["en", "tr", "ar"].forEach((lang) => {
      const value = from.getAttribute("data-" + lang);
      if (value) to.setAttribute("data-" + lang, value);
    });
    to.textContent = from.textContent;
  }

  function wireExpedition() {
    const panel = document.querySelector("img[data-en-alt='Trucking Expedition']");
    const frame = panel && panel.parentElement;
    const grid = frame && frame.closest(".mt-10");
    if (!frame || !grid) return;
    const buttons = [...grid.querySelectorAll("ul > li > button")];
    const images = [...frame.querySelectorAll("img")];
    const counter = frame.querySelector(".text-fog\\/60");
    const caption = frame.querySelector(".absolute.inset-x-0.bottom-0 p");
    const bar = frame.querySelector(".mt-4 .bg-teal");
    const iconOn = "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 border-teal bg-teal/10 text-teal";
    const iconOff = "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 border-fog/15 text-mist/55";
    const labelOn = "font-display block text-[1.5rem] leading-tight transition-colors duration-500 sm:text-[1.9rem] text-fog";
    const labelOff = "font-display block text-[1.5rem] leading-tight transition-colors duration-500 sm:text-[1.9rem] text-fog/55 group-hover:text-fog/80";

    function select(index) {
      buttons.forEach((button, i) => {
        const on = i === index;
        button.setAttribute("aria-pressed", on ? "true" : "false");
        const icon = button.firstElementChild;
        if (icon) icon.className = on ? iconOn : iconOff;
        const label = button.querySelector("span.font-display");
        if (label) label.className = on ? labelOn : labelOff;
        const tick = button.querySelector("span.bg-teal");
        if (tick) tick.className = "block h-px bg-teal transition-all duration-700 " + (on ? "w-full" : "w-0");
      });
      images.forEach((img, i) => {
        const on = i === index;
        img.classList.toggle("scale-100", on);
        img.classList.toggle("opacity-100", on);
        img.classList.toggle("scale-105", !on);
        img.classList.toggle("opacity-0", !on);
      });
      const label = buttons[index] && buttons[index].querySelector("span.font-display");
      if (caption && label) copyLang(label, caption);
      if (counter) counter.textContent = "0" + (index + 1) + " / 03";
      if (bar) bar.style.width = ((index + 1) / 3 * 100) + "%";
    }

    buttons.forEach((button, i) => {
      button.addEventListener("mouseenter", () => select(i));
      button.addEventListener("focus", () => select(i));
      button.addEventListener("click", () => select(i));
    });
  }

  function wireProcess() {
    const stage = document.querySelector("#process [style*='330vh']");
    if (!stage) return;
    const slides = [...stage.querySelectorAll(":scope > .sticky > .absolute.inset-0 > .absolute.inset-0")].filter((node) => node.querySelector("img"));
    const items = [...stage.querySelectorAll("ol > li")];
    const counter = stage.querySelector(".tracking-\\[0\\.28em\\]");
    const caption = stage.querySelector("p.italic");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function apply(index, progress) {
      stage.style.setProperty("--p", String(progress));
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.style.opacity = on ? "1" : "0";
        slide.style.transform = "scale(" + (on ? "1.04" : "1.09") + ")";
        slide.style.zIndex = on ? "1" : "0";
      });
      items.forEach((item, i) => {
        const on = i === index;
        item.classList.toggle("bg-gradient-to-r", on);
        item.classList.toggle("from-deep/50", on);
        item.classList.toggle("to-transparent", on);
        const bars = [...item.children].filter((node) => node.tagName === "SPAN");
        if (bars[0]) bars[0].className = "absolute inset-y-0 start-0 w-px transition-colors duration-500 " + (on ? "bg-teal" : "bg-fog/20");
        if (bars[1]) bars[1].className = "absolute start-0 top-0 h-px transition-all duration-700 " + (on ? "w-6 bg-teal" : "w-0 bg-transparent");
        const num = item.querySelector("span.font-sans");
        if (num) num.className = "font-sans text-[0.62rem] tracking-[0.2em] " + (on ? "text-teal" : "text-mist/45");
        const title = item.querySelector("h3");
        if (title) title.className = "font-display text-[1.55rem] leading-tight transition-colors duration-500 " + (on ? "text-fog" : "text-fog/60");
        const body = item.querySelector("p");
        if (body) body.className = "mt-2 max-w-[46ch] text-[0.86rem] leading-relaxed transition-colors duration-500 " + (on ? "text-mist/90" : "text-mist/45");
      });
      if (counter) counter.textContent = "0" + (index + 1) + " / 03";
      const title = items[index] && items[index].querySelector("h3");
      if (caption && title) copyLang(title, caption);
    }

    function tick() {
      frame = 0;
      if (reduced.matches || window.innerWidth < 768) return;
      const box = stage.getBoundingClientRect();
      const span = Math.max(1, box.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -box.top / span));
      apply(Math.min(slides.length - 1, Math.floor(progress * slides.length)), progress);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  document.documentElement.dataset.page = "index";
  wireExpedition();
  wireProcess();
  mount(document.documentElement.lang || "en");
  document.addEventListener("thameco:lang", (event) => mount(event.detail));
})();
