import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  authError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log In"
      buttonText="Log In"
      onSubmit={handleSubmit}
      extraAction={
        <button
          type="button"
          className="form-modal__switch"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      }
    >
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
    </ModalWithForm>
  );
}

export default LoginModal;
