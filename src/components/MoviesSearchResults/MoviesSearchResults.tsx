import { useFetchMoviesQuery } from "../../redux/api/movieApi";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MoviesSearchResults.css";

type MovieSearchResultsProps = {
  searchName: string;
};

const MoviesSearchResults = (props: MovieSearchResultsProps) => {
  const { searchName } = props;
  const { data, error, isLoading, isFetching } =
    useFetchMoviesQuery(searchName);
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

  if (movies === undefined) {
    return <div className="app__moviesSection-hint">No movies found</div>;
  }
  if (movies.length >= 1) {
    return (
      <section className="app__movies-section">
        {movies.map((movie: any) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </section>
    );
  }

  return null;
};

export default MoviesSearchResults;
