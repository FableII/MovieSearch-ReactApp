import React from "react";
import { Link } from "react-router-dom";
import { useSearchMovieQuery, MovieResponse } from '../../redux/api/moviesApi';
import './SearchResults.css';

type SearchResultsProps = {
  searchName: string;
};

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { searchName } = props;
  const { data, error, isLoading, isFetching } = useSearchMovieQuery(searchName);
  const books = data ?? [];

  if (error) {
    return <div className="app__moviesSection-hint">Error while fetching movies</div>;
  }

  if (isLoading) {
    return <div className="app__moviesSection-hint">Loading movies...</div>;
  }

  if (isFetching) {
    return <div className="app__moviesSection-hint">Fetching movies...</div>;
  }

  if (books.length === 0) {
    return <div className="app__moviesSection-hint">No movies found</div>;
  }
  if (books.length >= 1) {
    return (
      <ul className='app__moviesSection-ul'>
        {books.map((item: MovieResponse) =>
          <li className='app__moviesSection-li' key={item.isbn}>
            <Link to={`${item.name}`}>{item.name}</Link>
            {item.name}
          </li>
        )}
      </ul>
    );
  }

  return null;

};

export default SearchResults;
