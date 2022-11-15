import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteFavorite } from "../../redux/slices/userSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { User } from "../../redux/slices/userSlice";
import { useAppSelector, useCurrentUser } from "../../hooks/hooks";
import "./FavoritesPage.css";

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const usersFromState = useAppSelector((state) => state.user);
  let curentFavoritsUser: User = {};
  const userIsAuth = useCurrentUser();

  if (userIsAuth?.email) {
    curentFavoritsUser = usersFromState[`${userIsAuth.email}`];
  }

  const deleteFavorites = (el: { name: string; url: string }) => {
    dispatch(deleteFavorite({ name: el.name, userEmail: userIsAuth.email }));
  };

  if (curentFavoritsUser?.favorites?.length === 0) {
    return (
      <div className="app_favorites">
        <p className="app_favorites-empty-p">
          There is nothing in favorites yet!{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="app_favorites">
      <p className="app_favorites-full-p">Favorites list</p>
      <ul className="app__favorites-ul">
        {curentFavoritsUser?.favorites
          ?.filter((el) => el.name !== undefined && el.url !== undefined)
          .map((el: { name: string; url: string }, i: number) => (
            <li className="app__favorites-li" key={i}>
              <Link to={el.url}>{el.name}</Link>
              <div onClick={() => deleteFavorites(el)}>
                <FavoriteIcon />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
