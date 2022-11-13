import React, { useState, Suspense } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/moviesApi";
import { useAppDispatch, useCurrentUser, useDebounce } from "../../hooks/hooks";
import { Loader } from "../../components/Loader/Loader";
import { postHistory } from "../../redux/slices/userSlice";
import "./MoviesSection.css";
import { SearchInput } from "../../components/SearchInput/SearchInput";

const MoviesSearchResults = React.lazy(
  () => import("../../components/MoviesSearchResults/MoviesSearchResults")
);

export const MoviesSection = () => {
  const dispatch = useAppDispatch();
  const userEmail = useCurrentUser()?.email as string;
  const location = useLocation();
  const bookName = new URLSearchParams(location.search).get("search");
  const navigate = useNavigate();

  const { data = [], isLoading } = useGetAllMoviesQuery();
  const [searchName, setSearchName] = useState(bookName || "");
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
      <h1>Our searchable database includes millions of movies, TV and entertainment programs and cast and crew members. Enjoy!</h1>
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
        <ul className="app__moviesSection-ul">
          {data.map((item) => (
            <li className="app__moviesSection-li" key={item.isbn}>
              <Link to={`${item.name}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
