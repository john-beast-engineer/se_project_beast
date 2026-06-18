import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Browse from "../Browse/Browse.jsx";
import Completed from "../Completed/Completed.jsx";
import "./App.css";

function App() {

  return (
    <div className="page">
      {/* Header, Main, Footer / routes land here */}
      <Header />
      <Routes>
        <Route path="/" element={<Completed />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
}

export default App;
