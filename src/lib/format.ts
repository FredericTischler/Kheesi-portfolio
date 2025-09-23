export function formatDate(input?: string | Date, locale = "fr-FR") {
  if (!input) return "";
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const units: { limit: number; divisor: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { limit: 60, divisor: 1, unit: "second" },
  { limit: 3600, divisor: 60, unit: "minute" },
  { limit: 86400, divisor: 3600, unit: "hour" },
  { limit: 604800, divisor: 86400, unit: "day" },
  { limit: 2629800, divisor: 604800, unit: "week" },
  { limit: 31557600, divisor: 2629800, unit: "month" },
  { limit: Infinity, divisor: 31557600, unit: "year" },
];

export function formatRelativeTime(input?: string | Date, locale = "fr-FR") {
  if (!input) return "";
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  const elapsed = (date.getTime() - Date.now()) / 1000;
  const absElapsed = Math.abs(elapsed);
  const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  for (const { limit, divisor, unit } of units) {
    if (absElapsed < limit) {
      const value = Math.round(elapsed / divisor);
      return format.format(value, unit);
    }
  }
  return "";
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
