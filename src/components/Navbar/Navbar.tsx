import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo/NetflixLogo.webp";

export const Navbar = () => {
  return (
    <nav className="app__navbar">
      <div className="app__navbar__logo">
      <a href="#"><img className="app__logo" src={logo} alt="logo" /></a>
      </div>
      <ul className="app__navbar__list">
       <li><Link to="/search">Search</Link></li> 
        <li className="app__navbar__list-item">
          <a href="#">Search</a>
        </li>
        <li className="app__navbar__list-item">
          <a href="#">Favorites</a>
        </li>
        <li className="app__navbar__list-item">
          <a href="#">History</a>
        </li>
        <li className="app__navbar__list-item">
          <a href="#">Sign-in</a>
        </li>
      </ul>
    </nav>
  );
};
