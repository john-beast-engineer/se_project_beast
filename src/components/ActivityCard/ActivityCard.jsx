import "./ActivityCard.css";
import logo from "../../assets/logo1.png";

function ActivityCard({ exercise, onCardClick }) {
  // ✍️ Wire these to the wger paths — same idea as reading item.name in
  //    ItemCard, just nested deeper. The ?. keeps a missing piece from crashing the card.
  const name = exercise.translations[0]?.name; //      → exercise.translations[0]?.name
  const category = exercise.category?.name; //  → exercise.category?.name
  const imageUrl = exercise.images[0]?.image || logo; //  → exercise.images[0]?.image   ⚠️ can be empty

  const handleClick = () => {
    onCardClick?.(exercise);
  };

  return (
    <li className="card" onClick={handleClick}>
      {imageUrl && <img className="card__image" src={imageUrl} alt={name} />}

      <div className="card__info">
        <h2 className="card__name">{name}</h2>
        <p className="card__category">{category}</p>
      </div>
    </li>
  );
}

export default ActivityCard;
