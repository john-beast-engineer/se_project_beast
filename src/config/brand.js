import wolverine from "../assets/wolverine.png";
import wolf from "../assets/Wolf.png"; // NOTE: capital W — matches the file on disk
import rhino from "../assets/rhino.png";
import elephant from "../assets/elephant.png";
import logoImage from "../assets/logo.png";

/**
 * Every brand-dependent value in the app. Components read from here instead of
 * hardcoding names, art, or copy — which is what makes the two repos diffable.
 */
export const BRAND = {
  id: "beast",
  name: "BeTheBeast",
  documentTitle: "BeTheBeast",

  // image = the logo art. wordmark = typed text under it, or null when the
  // art already contains the words (BeTheBeast's paw logo does).
  logo: { image: logoImage, alt: "BeTheBeast Logo", wordmark: null },

  pointsLabel: "XP",
  tiers: [
    { id: "wolverine", name: "Persistent Wolverine", threshold: 0, image: wolverine },
    { id: "wolf", name: "Resilient Wolf", threshold: 560, image: wolf },
    { id: "rhino", name: "Relentless Rhino", threshold: 1320, image: rhino },
    { id: "elephant", name: "Apex Elephant", threshold: 2360, image: elephant },
  ],

  copy: {
    completedWorkoutsHeading: "Completed workouts",
    completedWellnessHeading: "Completed wellness",
    loginToTrackWorkouts: "Log in to track your conquered workouts.",
    noWorkoutsYet: "No workouts conquered yet.",
    loginToTrackWellness: "Log in to track your wellness practice.",
    noWellnessYet: "No activities completed yet.",
  },
};

export function applyBrand() {
  document.title = BRAND.documentTitle;
}
