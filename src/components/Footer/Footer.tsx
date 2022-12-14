import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="app__footer">
      <ul className="app__footer__list">
        <li className="app__footer__list-item advanced">
          <Link to="/search">Advanced search</Link>
        </li>
        <li className="app__footer__list-item">
          <Link to="/">About</Link>
        </li>
        <li className="app__footer__list-item">
          <Link to="/">Contacts</Link>
        </li>
      </ul>

      <p>Netflix &copy; 2022</p>
    </footer>
  );
};
