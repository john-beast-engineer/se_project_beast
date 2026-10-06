import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../ActivityCard/ActivityCard";
import ExerciseModal from "../ExerciseModal/ExerciseModal.jsx";
import SetsRepsModal from "../SetsRepsModal/SetsRepsModal.jsx";
import WorkoutNameModal from "../WorkoutNameModal/WorkoutNameModal.jsx";
import {
  createWorkout,
  getCustomExercises,
  createCustomExercise,
  updateWorkout,
} from "../../utils/storage.js";
import CustomExerciseModal from "../CustomExerciseModal/CustomExerciseModal.jsx";
import {
  getExercises,
  normalizeWgerExercise,
  normalizeCustomExercise,
} from "../../utils/wgerApi.js";
import "./Browse.css";

function Browse({ isLoggedIn, workoutBeingEdited, setWorkoutBeingEdited }) {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [draftWorkout, setDraftWorkout] = useState(null);
  const [isNamingOpen, setIsNamingOpen] = useState(false);
  const [pendingExercise, setPendingExercise] = useState(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const loadExercises = () => {
    Promise.allSettled([getExercises(), getCustomExercises()])
      .then(([wgerResult, customResult]) => {
        const wger =
          wgerResult.status === "fulfilled"
            ? wgerResult.value.results.map(normalizeWgerExercise)
            : [];
        const custom =
          customResult.status === "fulfilled"
            ? customResult.value.map(normalizeCustomExercise)
            : [];
        setExercises([...custom, ...wger]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    if (workoutBeingEdited) {
      setDraftWorkout({
        _id: workoutBeingEdited._id,
        name: workoutBeingEdited.name,
        exercises: workoutBeingEdited.exercises,
      });
    }
  }, [workoutBeingEdited]);

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => setSelectedExercise(null);

  const handleCreateExercise = (data) => {
    createCustomExercise(data)
      .then(() => {
        setIsExerciseModalOpen(false);
        loadExercises();
      })
      .catch(console.error);
  };

  const handleCreateWorkout = (name) => {
    setDraftWorkout({ name, exercises: [] });
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
    if (draftWorkout._id) {
      updateWorkout(draftWorkout._id, { exercises: draftWorkout.exercises })
        .then(() => {
          setDraftWorkout(null);
          setWorkoutBeingEdited(null);
          navigate("/workout/saved");
        })
        .catch(console.error);
    } else {
      createWorkout(draftWorkout)
        .then(() => setDraftWorkout(null))
        .catch(console.error);
    }
  };

  const handleAddFromDetail = (exercise) => {
    setSelectedExercise(null);
    setPendingExercise(exercise);
  };

  const visibleExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="browse">
      <h2>Browse workouts</h2>

      {isLoggedIn && (
        <button
          className="browse__create-btn"
          type="button"
          onClick={() => setIsExerciseModalOpen(true)}
        >
          + Add Exercise
        </button>
      )}

      {isLoggedIn && (
        <button
          className="browse__create-btn"
          type="button"
          onClick={() => setIsNamingOpen(true)}
        >
          + Create Workout
        </button>
      )}
      {draftWorkout && (
        <p className="browse__building">
          {draftWorkout._id ? "Editing" : "Building"} {draftWorkout.name} (
          {draftWorkout.exercises.length})
        </p>
      )}

      {draftWorkout && (
        <button
          className="browse__save-btn"
          type="button"
          onClick={handleSaveWorkout}
        >
          {draftWorkout._id ? "Save Changes" : "Save Workout"}
        </button>
      )}

      <input
        className="browse__search"
        type="search"
        placeholder="Search exercises"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {visibleExercises.length === 0 ? (
        <div className="browse__empty">
          <p>No exercises match "{query}".</p>
          {isLoggedIn && (
            <button
              className="browse__create-btn"
              type="button"
              onClick={() => setIsExerciseModalOpen(true)}
            >
              + Create "{query}"
            </button>
          )}
        </div>
      ) : (
        <ul className="browse__list">
          {visibleExercises.map((exercise) => (
            <ActivityCard
              key={exercise.id}
              exercise={exercise}
              onCardClick={handleCardClick}
              onCardAdd={handleStartAdd}
              isBuildMode={draftWorkout !== null}
            />
          ))}
        </ul>
      )}

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={handleCloseModal}
          onAddToWorkout={handleAddFromDetail}
          isBuildMode={draftWorkout !== null}
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

      {isExerciseModalOpen && (
        <CustomExerciseModal
          isOpen={isExerciseModalOpen}
          onClose={() => setIsExerciseModalOpen(false)}
          onCreate={handleCreateExercise}
        />
      )}
    </main>
  );
}

export default Browse;
