import { Link } from "react-router-dom";
import { useAppDispatch, useCurrentUser } from "../../hooks/hooks";
import { logOut } from "../../redux/slices/userSlice";
import logo from "../../assets/logo/NetflixLogo.webp";
import "./Navbar.css";

export const Navbar = () => {
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
