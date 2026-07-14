import "./ActivityCard.css";
import logo from "../../assets/logo1.png";

function ActivityCard({ exercise, onCardClick, onCardAdd, isBuildMode }) {
  const name = exercise.name;
  const category = exercise.category;
  const imageUrl = exercise.imageUrl;

  const handleClick = () => onCardClick?.(exercise);
  const handleAdd = (e) => {
    e.stopPropagation();
    onCardAdd(exercise);
  };

  return (
    <li className="card" onClick={handleClick}>
      <img
        className={imageUrl ? "card__image" : "card__image card__image--logo"}
        src={imageUrl || logo}
        alt={name}
      />

      <div className="card__info">
        <h2 className="card__name">{name}</h2>
        <p className="card__category">{category}</p>
      </div>

      {isBuildMode && (
        <button className="card__add-btn" type="button" onClick={handleAdd}>
          + Add
        </button>
      )}
    </li>
  );
}

export default ActivityCard;
