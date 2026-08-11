import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import XpBar from "../XpBar/XpBar.jsx";
import WorkoutCard from "../WorkoutCard/WorkoutCard.jsx";
import {
  getWorkouts,
  deleteWorkout,
  getWellnessCompletions,
} from "../../utils/storage.js";
import { wellnessActivities } from "../../utils/wellnessActivities.js";
import { calculateXp, getProgress } from "../../utils/xp.js"; // NEW
import "./Dashboard.css";

function Dashboard({ isLoggedIn }) {
  const [workouts, setWorkouts] = useState([]);
  const [wellnessCompletions, setWellnessCompletions] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    getWorkouts().then(setWorkouts).catch(console.error);

    getWellnessCompletions().then(setWellnessCompletions).catch(console.error);
  }, [isLoggedIn]);

  const completedWorkouts = workouts.filter((w) => w.completed);

  const xp = calculateXp(completedWorkouts.length, wellnessCompletions.length); // NEW
  const progress = getProgress(xp); // NEW

  const handleDeleteWorkout = (id) => {
    if (!window.confirm("Delete this workout? This can't be undone.")) return;
    deleteWorkout(id)
      .then(() => {
        setWorkouts((current) => current.filter((w) => w._id !== id));
      })
      .catch(console.error);
  };

  return (
    <main className="dashboard">
      <XpBar current={progress.current} max={progress.max} />

      <nav className="dashboard__tiles">
        <NavLink
          to="/workout"
          className="dashboard__tile dashboard__tile_workout"
        >
          <span className="dashboard__tile-label">Workout</span>
        </NavLink>
        <NavLink
          to="/wellness"
          className="dashboard__tile dashboard__tile_wellness"
        >
          <span className="dashboard__tile-label">Wellness</span>
        </NavLink>
      </nav>

      <section className="dashboard__completed">
        <h2 className="dashboard__heading">Completed workouts</h2>
        {!isLoggedIn ? (
          <p className="dashboard__prompt">
            Log in to track your conquered workouts.
          </p>
        ) : completedWorkouts.length === 0 ? (
          <p className="dashboard__prompt">No workouts conquered yet.</p>
        ) : (
          <ul className="dashboard__list">
            {completedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                onDelete={handleDeleteWorkout}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard__completed">
        <h2 className="dashboard__heading">Completed wellness</h2>
        {!isLoggedIn ? (
          <p className="dashboard__prompt">
            Log in to track your wellness practice.
          </p>
        ) : wellnessCompletions.length === 0 ? (
          <p className="dashboard__prompt">No activities completed yet.</p>
        ) : (
          <ul className="dashboard__list">
            {wellnessCompletions.map((completion) => {
              const activity = wellnessActivities.find(
                (a) => a.id === completion.activityId,
              );
              return (
                <li key={completion._id} className="dashboard__wellness-item">
                  <span className="dashboard__wellness-name">
                    {activity ? activity.name : "Unknown activity"}
                  </span>
                  <span className="dashboard__wellness-date">
                    {new Date(completion.completedAt).toLocaleDateString()}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
