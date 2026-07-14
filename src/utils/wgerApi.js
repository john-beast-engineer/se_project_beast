const baseUrl = "https://wger.de/api/v2";
import logo from "../assets/logo1.png";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getExercises() {
  return fetch(
    `${baseUrl}/exerciseinfo/?language=2&limit=100&format=json`,
  ).then(checkResponse);
}

export function getEnglishName(exercise) {
  return exercise.translations.find((t) => t.language === 2)?.name;
}

export function getEnglishDescription(exercise) {
  return exercise.translations.find((t) => t.language === 2)?.description;
}

export function normalizeWgerExercise(exercise) {
  return {
    id: `wger-${exercise.id}`,
    name: getEnglishName(exercise) || "Unnamed exercise",
    category: exercise.category?.name || "",
    imageUrl: exercise.images?.[0]?.image || "",
    videoUrl: null,
    description: getEnglishDescription(exercise) || "",
    source: "wger",
  };
}

export function normalizeCustomExercise(exercise) {
  return {
    id: `custom-${exercise._id}`,
    name: exercise.name,
    category: exercise.category || "",
    imageUrl: exercise.imageUrl || "",
    videoUrl: exercise.videoUrl || null,
    description: exercise.description || "",
    source: "custom",
    _id: exercise._id,
  };
}

export { getExercises };
