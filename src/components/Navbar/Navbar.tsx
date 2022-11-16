import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useCurrentUser } from "../../hooks/hooks";
import { logOut } from "../../redux/slices/userSlice";
import logo from "../../assets/logo/NetflixLogo.webp";
import { ThemeContext } from "../ThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./Navbar.css";

export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const { isAuth, username, email } = useCurrentUser() || {};

  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logOut(email));
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar__logo">
        <Link to="/">
          <img className="app__logo" src={logo} alt="logo" />
        </Link>
        {theme === "light" ? (
          <div onClick={toggleTheme} className="mode__wrap mode__wrap-light">
            <DarkModeIcon className="mode-icon" />
            <div>Dark mode</div>
          </div>
        ) : (
          <div onClick={toggleTheme} className="mode__wrap mode__wrap-night">
            <LightModeIcon className="mode-icon" />
            <div>Light mode</div>
          </div>
        )}
      </div>

      <ul className="app__navbar__list">
        {isAuth && (
          <>
            <li className="app__navbar__list-item">
              <Link to="/movies">Search</Link>
            </li>
            <li className="app__navbar__list-item">
              <Link to="/favorites">Favorites</Link>
            </li>
            <li className="app__navbar__list-item">
              <Link to="/history">History</Link>
            </li>
          </>
        )}

        {isAuth ? (
          <>
            <li onClick={logout} className="app__navbar__list-item logout">
              Log Out
            </li>
            <li className="app__navbar__list-item username">{username?.[0]}</li>
          </>
        ) : (
          <>
            <li className="app__navbar__list-item">
              <Link to="/movies">Search</Link>
            </li>
            <li className="app__navbar__list-item">
              <Link to="/signin">Favorites</Link>
            </li>
            <li className="app__navbar__list-item">
              <Link to="/signin">History</Link>
            </li>
            <li className="app__navbar__list-item">
              <Link to="/signin">Sign in</Link>
            </li>
            <li className="app__navbar__list-item">
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
