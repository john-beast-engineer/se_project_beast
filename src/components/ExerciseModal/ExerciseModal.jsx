import "./ExerciseModal.css";
import logo from "../../assets/logo1.png";

function getYouTubeEmbed(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function ExerciseModal({ exercise, onClose, onAddToWorkout, isBuildMode }) {
  const name = exercise.name;
  const category = exercise.category;
  const imageUrl = exercise.imageUrl;
  const description = exercise.description;
  const videoUrl = exercise.videoUrl;
  const youTubeEmbed = getYouTubeEmbed(videoUrl);

  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onClose} />

        <h2 className="modal__caption">{name}</h2>
        <p className="modal__category">{category}</p>

        {youTubeEmbed ? (
          <iframe
            className="modal__video"
            src={youTubeEmbed}
            title={name}
            allowFullScreen
          />
        ) : videoUrl ? (
          <a
            className="modal__video-link"
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ Watch video
          </a>
        ) : (
          <img className="modal__image" src={imageUrl || logo} alt={name} />
        )}

        <div className="modal__content">
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
