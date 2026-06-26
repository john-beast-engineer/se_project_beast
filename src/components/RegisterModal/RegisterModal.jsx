import { useState, useEffect } from "react";
import "../AuthModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
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
    onRegister({ name, email, password });
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
        <h2 className="auth-modal__title">Sign Up</h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          <label className="auth-modal__label">
            Name
            <input
              className="auth-modal__input"
              type="text"
              required
              minLength={2}
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

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
            Sign Up
          </button>
        </form>

        <button
          type="button"
          className="auth-modal__switch"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
