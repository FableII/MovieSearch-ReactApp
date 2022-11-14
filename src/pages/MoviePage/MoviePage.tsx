import { useParams, useLocation } from "react-router-dom";
import { useFetchOneMovieQuery } from "../../redux/api/movieApi";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleFavorite } from "../../redux/slices/userSlice";
import { Loader } from "../../components/Loader/Loader";
import { useCurrentUser } from "../../hooks/hooks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./MoviePage.css";

export const MoviePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const paramsName: string = useParams().name || "";

  const { data, isLoading } = useFetchOneMovieQuery(paramsName);

  const user = useCurrentUser();
  const isInFavorite = user?.favorites?.find(
    (el: { name: string; url: string }) => el.name === paramsName
  );
  console.log("isInFavorite", isInFavorite);

  const url = location.pathname;

  const toggleFavorites = () => {
    dispatch(
      toggleFavorite({ name: data?.title, url: url, userEmail: user.email })
    );
  };

  if (isLoading) {
    return (
      <div className="app__moviepage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="app__moviepage">
      <h1>Movie Info:</h1>
      <div className="app__moviepage-infoWrap">
        <div className="app__moviepage-infoWrap-poster">
          <img src={data?.poster} alt={data?.title} />
        </div>
        <div>
          <div className="app__moviepage-infoWrap-info">
            <span>Title:</span> {data?.title}
          </div>
          <div className="app__moviepage-infoWrap-info">
            <span>Year:</span> {data?.year}
          </div>
          <div className="app__moviepage-infoWrap-info">
            <span>Released:</span> {data?.released}
          </div>
          <div className="app__moviepage-infoWrap-info">
            <span>Genre:</span> {data?.genre}
          </div>
          <div className="app__moviepage-infoWrap-info">
            <span>Director:</span> {data?.director}
          </div>
          <div className="app__moviepage-infoWrap-info">
            <span>Actors:</span> {data?.actors}
          </div>
          <div className="app__moviepage-infoWrap-info">
            <span>About:</span> {data?.plot}
          </div>
        </div>
        <div className="app__moviepage-favorite">
          {user?.email ? (
            isInFavorite ? (
              <div className="app_favorite-button" onClick={toggleFavorites}>
                <p className="app_favorite-p">Delete from Favorites</p>
                <FavoriteIcon />
              </div>
            ) : (
              <div className="app_favorite-button" onClick={toggleFavorites}>
                <p className="app_favorite-p">Add to Favorites</p>
                <FavoriteBorderIcon />
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};