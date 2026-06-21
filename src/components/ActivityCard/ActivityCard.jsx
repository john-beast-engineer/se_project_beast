import { getEnglishName } from "../../utils/wgerApi.js";
import "./ActivityCard.css";
import logo from "../../assets/logo1.png";

function ActivityCard({ exercise, onCardClick, onCardAdd, isBuildMode }) {
  const name = getEnglishName(exercise);
  const category = exercise.category?.name;
  const imageUrl = exercise.images[0]?.image || logo;

  const handleClick = () => {
    onCardClick?.(exercise);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onCardAdd(exercise);
  };

  return (
    <li className="card" onClick={handleClick}>
      {imageUrl && <img className="card__image" src={imageUrl} alt={name} />}

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
