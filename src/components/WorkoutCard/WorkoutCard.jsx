import "./WorkoutCard.css";

function WorkoutCard({ workout, onCardClick }) {
  const name = workout.name;
  const count = workout.exercises.length;

  const handleClick = () => {
    onCardClick?.(workout);
  };

  return (
    <li className="workout-card" onClick={handleClick}>
      <h2 className="workout-card__name">{name}</h2>
      <p className="workout-card__count">{count} exercises</p>
      {workout.completed && <span className="workout-card__done">✓ Done</span>}
    </li>
  );
}

export default WorkoutCard;
