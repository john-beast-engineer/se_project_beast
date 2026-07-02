import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onRegisterClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const getNavClass = ({ isActive }) =>
    `header__nav-item ${isActive ? "header__nav-item_active" : ""}`;

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <img
            className="header__logo-image"
            src={logo}
            alt="BeTheBeast Logo"
          />
        </NavLink>

        <nav className="header__nav">
          <NavLink to="/" end className={getNavClass}>
            Dashboard
          </NavLink>
          <NavLink to="/workout" className={getNavClass}>
            Workout
          </NavLink>
          <NavLink to="/wellness" className={getNavClass}>
            Wellness
          </NavLink>
        </nav>

        <div className="header__auth">
          {isLoggedIn ? (
            <>
              <span className="header__username">{currentUser.name}</span>
              <button
                type="button"
                className="header__auth-btn"
                onClick={onLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-btn"
                onClick={onLoginClick}
              >
                Log In
              </button>
              <button
                type="button"
                className="header__auth-btn"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
