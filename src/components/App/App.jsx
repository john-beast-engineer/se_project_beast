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
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isAuthChecking, setIsAuthChecking] = useState(true);

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

  const handleOpenRegister = () => setActiveModal("register");
  const handleOpenLogin = () => setActiveModal("login");
  const handleCloseModal = () => setActiveModal("");

  const handleRegister = ({ name, email, password }) => {
    register({ name, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => console.error(err));
  };

  const handleLogin = ({ email, password }) => {
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
      .catch((err) => console.error(err));
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
            <Route index element={<Browse isLoggedIn={isLoggedIn} />} />
            <Route path="browse" element={<Browse isLoggedIn={isLoggedIn} />} />
            <Route
              path="saved"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isAuthChecking={isAuthChecking}
                >
                  <Workouts />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/wellness" element={<WellnessSection />}>
            <Route index element={<WellnessBrowse />} />
          </Route>
        </Routes>

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onSwitchToLogin={handleOpenLogin}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onSwitchToRegister={handleOpenRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
