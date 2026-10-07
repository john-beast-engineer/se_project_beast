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
        <h1 className="splash__headline">Earn your beast.</h1>
        <p className="splash__sub">Log in to track your XP.</p>

        <form className="splash__form" onSubmit={handleSubmit}>
          <input
            className="splash__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="splash__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {authError && <p className="splash__error">{authError}</p>}

          <button className="splash__btn splash__btn_primary" type="submit">
            Log In
          </button>
        </form>

        <button className="splash__btn" type="button" onClick={onRegisterClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Splash;
