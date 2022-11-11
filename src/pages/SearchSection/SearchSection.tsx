import React, { useState, Suspense } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetAllMoviesQuery, useGetOneMovieQuery } from "../../redux/api/moviesApi";
import { useAppDispatch, useCurrentUser, useDebounce } from "../../hooks/hooks";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Loader } from "../../components/Loader/Loader";
import "./SearchSection.css";
import "./BooksSection.css";

const SearchResults = React.lazy(
  () => import("../../components/SearchResults/SearchResults")
);

export const SearchSection = () => {
  const dispatch = useAppDispatch();
  const userEmail = useCurrentUser()?.email as string;
  const location = useLocation();
  const bookName = new URLSearchParams(location.search).get("search");
  const navigate = useNavigate();

  const { data = [], isLoading } = useGetAllMoviesQuery();
  console.log(data.Search);
 /*  const data: Array<any> = []; //ТЕСТОВО
  const isLoading = true; //ТЕСТОВО */

  const [searchName, setSearchName] = useState(bookName || "");
  const debouncedSearchName = useDebounce(searchName, 1500);

  const onChange = (e: { target: HTMLInputElement }) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="app__search">
      <h1 className="app__search-header">
        Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
      </h1>
      <div className="app__search-input">
        <SearchInput
          placeholder="Search"
          value={searchName}
          onChange={onChange}
        />
        {/* <button onClick={()=>console.log('click')} className="app__search-button">
          Search
        </button> */}
      </div>
      <div className="app__search-result">
        <h2>Movies found</h2>
        {debouncedSearchName ? (
          <Suspense fallback={<Loader />}>
            <SearchResults searchName={debouncedSearchName} />
          </Suspense>
        ) : isLoading ? (
          <Loader />
        ) : (<div className="app_result">
          <ul className="app__searchSection-ul">
            {data.Search.map((item:{id: number, Title: string, Poster: string}) => ( //ТУТ КРИВО РЕАЛИЗОВАЛ | СОЗДАТЬ ИНТЕРФЕЙС | А также создать компонет с КАРТОЧКОЙ
              <li className="app__searchSection-li" key={item.id}> 
                <Link to={`${item.Title}`}>{item.Title}</Link> 
                <img className="app__poster" src={item.Poster} alt="" />
              </li>
            ))}
            {/* <li>{data.Search[0].Title}</li> */}
          </ul>
          </div>
        )}
      </div>
    </div>
  );
};
