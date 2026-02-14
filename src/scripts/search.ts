const ACTIVE_CLASS = "pagefind-ui__result--active";

function getInput() {
  return document.querySelector<HTMLInputElement>(".pagefind-ui__search-input");
}

function getResults() {
  return Array.from(document.querySelectorAll<HTMLElement>(".pagefind-ui__result"));
}

function getActiveIndex(results: HTMLElement[]) {
  return results.findIndex((r) => r.classList.contains(ACTIVE_CLASS));
}

function setActive(results: HTMLElement[], index: number) {
  results.forEach((r) => r.classList.remove(ACTIVE_CLASS));
  if (index >= 0 && index < results.length) {
    results[index].classList.add(ACTIVE_CLASS);
    results[index].scrollIntoView({ block: "nearest" });
  }
}

const isMac = navigator.platform.toUpperCase().includes("MAC");
const input = getInput();
if (input) input.placeholder = isMac ? "⌘K" : "Ctrl+K";

document.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(".pagefind-ui__result-link");
  if (!link) return;
  const clear = document.querySelector<HTMLButtonElement>(".pagefind-ui__search-clear");
  if (clear) clear.click();
  getInput()?.blur();
});

document.addEventListener("keydown", (e) => {
  const input = getInput();
  if (!input) return;

  // Ctrl+K / Cmd+K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    input.focus();
    return;
  }

  // Only handle remaining shortcuts when search is focused
  if (!document.activeElement || !input.closest(".header-search")?.contains(document.activeElement)) {
    if (document.activeElement !== input) return;
  }

  const results = getResults();
  const active = getActiveIndex(results);

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActive(results, Math.min(active + 1, results.length - 1));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActive(results, Math.max(active - 1, 0));
  } else if (e.key === "Enter" && active >= 0) {
    e.preventDefault();
    const link = results[active].querySelector<HTMLAnchorElement>(".pagefind-ui__result-link");
    if (link) window.location.href = link.href;
  } else if (e.key === "Escape") {
    e.preventDefault();
    const clear = document.querySelector<HTMLButtonElement>(".pagefind-ui__search-clear");
    if (clear) clear.click();
    input.blur();
  }
});
