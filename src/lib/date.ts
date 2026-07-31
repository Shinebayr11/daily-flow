// Date/time helpers. Dates are handled as local yyyy-mm-dd strings to avoid
// timezone drift; times are "HH:mm" 24-hour strings.

/** Format a Date as a local yyyy-mm-dd string. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

/** Parse a yyyy-mm-dd string into a Date at local midnight. */
export function parseISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

/** Start & end Date bounds for a single local day — handy for Mongo ranges. */
export function dayRange(iso: string): { start: Date; end: Date } {
  const start = parseISODate(iso);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export function tomorrowISO(): string {
  return addDaysISO(todayISO(), 1);
}

/** Monday of the week containing `date`. */
export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun ... 6 = Sat
  const diff = day === 0 ? -6 : 1 - day; // shift back to Monday
  d.setDate(d.getDate() + diff);
  return toISODate(d);
}

/** The 7 ISO dates of the week starting at `weekStart` (Monday). */
export function getWeekDays(weekStart: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDaysISO(weekStart, i));
}

/** Weekday key ("mon".."sun") for an ISO date. */
export function weekdayKey(iso: string): string {
  const keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return keys[new Date(`${iso}T00:00:00`).getDay()];
}

/** Human-friendly date, e.g. "Fri, Jul 24". */
export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...opts,
  });
}

export function isToday(iso: string): boolean {
  return iso === todayISO();
}

// ---- Time helpers ("HH:mm") ----

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(total: number): string {
  const wrapped = ((total % 1440) + 1440) % 1440; // clamp into 0..1439
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Add `minutes` to a "HH:mm" start time. */
export function addMinutesToTime(start: string, minutes: number): string {
  return minutesToTime(timeToMinutes(start) + minutes);
}

/** Duration in minutes between two times, or null if invalid. */
export function durationBetween(start?: string, end?: string): number | null {
  if (!start || !end) return null;
  const diff = timeToMinutes(end) - timeToMinutes(start);
  return diff > 0 ? diff : null;
}

/** "1h 30m" style label from a minute count. */
export function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

/**
 * Do two timed tasks overlap? Both need start+end. All-day tasks never clash.
 */
export function timesOverlap(
  aStart?: string,
  aEnd?: string,
  bStart?: string,
  bEnd?: string,
): boolean {
  if (!aStart || !aEnd || !bStart || !bEnd) return false;
  const a1 = timeToMinutes(aStart);
  const a2 = timeToMinutes(aEnd);
  const b1 = timeToMinutes(bStart);
  const b2 = timeToMinutes(bEnd);
  return a1 < b2 && b1 < a2;
}
