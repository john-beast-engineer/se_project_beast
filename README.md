# BeTheBeast — Stage 1

A gamified fitness app for building and tracking your own workouts. Browse a live exercise library, assemble custom workouts with sets and reps, save them, and check them off as you train.

Stage 1 is a frontend-only React build — the foundation for the full BeTheBeast platform.

## Live Demo

https://john-beast-engineer.github.io/se_project_beast/

## Project Pitch Video

[Watch the pitch »]https://www.loom.com/share/87fbc59adf0f4601927c4863bf16edb5

## Features

- Browse exercises pulled live from the wger API
- Build a custom workout: name it, add exercises, set sets and reps
- Save workouts to localStorage so they persist across reloads
- Open any saved workout in a detail modal
- Mark a workout complete and find it in your Completed list

## Tech Stack

- React 18 + Vite
- React Router (HashRouter)
- wger REST API for exercise data
- localStorage for persistence
- BEM-structured, responsive CSS

## Run Locally

Run `npm install`, then `npm run dev`, and open the local URL Vite prints.
