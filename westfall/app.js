(() => {
  const menuToggle = document.querySelector(".wf-menu-toggle");
  const nav = document.querySelector(".wf-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
  }

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const selector = group.getAttribute("data-filter-target");
    if (!selector) return;
    const buttons = [...group.querySelectorAll("[data-filter]")];
    const cards = [...document.querySelectorAll(selector)];
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        cards.forEach((card) => {
          const category = card.getAttribute("data-category") || "";
          const show = filter === "all" || category.includes(filter);
          card.toggleAttribute("hidden", !show);
        });
      });
    });
  });

  const status = document.querySelector("[data-track-status]");
  document.querySelectorAll("[data-track]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-track]").forEach((item) => item.classList.toggle("is-active", item === button));
      if (status) status.textContent = "Now cueing " + button.getAttribute("data-track");
    });
  });
})();
