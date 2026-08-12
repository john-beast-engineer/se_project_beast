import { useState } from "react";
import "./WorkoutModal.css";
import logo from "../../assets/logo1.png";

function getYouTubeEmbed(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function WorkoutModal({
  workout,
  onClose,
  onComplete,
  onRemoveExercise,
  onAddExercise,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = (index) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

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

        {!workout.completed && (
          <button
            className="workout-modal__edit"
            type="button"
            onClick={() => setIsEditing((v) => !v)}
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        )}

        <ul className="workout-modal__list">
          {workout.exercises.map((exercise, index) => {
            const isExpanded = expandedIndex === index;
            const youTubeEmbed = getYouTubeEmbed(exercise.videoUrl);

            return (
              <li key={index} className="workout-modal__item">
                <div className="workout-modal__row-wrap">
                  <button
                    className="workout-modal__row"
                    type="button"
                    onClick={() => handleToggle(index)}
                  >
                    <span>
                      {exercise.name}
                      {exercise.sets &&
                        ` - ${exercise.sets} x ${exercise.reps}`}
                    </span>
                    <span className="workout-modal__chevron">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>

                  {isEditing && (
                    <button
                      className="workout-modal__remove"
                      type="button"
                      onClick={() => onRemoveExercise(exercise.id)}
                    >
                      ×
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="workout-modal__detail">
                    {youTubeEmbed ? (
                      <iframe
                        className="workout-modal__video"
                        src={youTubeEmbed}
                        title={exercise.name}
                        allowFullScreen
                      />
                    ) : exercise.videoUrl ? (
                      <a
                        className="workout-modal__video-link"
                        href={exercise.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ▶ Watch video
                      </a>
                    ) : (
                      <img
                        className="workout-modal__image"
                        src={exercise.imageUrl || logo}
                        alt={exercise.name}
                      />
                    )}

                    {exercise.description && (
                      <div
                        className="workout-modal__description"
                        dangerouslySetInnerHTML={{
                          __html: exercise.description,
                        }}
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {isEditing && (
          <button
            className="workout-modal__add"
            type="button"
            onClick={onAddExercise}
          >
            + Add Exercise
          </button>
        )}

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
