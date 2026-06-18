const STORAGE_KEY = "bethebeast_completed";

function getCompleted() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCompleted(exercises) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
}

export { getCompleted, saveCompleted };
