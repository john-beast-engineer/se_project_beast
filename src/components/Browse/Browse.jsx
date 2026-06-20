import { useState, useEffect } from "react";
import ActivityCard from "../ActivityCard/ActivityCard";
import ExerciseModal from "../ExerciseModal/ExerciseModal.jsx";
import SetsRepsModal from "../SetsRepsModal/SetsRepsModal.jsx";
import WorkoutNameModal from "../WorkoutNameModal/WorkoutNameModal.jsx";
import {
  getCompleted,
  saveCompleted,
  getWorkouts,
  saveWorkouts,
} from "../../utils/storage.js";
import { getExercises } from "../../utils/wgerApi.js";
import "./Browse.css";

function Browse() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [draftWorkout, setDraftWorkout] = useState(null);
  const [isNamingOpen, setIsNamingOpen] = useState(false);
  const [pendingExercise, setPendingExercise] = useState(null);

  useEffect(() => {
    getExercises()
      .then((data) => {
        setExercises(data.results);
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => setSelectedExercise(null);

  const handleComplete = () => {
    const completed = getCompleted();
    const alreadyDone = completed.some(
      (item) => item.id === selectedExercise.id,
    );
    if (!alreadyDone) {
      saveCompleted([...completed, selectedExercise]);
    }
    setSelectedExercise(null);
  };

  const handleCreateWorkout = (name) => {
    setDraftWorkout({ id: Date.now(), name, exercises: [] }); // NEW: id
    setIsNamingOpen(false);
  };

  const handleStartAdd = (exercise) => {
    setPendingExercise(exercise);
  };

  const handleConfirmAdd = (sets, reps) => {
    const alreadyAdded = draftWorkout.exercises.some(
      (ex) => ex.id === pendingExercise.id,
    );
    if (!alreadyAdded) {
      setDraftWorkout({
        ...draftWorkout,
        exercises: [
          ...draftWorkout.exercises,
          { ...pendingExercise, sets, reps },
        ],
      });
    }

    setPendingExercise(null);
  };

  const handleSaveWorkout = () => {
    const workouts = getWorkouts();
    saveWorkouts([...workouts, draftWorkout]);
    setDraftWorkout(null);
  };

  const handleAddFromDetail = (exercise) => {
    setSelectedExercise(null); // close the detail modal
    setPendingExercise(exercise); // open SetsRepsModal — your existing add flow
  };

  return (
    <main className="browse">
      <h2>Browse workouts</h2>

      <button
        className="browse__create-btn"
        type="button"
        onClick={() => setIsNamingOpen(true)}
      >
        + Create Workout
      </button>

      {draftWorkout && (
        <p className="browse__building">
          Building: {draftWorkout.name} ({draftWorkout.exercises.length})
        </p>
      )}

      {draftWorkout && (
        <button
          className="browse__save-btn"
          type="button"
          onClick={handleSaveWorkout}
        >
          Save Workout
        </button>
      )}

      <ul className="browse__list">
        {exercises.map((exercise) => (
          <ActivityCard
            key={exercise.id}
            exercise={exercise}
            onCardClick={handleCardClick}
            onCardAdd={handleStartAdd}
            isBuildMode={draftWorkout !== null}
          />
        ))}
      </ul>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={handleCloseModal}
          onAddToWorkout={handleAddFromDetail} // NEW (replaces onComplete)
          isBuildMode={draftWorkout !== null} // NEW
        />
      )}

      {pendingExercise && (
        <SetsRepsModal
          exercise={pendingExercise}
          onConfirm={handleConfirmAdd}
          onClose={() => setPendingExercise(null)}
        />
      )}

      {isNamingOpen && (
        <WorkoutNameModal
          onCreate={handleCreateWorkout}
          onClose={() => setIsNamingOpen(false)}
        />
      )}
    </main>
  );
}

export default Browse;
