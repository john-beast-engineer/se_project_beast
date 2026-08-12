import wolverine from "../assets/wolverine.png"; // NEW
import wolf from "../assets/wolf.png"; // NEW
import rhino from "../assets/rhino.png"; // NEW
import elephant from "../assets/elephant.png"; // NEW

export const XP_PER_WORKOUT = 50;
export const XP_PER_WELLNESS = 20;

export const LEVELS = [
  {
    id: "wolverine",
    name: "Persistent Wolverine",
    threshold: 0,
    image: wolverine,
  }, // NEW
  { id: "wolf", name: "Resilient Wolf", threshold: 560, image: wolf }, // NEW
  { id: "rhino", name: "Relentless Rhino", threshold: 1320, image: rhino }, // NEW
  { id: "elephant", name: "Apex Elephant", threshold: 2360, image: elephant }, // NEW
];

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
    // Apex Elephant — no next beast, bar stays full
    return { level, next: null, current: xp, max: xp, percent: 100 };
  }

  const current = xp - level.threshold;
  const max = next.threshold - level.threshold;
  return { level, next, current, max, percent: (current / max) * 100 };
}
