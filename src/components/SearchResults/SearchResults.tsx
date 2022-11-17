import { useFetchMoviesQuery } from "../../redux/api/movieApi";
import { MovieCard } from "../MovieCard/MovieCard";
import { Search } from "../../utils/types/types";
import "./SearchResults.css";

type Props = {
  searchName: string;
};

const SearchResults = (props: Props) => {
  const { searchName } = props;
  const { data, error, isLoading, isFetching } =
    useFetchMoviesQuery(searchName);
  const movies = data ?? [];
  console.log("MOVIES!", movies);

  if (error) {
    return (
      <div className="app__moviesSection-hint">Error or too many results</div>
    );
  }

  if (isLoading) {
    return <div className="app__moviesSection-hint">Loading...</div>;
  }

  if (isFetching) {
    return <div className="app__moviesSection-hint">Fetching...</div>;
  }
  if (movies.length === 0) {
    return <div className="app__moviesSection-hint">No results</div>;
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

export default SearchResults;
