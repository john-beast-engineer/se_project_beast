import "./XpBar.css";

function XpBar({ current, max }) {
  const percent = Math.min((current / max) * 100, 100); // clamp so it never exceeds 100

  return (
    <div className="xp-bar">
      <div className="xp-bar__fill" style={{ width: `${percent}%` }}>
      </div>
      <span className="xp-bar__label">{current} / {max} XP</span>
    </div>
  );
}

export default XpBar;