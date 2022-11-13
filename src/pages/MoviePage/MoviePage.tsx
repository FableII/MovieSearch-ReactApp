import { useParams, useLocation } from "react-router-dom";
/* import { useGetOneMovieQuery } from "../../redux/api/moviesApi"; */ //STABLE
import { useFetchOneMovieQuery } from "../../redux/api/movieApi"; // ТЕСТИМ
import { useAppDispatch } from "../../hooks/hooks";
import { toggleFavorite } from "../../redux/slices/userSlice";
import { Loader } from "../../components/Loader/Loader";
import { useCurrentUser } from "../../hooks/hooks";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './MoviePage.css';


export const MoviePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const paramsName: string = useParams().name || '';

/*   const { data, isLoading } = useGetOneMovieQuery(paramsName);  */// STABLE

  const { data, isLoading} = useFetchOneMovieQuery(paramsName); // ТЕСТИМ
  console.log(data);

  const user = useCurrentUser();
  const isInFavorite = user?.favorites?.find((el: { name: string, url: string }) => el.name === paramsName);
  const url = location.pathname;

  const toggleFavorites = () => {
    dispatch(toggleFavorite({ name: data?.name, url: url, userEmail: user.email }));
  }

  if (isLoading) {
    return (
      <div className="app__moviepage">
        <Loader />
      </div>
    )
  }

  return (
    <div className="app__moviepage">
      <h1>Movie Info:</h1>
      <div className="app__moviepage-infoWrap">
        <div className="app__moviepage-infoWrap-info"><span>Title:</span> {data?.name}</div>
        <div className="app__moviepage-infoWrap-info"><span>Author:</span> {data?.authors[0]}</div>
        <div className="app__moviepage-infoWrap-info"><span>Cover:</span> {data?.mediaType}</div>
        <div className="app__moviepage-infoWrap-info"><span>ISBN:</span> {data?.isbn}</div>
        <div className="app__moviepage-infoWrap-info"><span>Number of Pages:</span> {data?.numberOfPages}</div>
        <div className="app__moviepage-infoWrap-info"><span>Publisher:</span> {data?.publisher}</div>
        <div className="app__moviepage-infoWrap-info"><span>Release Date:</span> {data?.released?.slice(0, 10)}</div>

        {
          user?.email ? (
            isInFavorite ?
              <div className="app_favorite-button" onClick={toggleFavorites}>
                <p className="app_favorite-p">Delete from Favorites</p>
                <FavoriteIcon />
              </div>
              :
              <div className="app_favorite-button" onClick={toggleFavorites}>
                <p className="app_favorite-p">Add to Favorites</p>
                <FavoriteBorderIcon />
              </div>
          ) : null
        }

      </div>
    </div>
  )
}
