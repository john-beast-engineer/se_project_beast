import "./WorkoutCard.css";

function WorkoutCard({ workout, onCardClick, onDelete }) {
  const name = workout.name;
  const count = workout.exercises.length;

  const handleClick = () => {
    onCardClick?.(workout);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(workout._id);
  };

  return (
    <li className="workout-card" onClick={handleClick}>
      <div className="workout-card__header">
        {" "}
        {/* NEW: flex row holding title + X */}
        <h2 className="workout-card__name">{name}</h2>
        <button
          className="workout-card__delete"
          type="button"
          onClick={handleDelete}
        >
          ×
        </button>
      </div>
      <p className="workout-card__count">{count} exercises</p>
      {workout.completed && <span className="workout-card__done">✓ Done</span>}
    </li>
  );
}

export default WorkoutCard;
