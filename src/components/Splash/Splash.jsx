import { useState } from "react";
import logo from "../../assets/logo.png";
import "./Splash.css";

function Splash({ onLogin, onRegisterClick, authError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="splash">
      <div className="splash__brand">
        <img className="splash__logo" src={logo} alt="BeTheBeast" />
      </div>

      <div className="splash__pane">
        <h2 className="form-modal__title">Log In</h2>

        <form className="form-modal__form" onSubmit={handleSubmit}>
          <label className="form-modal__label">
            Email
            <input
              className="form-modal__input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-modal__label">
            Password
            <input
              className="form-modal__input"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {authError && <p className="form-modal__error">{authError}</p>}

          <button type="submit" className="form-modal__submit">
            Log In
          </button>
        </form>

        <button
          type="button"
          className="form-modal__switch"
          onClick={onRegisterClick}
        >
          or Sign Up
        </button>
      </div>
    </div>
  );
}

export default Splash;
