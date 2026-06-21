import "./SetsRepsModal.css";
import { getEnglishName } from "../../utils/wgerApi.js";
import { useState } from "react";

function SetsRepsModal({ exercise, onConfirm, onClose }) {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const name = getEnglishName(exercise);

  const handleSubmit = () => {
    if (sets && reps) {
      onConfirm(Number(sets), Number(reps));
    }
  };

  return (
    <div className="sets-reps-modal">
      <div className="sets-reps-modal__container">
        <button
          className="sets-reps-modal__close"
          type="button"
          onClick={onClose}
        >
          x
        </button>
        <h2 className="sets-reps-modal__title">{name}</h2>

        <label className="sets-reps-modal__label">
          Sets
          <input
            className="sets-reps-modal__input"
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </label>

        <label className="sets-reps-modal__label">
          Reps
          <input
            className="sets-reps-modal__input"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>

        <button
          className="sets-reps-modal__confirm"
          type="button"
          onClick={handleSubmit}
        >
          Add to Workout
        </button>
      </div>
    </div>
  );
}

export default SetsRepsModal;
