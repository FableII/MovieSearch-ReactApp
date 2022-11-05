import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo/NetflixLogo.webp";

export const Navbar = () => {
  return (
    <nav className="app__navbar">
      <div className="app__navbar__logo">
        <Link to="/">
          {" "}
          <img className="app__logo" src={logo} alt="logo" />{" "}
        </Link>
      </div>
      <ul className="app__navbar__list">
        <li className="app__navbar__list-item">
          <Link to="/search">Search</Link>
        </li>
        <li className="app__navbar__list-item">
          <Link to="/favorites">Favorites</Link>
        </li>
        <li className="app__navbar__list-item">
          <Link to="/history">History</Link>
        </li>
        <li className="app__navbar__list-item">
          <Link to="/signup">Sign-up</Link>
        </li>
      </ul>
    </nav>
  );
};
