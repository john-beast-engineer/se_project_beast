import "./Completed.css";
import { Link } from "react-router-dom";
import WorkoutCard from "../WorkoutCard/WorkoutCard.jsx";
import { getWorkouts } from "../../utils/storage.js";

function Completed() {
  const completedWorkouts = getWorkouts().filter((w) => w.completed);

  return (
    <main className="completed">
      <h2>Completed workouts</h2>

      {completedWorkouts.length === 0 ? (
        <div className="completed__empty">
          <p>No workouts conquered yet.</p>
          <Link to="/browse" className="completed__empty-link">
            Go hunt your first →
          </Link>
        </div>
      ) : (
        <ul className="completed__list">
          {completedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default Completed;
