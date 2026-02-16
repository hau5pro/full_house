export const UNCATEGORIZED = "Uncategorized";

export const CATEGORY_ORDER = [
  "mains",
  "sides",
  "sauces",
  "dips",
  "snacks",
  "desserts",
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
