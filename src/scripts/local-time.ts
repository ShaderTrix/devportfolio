// The visitor's own clock with a short zone name ("22:21:05 IST"), shown in the header status
// block and on the gallery terminal.

// English locales differ in which zones get a letter code (en-IN knows IST, en-GB knows BST,
// en-AU knows AEST...); take the first that has one, else the "GMT+5:30" form.
const ZONE_LOCALES = ["en-US", "en-GB", "en-IN", "en-AU"];
let zone: string | undefined;

function zoneName(d: Date) {
  if (zone) return zone;
  const names = ZONE_LOCALES.map((locale) => {
    try {
      return new Intl.DateTimeFormat(locale, { timeZoneName: "short" }).formatToParts(d).find((p) => p.type === "timeZoneName")?.value;
    } catch {
      return undefined;
    }
  }).filter((n): n is string => !!n);
  zone = names.find((n) => !/^(GMT|UTC)([+-]|$)/.test(n)) ?? names[0] ?? "";
  return zone;
}

/** "22:21:05 IST" (24-hour) */
export function localTime(d = new Date()) {
  const hms = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  return `${hms} ${zoneName(d)}`.trim();
}
