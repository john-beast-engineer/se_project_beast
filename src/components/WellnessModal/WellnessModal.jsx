import "./WellnessModal.css";

function WellnessModal({ activity, onClose, onComplete }) {
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

        <button
          className="wellness-modal__complete"
          type="button"
          onClick={onComplete}
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}

export default WellnessModal;
