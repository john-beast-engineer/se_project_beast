import "./ExerciseModal.css";

function ExerciseModal({ exercise, onClose, onAddToWorkout, isBuildMode }) {
  const name = exercise.translations[0]?.name;
  const category = exercise.category?.name;
  const imageUrl = exercise.images[0]?.image;
  const description = exercise.translations[0]?.description;

  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onClose} />

        {imageUrl && <img className="modal__image" src={imageUrl} alt={name} />}

        <div className="modal__content">
          <h2 className="modal__caption">{name}</h2>
          <p className="modal__category">{category}</p>
          <div
            className="modal__description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {isBuildMode && (
            <button
              className="modal__complete-btn"
              type="button"
              onClick={() => onAddToWorkout(exercise)}
            >
              Add to Workout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseModal;
