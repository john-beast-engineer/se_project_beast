import { useState } from "react";
import WorkoutCard from "../WorkoutCard/WorkoutCard.jsx";
import WorkoutModal from "../WorkoutModal/WorkoutModal.jsx";
import { Link } from "react-router-dom";
import { getWorkouts, saveWorkouts } from "../../utils/storage.js";
import "./Workouts.css";

function Workouts() {
  const [workouts, setWorkouts] = useState(getWorkouts());
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleCardClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseModal = () => setSelectedWorkout(null);

  const handleCompleteWorkout = () => {
    const updated = workouts.map((w) =>
      w.id === selectedWorkout.id ? { ...w, completed: true } : w,
    );
    saveWorkouts(updated); // persist
    setWorkouts(updated); // re-render now
    setSelectedWorkout(null); // close the modal
  };

  return (
    <main className="workouts">
      <h2>Your Workouts</h2>

      {workouts.length === 0 ? (
        <div className="workouts__empty">
          <p>You have not selected any workouts yet.</p>
          <Link to="/browse" className="workouts__empty-link">
            Build your first →
          </Link>
        </div>
      ) : (
        <ul className="workouts__list">
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      )}
      {selectedWorkout && (
        <WorkoutModal
          workout={selectedWorkout}
          onClose={handleCloseModal}
          onComplete={handleCompleteWorkout}
        />
      )}
    </main>
  );
}

export default Workouts;
