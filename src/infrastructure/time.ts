export function parseMinutes(time: string | undefined): number {
  if (!time) return 0;
  let total = 0;
  const hrMatch = time.match(/(\d+(?:\.\d+)?)\s*hr/);
  const minMatch = time.match(/(\d+)\s*min/);
  if (hrMatch) total += parseFloat(hrMatch[1]) * 60;
  if (minMatch) total += parseInt(minMatch[1]);
  return total;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hrLabel = hrs === 1 ? "hour" : "hours";
  if (mins === 0) return `${hrs} ${hrLabel}`;
  const minLabel = mins === 1 ? "minute" : "minutes";
  return `${hrs} ${hrLabel} ${mins} ${minLabel}`;
}

export function totalTime(meta: {
  prepTime?: string;
  cookTime?: string;
  fermentTime?: string;
  marinadeTime?: string;
  coolingTime?: string;
} | undefined): string | null {
  if (!meta) return null;
  const minutes = [meta.prepTime, meta.cookTime, meta.fermentTime, meta.marinadeTime, meta.coolingTime]
    .reduce((sum, t) => sum + parseMinutes(t), 0);
  return minutes > 0 ? formatDuration(minutes) : null;
}
