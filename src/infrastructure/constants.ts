export const UNCATEGORIZED = "Uncategorized";

export const MAX_SCALE_MULTIPLIER = 4;

export const CATEGORY_ORDER = [
  "mains",
  "sides",
  "snacks",
  "sauces",
  "dips",
  "sweets",
  "drinks",
  "seasonings",
  "doughs",
  "basics",
];

export function sortCategories(categories: string[]): string[] {
  const known = CATEGORY_ORDER.filter((c) => categories.includes(c));
  const extra = categories.filter((c) => !CATEGORY_ORDER.includes(c)).sort();
  return [...known, ...extra];
}
