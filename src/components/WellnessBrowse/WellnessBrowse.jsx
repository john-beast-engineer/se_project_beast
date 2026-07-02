import { useState } from "react";
import WellnessCard from "../WellnessCard/WellnessCard.jsx";
import WellnessModal from "../WellnessModal/WellnessModal.jsx";
import { wellnessActivities } from "../../utils/wellnessActivities.js";
import { completeWellnessActivity } from "../../utils/storage.js";
import "./WellnessBrowse.css";

function WellnessBrowse() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleCardClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseModal = () => setSelectedActivity(null);

  const handleComplete = () => {
    completeWellnessActivity(selectedActivity.id)
      .then(() => {
        setSelectedActivity(null);
      })
      .catch(console.error);
  };

  return (
    <main className="wellness-browse">
      <h2>Wellness activities</h2>

      <ul className="wellness-browse__list">
        {wellnessActivities.map((activity) => (
          <WellnessCard
            key={activity.id}
            activity={activity}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>

      {selectedActivity && (
        <WellnessModal
          activity={selectedActivity}
          onClose={handleCloseModal}
          onComplete={handleComplete}
        />
      )}
    </main>
  );
}

export default WellnessBrowse;
