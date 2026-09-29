import { BRAND } from "../config/brand.js"; // NEW

export const XP_PER_WORKOUT = 50;
export const XP_PER_WELLNESS = 20;

// Tier data now comes from the brand config. The math below is brand-agnostic.
export const LEVELS = BRAND.tiers; // NEW

export function calculateXp(completedWorkoutCount, wellnessCompletionCount) {
  return (
    completedWorkoutCount * XP_PER_WORKOUT +
    wellnessCompletionCount * XP_PER_WELLNESS
  );
}

export function getLevel(xp) {
  // highest level whose threshold we've passed
  return [...LEVELS].reverse().find((level) => xp >= level.threshold);
}

export function getProgress(xp) {
  const level = getLevel(xp);
  const index = LEVELS.findIndex((l) => l.id === level.id);
  const next = LEVELS[index + 1];

  if (!next) {
    // top tier — no next level, bar stays full
    return { level, next: null, current: xp, max: xp, percent: 100 };
  }

  const current = xp - level.threshold;
  const max = next.threshold - level.threshold;
  return { level, next, current, max, percent: (current / max) * 100 };
}

export function formatDuration(totalSeconds) {
  if (totalSeconds == null) return "—";
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
