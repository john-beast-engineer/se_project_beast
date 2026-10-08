import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./ActivityCard.css";
import logo from "../../assets/logo1.png";

function ActivityCard({
  exercise,
  onCardClick,
  onCardAdd,
  onCardDelete,
  isBuildMode,
}) {
  const currentUser = useContext(CurrentUserContext);

  const name = exercise.name;
  const category = exercise.category;
  const imageUrl = exercise.imageUrl;
  const isCustom =
    exercise.source === "custom" && exercise.owner === currentUser._id;

  const handleClick = () => onCardClick?.(exercise);
  const handleAdd = (e) => {
    e.stopPropagation();
    onCardAdd(exercise);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    onCardDelete(exercise._id);
  };

  console.log(exercise.owner, currentUser._id);

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

      {isCustom && onCardDelete && (
        <button
          className="card__delete-btn"
          type="button"
          onClick={handleDelete}
        >
          ×
        </button>
      )}

      {isBuildMode && (
        <button className="card__add-btn" type="button" onClick={handleAdd}>
          + Add
        </button>
      )}
    </li>
  );
}

export default ActivityCard;
