import { useState } from "react";
import Timer from "../Timer/Timer.jsx";
import "./WellnessModal.css";

function WellnessModal({ activity, onClose, onComplete }) {
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="wellness-modal" onClick={onClose}>
      <div
        className="wellness-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="wellness-modal__close"
          type="button"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="wellness-modal__title">{activity.name}</h2>

        <p className="wellness-modal__use-when">Use this {activity.useWhen}</p>

        <ol className="wellness-modal__steps">
          {activity.steps.map((step, index) => (
            <li key={index} className="wellness-modal__step">
              {step}
            </li>
          ))}
        </ol>

        <Timer seconds={seconds} setSeconds={setSeconds} />

        <button
          className="wellness-modal__complete"
          type="button"
          onClick={() => onComplete(seconds)}
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}

export default WellnessModal;
