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

export { getExercises };
