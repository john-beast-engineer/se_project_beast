const STORAGE_KEY = "bethebeast_completed";
const WORKOUTS_KEY = "bethebeast_workouts";

function getCompleted() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCompleted(exercises) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
}

export function getWorkouts() {
  const stored = localStorage.getItem(WORKOUTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveWorkouts(workouts) {
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
}

export { getCompleted, saveCompleted };
