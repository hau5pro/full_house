import { fractions } from "../infrastructure/fractions";
import { MAX_SCALE_MULTIPLIER } from "../infrastructure/constants";

const COMMON_FRACS: [number, string][] = Object.entries(fractions).map(
  ([k, v]) => {
    const [num, den] = k.split("/").map(Number);
    return [num / den, v];
  },
);

// Reverse map: unicode char → numeric value (e.g. "½" → 0.5)
const FRAC_VALUES: Record<string, number> = Object.fromEntries(
  Object.entries(fractions).map(([k, v]) => {
    const [num, den] = k.split("/").map(Number);
    return [v, num / den];
  }),
);

const UNICODE_FRAC_RE = new RegExp(
  `^(\\d+)?(${Object.values(fractions).join("|")})`,
);

function formatQty(n: number): string {
  if (n <= 0) return "0";
  const whole = Math.floor(n);
  const frac = n - whole;
  if (frac < 0.04) return whole ? String(whole) : "0";
  if (frac > 0.96) return String(whole + 1);
  const nearest = COMMON_FRACS.reduce((a, b) =>
    Math.abs(b[0] - frac) < Math.abs(a[0] - frac) ? b : a,
  );
  return whole === 0 ? nearest[1] : `${whole}${nearest[1]}`;
}

interface QtyMatch {
  raw: string;
  origA: number;
  origB?: number;
}

function matchQty(text: string): QtyMatch | null {
  const range = text.match(/^(\d+\.?\d*)-(\d+\.?\d*)/);
  if (range)
    return {
      raw: range[0],
      origA: parseFloat(range[1]),
      origB: parseFloat(range[2]),
    };
  // Unicode fraction, with optional leading whole number: "½", "1½", "2¼"
  const unicode = text.match(UNICODE_FRAC_RE);
  if (unicode) {
    const whole = unicode[1] ? parseInt(unicode[1]) : 0;
    return { raw: unicode[0], origA: whole + FRAC_VALUES[unicode[2]] };
  }
  const mixed = text.match(/^(\d+)\s+(\d+)\/(\d+)/);
  if (mixed)
    return {
      raw: mixed[0],
      origA: parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]),
    };
  const frac = text.match(/^(\d+)\/(\d+)/);
  if (frac)
    return { raw: frac[0], origA: parseInt(frac[1]) / parseInt(frac[2]) };
  const num = text.match(/^(\d+\.?\d*)/);
  if (num) return { raw: num[0], origA: parseFloat(num[1]) };
  return null;
}

function wrapQty(li: HTMLElement): void {
  let textNode: Text | null = null;
  for (const node of Array.from(li.childNodes)) {
    if (node.nodeType === 3 && (node as Text).data.trim()) {
      textNode = node as Text;
      break;
    }
  }

  if (!textNode) return;

  const raw = textNode.data;
  const trimmed = raw.trimStart();
  const match = matchQty(trimmed);

  if (!match) return;

  const prefix = raw.slice(0, raw.length - trimmed.length);
  const suffix = trimmed.slice(match.raw.length);

  const span = document.createElement("span");
  span.dataset.origA = String(match.origA);
  if (match.origB !== undefined) span.dataset.origB = String(match.origB);
  span.textContent = match.raw;

  const parent = textNode.parentNode!;
  if (prefix) parent.insertBefore(document.createTextNode(prefix), textNode);
  parent.insertBefore(span, textNode);
  if (suffix) parent.insertBefore(document.createTextNode(suffix), textNode);
  parent.removeChild(textNode);

}

function applySpan(span: HTMLElement, factor: number): void {
  const a = parseFloat(span.dataset.origA!);
  const b =
    span.dataset.origB !== undefined
      ? parseFloat(span.dataset.origB)
      : undefined;
  span.textContent =
    b !== undefined
      ? `${formatQty(a * factor)}-${formatQty(b * factor)}`
      : formatQty(a * factor);
}

function getIngredientLis(prose: HTMLElement): HTMLElement[] {
  const headings = Array.from(prose.querySelectorAll<HTMLElement>("h2"));
  const ingredientsH2 = headings.find(
    (h) => h.textContent?.trim() === "Ingredients",
  );
  const directionsH2 = headings.find(
    (h) => h.textContent?.trim() === "Directions",
  );

  if (!ingredientsH2 || !directionsH2) return [];

  const result: HTMLElement[] = [];
  let node = ingredientsH2.nextElementSibling;
  while (node && node !== directionsH2) {
    if (node.tagName === "UL") {
      result.push(...Array.from(node.querySelectorAll<HTMLElement>("li")));
    }
    node = node.nextElementSibling;
  }

  return result;
}

function initScaling(): void {
  const stepper = document.querySelector<HTMLElement>(".servings-stepper");
  const prose = document.querySelector<HTMLElement>(".prose");

  if (!stepper || !prose) return;

  const originalServings = parseInt(stepper.dataset.original!);
  const lis = getIngredientLis(prose);

  for (const li of lis) {
    wrapQty(li);
  }

  function applyScale(currentServings: number): void {
    const factor = currentServings / originalServings;
    const valueEl = stepper!.querySelector<HTMLElement>(".stepper-value");
    if (valueEl) valueEl.textContent = String(currentServings);
    stepper!.dataset.current = String(currentServings);

    for (const li of lis) {
      for (const span of Array.from(li.querySelectorAll<HTMLElement>("span[data-orig-a]"))) {
        applySpan(span, factor);
      }
    }
  }

  const maxServings = originalServings * MAX_SCALE_MULTIPLIER;
  const decBtn = stepper.querySelector<HTMLButtonElement>('[data-dir="-1"]');
  const incBtn = stepper.querySelector<HTMLButtonElement>('[data-dir="1"]');

  function syncBtns(n: number): void {
    if (decBtn) decBtn.disabled = n <= 1;
    if (incBtn) incBtn.disabled = n >= maxServings;
  }
  syncBtns(originalServings);

  stepper.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(
      ".stepper-btn",
    );
    if (!btn) return;
    const dir = parseInt(btn.dataset.dir!);
    const current = parseInt(stepper.dataset.current!);
    const next = Math.min(maxServings, Math.max(1, current + dir));
    applyScale(next);
    syncBtns(next);
  });
}

document.addEventListener("astro:page-load", initScaling);
