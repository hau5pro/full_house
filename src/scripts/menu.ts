function getHeader(): HTMLElement | null {
  return document.querySelector(".site-header");
}

function getMenu(): HTMLElement | null {
  return document.querySelector(".header-menu");
}

function getToggle(): HTMLButtonElement | null {
  return document.querySelector(".menu-toggle");
}

function isOpen(): boolean {
  return getHeader()?.classList.contains("menu-open") ?? false;
}

export function closeMenu(): void {
  const header = getHeader();
  const menu = getMenu();
  const toggle = getToggle();
  if (!header) return;
  if (menu) {
    const height = menu.getBoundingClientRect().height;
    menu.style.overflow = "hidden";
    menu.style.height = height + "px";
    requestAnimationFrame(() => {
      menu.style.height = "0";
    });
  }
  header.classList.remove("menu-open");
  toggle?.setAttribute("aria-expanded", "false");
}

function openMenu(): void {
  const header = getHeader();
  const menu = getMenu();
  const toggle = getToggle();
  if (!header) return;
  header.classList.add("menu-open");
  toggle?.setAttribute("aria-expanded", "true");
  if (menu) {
    menu.style.overflow = "hidden";
    menu.style.height = menu.scrollHeight + "px";
    menu.addEventListener(
      "transitionend",
      () => {
        if (isOpen()) {
          menu.style.height = "auto";
          // Allow overflow so the search drawer can appear outside the menu
          menu.style.overflow = "visible";
        }
      },
      { once: true },
    );
  }
}

document.addEventListener("click", (e) => {
  const target = e.target as Element;

  if (target.closest(".menu-toggle")) {
    if (isOpen()) closeMenu(); else openMenu();
    return;
  }

  if (target.closest(".cat-link")) {
    closeMenu();
    return;
  }

  // Close when clicking outside the header
  const header = getHeader();
  if (header && !header.contains(target)) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Close before view transitions so persisted header doesn't carry open state
document.addEventListener("astro:before-preparation", () => {
  const header = getHeader();
  const menu = getMenu();
  const toggle = getToggle();
  if (header) header.classList.remove("menu-open");
  if (menu) { menu.style.overflow = "hidden"; menu.style.height = "0"; }
  if (toggle) toggle.setAttribute("aria-expanded", "false");
});
