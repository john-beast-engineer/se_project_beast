import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function WorkoutNameModal({ onCreate, onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    if (name.trim()) {
      onCreate(name);
    }
  };

  return (
    <ModalWithForm
      isOpen={true}
      onClose={onClose}
      title="Name your workout"
      buttonText="Create"
      onSubmit={handleSubmit}
    >
      <input
        className="form-modal__input"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Leg Day, Cardio Blast"
      />
    </ModalWithForm>
  );
}

export default WorkoutNameModal;
