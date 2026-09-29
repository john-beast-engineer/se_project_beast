import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { BRAND } from "../../config/brand.js"; // NEW
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onRegisterClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <img
            className="header__logo-image"
            src={BRAND.logo.image}
            alt={BRAND.logo.alt}
          />
          {BRAND.logo.wordmark && (
            <span className="header__wordmark">{BRAND.logo.wordmark}</span>
          )}
        </NavLink>

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
