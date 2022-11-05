import "./Navbar.css";
import logo from "../../assets/logo/NetflixLogo.webp";

export const Navbar = () => {
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img className="app__logo" src={logo} alt="logo" />
      </div>

      <ul className="app__navbar-links">
        <li className="app__navbar-item">
          <a href="#">Search</a>
        </li>
        <li className="app__navbar-item">
          <a href="#">Favorites</a>
        </li>
        <li className="app__navbar-item">
          <a href="#">History</a>
        </li>
        <li className="app__navbar-item">
          <a href="#">Sign-in</a>
        </li>
      </ul>
    </nav>
  );
};
