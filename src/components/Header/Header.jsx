import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
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
        <Link to="/" className="header__logo">
          <img
            className="header__logo-image"
            src={logo}
            alt="BeTheBeast Logo"
          />
        </Link>
        <nav className="header__nav">
          <NavLink to="/" end className={getNavClass}>
            Completed
          </NavLink>
          <NavLink to="/browse" className={getNavClass}>
            Browse
          </NavLink>
          <NavLink to="/workouts" className={getNavClass}>
            Workouts
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
