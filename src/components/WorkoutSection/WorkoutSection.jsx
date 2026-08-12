import { Outlet, NavLink } from "react-router-dom";
import "./WorkoutSection.css";

function WorkoutSection() {
  const getSubNavClass = ({ isActive }) =>
    `workout-section__tab ${isActive ? "workout-section__tab_active" : ""}`;

  return (
    <section className="workout-section">
      <nav className="workout-section__nav">
        <NavLink to="/workout/browse" className={getSubNavClass}>
          Browse
        </NavLink>
        <NavLink to="/workout/saved" className={getSubNavClass}>
          Saved
        </NavLink>
      </nav>

      <Outlet />
    </section>
  );
}

export default WorkoutSection;
