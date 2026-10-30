(() => {
  const langs = ["en", "tr", "ar"];
  const stored = localStorage.getItem("thameco-lang");
  const initial = langs.includes(stored) ? stored : "en";

  function apply(lang) {
    localStorage.setItem("thameco-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const title = document.documentElement.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.children.length) return;
      el.textContent = el.getAttribute("data-" + lang) || el.getAttribute("data-en");
    });
    document.querySelectorAll("[data-en-aria-label], [data-en-title], [data-en-alt]").forEach((el) => {
      ["aria-label", "title", "alt"].forEach((attr) => {
        const english = el.getAttribute("data-en-" + attr);
        if (!english) return;
        el.setAttribute(attr, el.getAttribute("data-" + lang + "-" + attr) || english);
      });
    });
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const on = btn.dataset.setLang === lang;
      const stacked = btn.classList.contains("border-b");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("text-teal", on);
      btn.classList.toggle(stacked ? "text-fog/65" : "text-fog/55", !on);
      btn.classList.toggle("hover:text-fog", !on);
    });
    document.dispatchEvent(new CustomEvent("thameco:lang", { detail: lang }));
  }

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.setLang));
  });

  const header = document.querySelector(".site-header");
  const utility = document.querySelector(".site-utility-bar");
  const progress = header && header.querySelector(".origin-left");
  function onScroll() {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("glass", y > 32);
      header.classList.toggle("shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]", y > 32);
      header.classList.toggle("bg-transparent", y <= 32);
    }
    if (utility) {
      utility.classList.toggle("max-h-0", y > 32);
      utility.classList.toggle("opacity-0", y > 32);
      utility.classList.toggle("max-h-12", y <= 32);
      utility.classList.toggle("opacity-100", y <= 32);
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(1, y / max) * 100 : 0) + "%";
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  const dialog = document.querySelector(".site-mobile-dialog");
  const openBtn = document.querySelector(".site-mobile-actions > button");
  const closeBtn = dialog && dialog.querySelector("[data-menu='close']");
  function setMenu(open) {
    if (!dialog || !openBtn) return;
    dialog.classList.toggle("pointer-events-auto", open);
    dialog.classList.toggle("opacity-100", open);
    dialog.classList.toggle("pointer-events-none", !open);
    dialog.classList.toggle("opacity-0", !open);
    dialog.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (openBtn) openBtn.addEventListener("click", () => setMenu(openBtn.getAttribute("aria-expanded") !== "true"));
  if (closeBtn) closeBtn.addEventListener("click", () => setMenu(false));
  if (dialog) dialog.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const reveals = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach((node) => node.classList.add("is-in"));
  } else if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((node) => observer.observe(node));
  }

  const top = document.querySelector("footer button");
  if (top) {
    top.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  const scene = document.querySelector(".aevum-mascot-scene");
  if (scene && window.ThamecoMascot) window.ThamecoMascot.mount(scene);

  apply(initial);
})();
