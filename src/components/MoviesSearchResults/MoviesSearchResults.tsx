import { useFetchMoviesQuery } from "../../redux/api/movieApi";
import { MovieCard } from "../MovieCard/MovieCard";
import { Search } from "../../utils/types/types";
import "./MoviesSearchResults.css";

type Props = {
  searchName: string;
};

const MoviesSearchResults = (props: Props) => {
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
  if (movies.length === 0) {
    return <div className="app__moviesSection-hint">No movies found</div>;
  }
  if (movies.length >= 1) {
    return (
      <section className="app__movies-section">
        {movies.map((movie: Record<string, Search>) => (
          <MovieCard {...movie} />
        ))}
      </section>
    );
  }

  return null;
};

export default MoviesSearchResults;
