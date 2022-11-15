import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MovieCard.css';
import { Button } from '../Button/Button';

export const MovieCard = (props: Record<any, any>) => {
  const {
    poster,
    imdbID,
    title
  } = props;

  return (
    <div className='app__movie-item' key={imdbID}>
      <div className='app__movie-image'>
        <img src={poster} alt='No poster'></img>
      </div>
      <Link to={title}>
       <Button buttonName='More'/>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.string),
  imdbID: PropTypes.string,
  Poster: PropTypes.string,
  Title: PropTypes.string,
}