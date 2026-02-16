export const fractions: Record<string, string> = {
  "1/2": "\u00BD",
  "1/3": "\u2153",
  "2/3": "\u2154",
  "1/4": "\u00BC",
  "3/4": "\u00BE",
  "1/5": "\u2155",
  "2/5": "\u2156",
  "3/5": "\u2157",
  "4/5": "\u2158",
  "1/6": "\u2159",
  "5/6": "\u215A",
  "1/8": "\u215B",
  "3/8": "\u215C",
  "5/8": "\u215D",
  "7/8": "\u215E",
};

const pattern = new RegExp(
  `(?<=^|\\s)(\\d+\\s+)?(${Object.keys(fractions)
    .map((k) => k.replace("/", "\\/"))
    .join("|")})(?=\\s|$)`,
  "g",
);

export function replaceFractions(text: string): string {
  return text.replace(
    pattern,
    (_match: string, whole: string | undefined, frac: string) =>
      (whole ?? "") + fractions[frac],
  );
}
