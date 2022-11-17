import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./MovieCard.css";

interface Props {
  imdbID: string,
  poster: string,
  title: string,
}

export const MovieCard = (props: any) => {
  console.log("PROPS",props);
  const { poster, imdbID, title } = props;

  return (
    <div className="app__movie-item" key={imdbID}>
      <div className="app__movie-image">
        <img src={poster} alt="No poster"></img>
      </div>
      <Link to={title}>
        <Button buttonName="More" />
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.string),
  imdbID: PropTypes.string,
  Poster: PropTypes.string,
  Title: PropTypes.string,
};
