import { getToken } from "./token.js";

const BASE_URL = import.meta.env.PROD
  ? "https://se-project-beast-express.onrender.com"
  : "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export function getWorkouts() {
  return fetch(`${BASE_URL}/workouts`, {
    headers: authHeaders(),
  }).then(checkResponse);
}

export function createWorkout({ name, exercises }) {
  return fetch(`${BASE_URL}/workouts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, exercises }),
  }).then(checkResponse);
}

export function updateWorkout(id, { completed }) {
  return fetch(`${BASE_URL}/workouts/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ completed }),
  }).then(checkResponse);
}

export function deleteWorkout(id) {
  return fetch(`${BASE_URL}/workouts/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then(checkResponse);
}
