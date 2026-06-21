const baseUrl = "https://wger.de/api/v2";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getExercises() {
  return fetch(`${baseUrl}/exerciseinfo/?language=2&limit=20&format=json`).then(
    checkResponse,
  );
}

export function getEnglishName(exercise) {
  return exercise.translations.find((t) => t.language === 2)?.name;
}

export function getEnglishDescription(exercise) {
  return exercise.translations.find((t) => t.language === 2)?.description;
}

export { getExercises };
