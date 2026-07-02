import "./WellnessCard.css";

function WellnessCard({ activity, onCardClick }) {
  const handleClick = () => {
    onCardClick?.(activity);
  };

  return (
    <li className="wellness-card" onClick={handleClick}>
      <h3 className="wellness-card__name">{activity.name}</h3>
      <p className="wellness-card__category">{activity.category}</p>
    </li>
  );
}

export default WellnessCard;
