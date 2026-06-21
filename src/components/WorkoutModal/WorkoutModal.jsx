import { getEnglishName } from "../../utils/wgerApi.js";
import "./WorkoutModal.css";

function WorkoutModal({ workout, onClose, onComplete }) {
  return (
    <div className="workout-modal">
      <div className="workout-modal__container">
        <button
          className="workout-modal__close"
          type="button"
          onClick={onClose}
        >
          x
        </button>
        <h2 className="workout-modal__title">{workout.name}</h2>

        <ul className="workout-modal__list">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="workout-modal__item">
              {getEnglishName(exercise)}
              {exercise.sets && ` - ${exercise.sets} x ${exercise.reps}`}
            </li>
          ))}
        </ul>
        {workout.completed ? (
          <p className="workout-modal__done">✓ Completed</p>
        ) : (
          <button
            className="workout-modal__complete"
            type="button"
            onClick={onComplete}
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkoutModal;
