import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  const getNavClass = ({ isActive }) =>
    `header__nav-item ${isActive ? "header__nav-item_active" : ""}`;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img
            className="header__logo-image"
            src={logo}
            alt="BeTheBeast Logo"
          />
        </Link>
        <nav className="header__nav">
          <NavLink to="/" end className={getNavClass}>
            Browse
          </NavLink>
          <NavLink to="/completed" className={getNavClass}>
            Completed
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
