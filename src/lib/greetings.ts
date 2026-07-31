// Small helpers for the dashboard header greeting + motivational line.

export function greetingForHour(hour = new Date().getHours()): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const MOTIVATION = [
  "Small steps every day add up to big results.",
  "Focus on progress, not perfection.",
  "One task at a time — you've got this.",
  "Consistency beats intensity.",
  "Plan the work, then work the plan.",
  "Your future self will thank you.",
  "Discipline is choosing what you want most.",
];

/** Deterministic-per-day motivational line so it doesn't flicker on renders. */
export function motivationForToday(iso = new Date().toISOString().slice(0, 10)): string {
  const seed = iso.split("-").reduce((a, p) => a + Number(p), 0);
  return MOTIVATION[seed % MOTIVATION.length];
}
