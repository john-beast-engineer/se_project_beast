import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

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

  const handleSubmit = () => {
    onRegister({ name, email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      buttonText="Sign Up"
      onSubmit={handleSubmit}
      extraAction={
        <button
          type="button"
          className="form-modal__switch"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
    >
      <label className="form-modal__label">
        Name
        <input
          className="form-modal__input"
          type="text"
          required
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

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
    </ModalWithForm>
  );
}

export default RegisterModal;
