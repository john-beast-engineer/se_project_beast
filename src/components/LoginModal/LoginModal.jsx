import { useState, useEffect } from "react";
import "../AuthModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal" onClick={handleOverlayClick}>
      <div className="auth-modal__container">
        <button type="button" className="auth-modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="auth-modal__title">Log In</h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          <label className="auth-modal__label">
            Email
            <input
              className="auth-modal__input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="auth-modal__label">
            Password
            <input
              className="auth-modal__input"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="auth-modal__submit">
            Log In
          </button>
        </form>

        <button
          type="button"
          className="auth-modal__switch"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
