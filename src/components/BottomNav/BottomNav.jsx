import { NavLink } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className="bottom-nav__tab">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14l3-4 2 2.5L16 9" />
        </svg>
        <span className="bottom-nav__label">Home</span>
      </NavLink>

      <NavLink to="/workout" className="bottom-nav__tab">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 9v6M16 9v6M8 12h8" />
        </svg>
        <span className="bottom-nav__label">Workout</span>
      </NavLink>

      <NavLink to="/wellness" className="bottom-nav__tab">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16s-3.5-2.3-3.5-4.8A1.9 1.9 0 0112 9.6a1.9 1.9 0 013.5 1.6C15.5 13.7 12 16 12 16z" />
        </svg>
        <span className="bottom-nav__label">Wellness</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
