import { useState, useEffect } from "react";
import ActivityCard from "../ActivityCard/ActivityCard";
import ExerciseModal from "../ExerciseModal/ExerciseModal.jsx";
import { getCompleted, saveCompleted } from "../../utils/storage.js";
import { getExercises } from "../../utils/wgerApi.js";
import "./Browse.css";

function Browse() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    getExercises()
      .then((data) => {
        setExercises(data.results);
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (exercise) => {
    console.log("Selected exercise:", exercise);
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

  return (
    <main className="browse">
      <h2>Browse workouts</h2>
      <ul className="browse__list">
        {exercises.map((exercise) => (
          <ActivityCard
            key={exercise.id}
            exercise={exercise}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={handleCloseModal}
          onComplete={handleComplete}
        />
      )}
    </main>
  );
}

export default Browse;
