import React, { useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useCurrentUser, useDebounce } from "../../hooks/hooks";
import { useFetchAllMoviesQuery } from "../../redux/api/movieApi";
import { postHistory } from "../../redux/slices/userSlice";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Loader } from "../../components/Loader/Loader";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import "./MoviesSection.css";

const MoviesSearchResults = React.lazy(
  () => import("../../components/MoviesSearchResults/MoviesSearchResults")
);

export const MoviesSection = () => {
  const dispatch = useAppDispatch();
  const userEmail = useCurrentUser()?.email as string;
  const location = useLocation();
  const movieName = new URLSearchParams(location.search).get("search");
  const navigate = useNavigate();

  const { data = [], isLoading } = useFetchAllMoviesQuery();
  const [searchName, setSearchName] = useState(movieName || "");
  const debouncedSearchName = useDebounce(searchName, 1500);

  const onChange = (e: { target: HTMLInputElement }) => {
    setSearchName(e.target.value);
  };

  React.useEffect(() => {
    if (searchName.length > 0) {
      const url = `${location.pathname}?search=${debouncedSearchName}`;
      dispatch(postHistory({ url, userEmail }));
      navigate(`?search=${debouncedSearchName}`);
    }
  }, [debouncedSearchName]);

  return (
    <div className="app__moviesSection">
      <h1>
        Our searchable database includes millions of movies, TV and
        entertainment programs and cast and crew members. Enjoy!
      </h1>
      <SearchInput
        placeholder="Search..."
        className="app__moviesSection-input"
        value={searchName}
        onChange={onChange}
      />

      <h2>Movies found:</h2>

      {debouncedSearchName ? (
        <Suspense fallback={<Loader />}>
          <MoviesSearchResults searchName={debouncedSearchName} />
        </Suspense>
      ) : isLoading ? (
        <Loader />
      ) : (
        <section className="app__movies-section">
          {data.map((movie: Record<any,any>) => (
            <MovieCard key={movie.itemIDB} {...movie} />
          ))}
        </section>
      )}
    </div>
  );
};
