import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Browse from "../Browse/Browse.jsx";
import Workouts from "../Workouts/Workouts.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import WorkoutSection from "../WorkoutSection/WorkoutSection.jsx";
import WellnessSection from "../WellnessSection/WellnessSection.jsx";
import WellnessBrowse from "../WellnessBrowse/WellnessBrowse.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { register, login, checkToken } from "../../utils/auth.js";
import { setToken, getToken, removeToken } from "../../utils/token.js";
import BottomNav from "../BottomNav/BottomNav.jsx";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [authError, setAuthError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [workoutBeingEdited, setWorkoutBeingEdited] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAuthChecking(false);
      return;
    }
    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error)
      .finally(() => setIsAuthChecking(false));
  }, []);

  const handleOpenRegister = () => {
    setActiveModal("register");
    setAuthError("");
    setRegisterError("");
  };
  const handleOpenLogin = () => {
    setActiveModal("login");
    setAuthError("");
    setRegisterError("");
  };
  const handleCloseModal = () => setActiveModal("");

  const handleRegister = ({ name, email, password }) => {
    setRegisterError("");
    register({ name, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => {
        if (String(err).includes("409")) {
          setRegisterError("That email is already registered.");
        } else {
          setRegisterError("Something went wrong. Please try again.");
        }
      });
  };

  const handleLogin = ({ email, password }) => {
    setAuthError("");
    login({ email, password })
      .then((res) => {
        setToken(res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        setAuthError("Incorrect email or password.");
      });
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={handleOpenLogin}
          onRegisterClick={handleOpenRegister}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />

          <Route path="/workout" element={<WorkoutSection />}>
            <Route
              index
              element={
                <Browse
                  isLoggedIn={isLoggedIn}
                  workoutBeingEdited={workoutBeingEdited}
                  setWorkoutBeingEdited={setWorkoutBeingEdited}
                />
              }
            />
            <Route
              path="browse"
              element={
                <Browse
                  isLoggedIn={isLoggedIn}
                  workoutBeingEdited={workoutBeingEdited}
                  setWorkoutBeingEdited={setWorkoutBeingEdited}
                />
              }
            />
            <Route
              path="saved"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isAuthChecking={isAuthChecking}
                >
                  <Workouts setWorkoutBeingEdited={setWorkoutBeingEdited} />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/wellness" element={<WellnessSection />}>
            <Route index element={<WellnessBrowse />} />
          </Route>
        </Routes>
        <BottomNav />

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={() => {
            handleCloseModal();
            setRegisterError("");
          }}
          onRegister={handleRegister}
          onSwitchToLogin={handleOpenLogin}
          registerError={registerError}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={() => {
            handleCloseModal();
            setAuthError("");
          }}
          onLogin={handleLogin}
          onSwitchToRegister={handleOpenRegister}
          authError={authError}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
