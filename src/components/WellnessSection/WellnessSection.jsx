import { Outlet } from "react-router-dom";
import "./WellnessSection.css";

function WellnessSection() {
  return (
    <section className="wellness-section">
      <Outlet />
    </section>
  );
}

export default WellnessSection;
