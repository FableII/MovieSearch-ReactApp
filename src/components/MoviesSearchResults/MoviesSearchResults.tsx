import React from "react";
import { Link } from "react-router-dom";
import { useFetchMoviesQuery } from "../../redux/api/movieApi"; // Тестим (SUCCES)
/* import { useSearchMovieQuery, IMovieResponse } from "../../redux/api/moviesApi"; */ //STABLE
import "./MoviesSearchResults.css";

type MovieSearchResultsProps = {
  searchName: string;
};


const MoviesSearchResults = (props: MovieSearchResultsProps) => {
  const { searchName } = props;
 /*  const { data, error, isLoading, isFetching } = useSearchMovieQuery(searchName); */ //STABLE
 const { data, error, isLoading, isFetching } = useFetchMoviesQuery(searchName);
  const movies = data ?? [];

  if (error) {
    return (
      <div className="app__moviesSection-hint">Error while fetching movies</div>
    );
  }

  if (isLoading) {
    return <div className="app__moviesSection-hint">Loading movies...</div>;
  }

  if (isFetching) {
    return <div className="app__moviesSection-hint">Fetching movies...</div>;
  }

  if (movies.length === 0) {
    return <div className="app__moviesSection-hint">No movies found</div>;
  }
  if (movies.length >= 1) {
    return (
      <ul className='app__moviesSection-ul'>
        {movies.map((item: any) => // УКАЗАТЬ ИНТЕРФЕЙС
          <li className='app__moviesSection-li' key={item.imdbID}>
            <Link to={`${item.title}`}>{item.title}</Link>
          </li>
        )}
      </ul>
    );
  }

  return null;
};

export default MoviesSearchResults;

{/* <ul className="app__moviesSection-ul">
        {movies.map((item: IMovieResponse) => (
          <li className="app__moviesSection-li" key={item.isbn}>
            <Link to={`${item.name}`}>{item.name}</Link>
          </li>
        ))}
      </ul> */} // STABLE
