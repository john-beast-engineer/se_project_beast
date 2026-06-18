import "./Completed.css";
import { Link } from "react-router-dom";
import ActivityCard from "../ActivityCard/ActivityCard";
import { getCompleted } from "../../utils/storage.js";

function Completed() {
  const completedExercises = getCompleted();

  return (
    <main className="completed">
      <h2>Completed workouts</h2>

      {completedExercises.length === 0 ? (
        <div className="completed__empty">
          <p>No workouts conquered yet.</p>
          <Link to="/browse" className="completed__empty-link">
            Go hunt your first →
          </Link>
        </div>
      ) : (
        <ul className="completed__list">
          {completedExercises.map((exercise) => (
            <ActivityCard key={exercise.id} exercise={exercise} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default Completed;
