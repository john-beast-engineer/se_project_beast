import { useState, useEffect } from "react";
import WorkoutCard from "../WorkoutCard/WorkoutCard.jsx";
import WorkoutModal from "../WorkoutModal/WorkoutModal.jsx";
import { Link } from "react-router-dom";
import {
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../../utils/storage.js";
import "./Workouts.css";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch(console.error);
  }, []);

  const handleCardClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseModal = () => setSelectedWorkout(null);

  const handleCompleteWorkout = () => {
    updateWorkout(selectedWorkout._id, { completed: true })
      .then((updatedWorkout) => {
        setWorkouts((current) =>
          current.map((w) =>
            w._id === selectedWorkout._id ? updatedWorkout : w,
          ),
        );
        setSelectedWorkout(null);
      })
      .catch(console.error);
  };

  const handleDeleteWorkout = (id) => {
    if (!window.confirm("Delete this workout? This can't be undone.")) return;

    deleteWorkout(id)
      .then(() => {
        setWorkouts((current) => current.filter((w) => w._id !== id));
      })
      .catch(console.error);
  };

  return (
    <main className="workouts">
      <h2>Your Workouts</h2>

      {workouts.length === 0 ? (
        <div className="workouts__empty">
          <p>You have not selected any workouts yet.</p>
          <Link to="/workout/browse" className="workouts__empty-link">
            Build your first →
          </Link>
        </div>
      ) : (
        <ul className="workouts__list">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onCardClick={handleCardClick}
              onDelete={handleDeleteWorkout}
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
