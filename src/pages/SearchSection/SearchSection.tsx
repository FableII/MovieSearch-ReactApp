import React, { useState, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useCurrentUser } from "../../hooks/hooks";
import { TYPE_FILTER } from "../../utils/constants/constants";
import { postHistory } from "../../redux/slices/userSlice";
import { Loader } from "../../components/Loader/Loader";
import { Button } from "../../components/Button/Button";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import "./SearchSection.css";

const SearchResults = React.lazy(
  () => import("../../components/SearchResults/SearchResults")
);

export const SearchSection = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const urlQuery = window.location.href.split("?")[1];
  const name = new URLSearchParams(location.search).get("name");
  const userEmail = useCurrentUser()?.email as string;

  const [filterState, setFilterState] = React.useState<Record<string, boolean>>(
    {}
  );
  const [query, setQuery] = React.useState(urlQuery || "Hobbit");
  const [searchName, setSearchName] = useState(name || "");
  const navigate = useNavigate();

  const onChange = (e: { target: HTMLInputElement }) => {
    setSearchName(e.target.value);
  };

  const clickOnFilterItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const value = target.innerText;
    target.classList.toggle("active");

    if (!filterState[value]) {
      const result = filterState;
      result[value] = true;
      setFilterState(result);
      setSearchName(name || "");
    } else {
      const result = filterState;
      result[value] = false;
      setFilterState(result);
      setSearchName(name || "");
    }
  };

  const applyFilters = () => {
    const resultQueryParams: string[] = [];
    resultQueryParams.push(`=${searchName}`);

    for (let key in filterState) {
      if (filterState[key]) {
        resultQueryParams.push(`type=${key}`);
      }
    }

    const url = `${location.pathname}?${resultQueryParams.join("&")}`;
    dispatch(postHistory({ url, userEmail }));
    navigate(`?${resultQueryParams.join("&")}`);
    setQuery(resultQueryParams.join("&"));
  };

  return (
    <div className="app__advancedSearch">
      <SectionHeader text="Advanced Search" />
      <div className="app__advancedSearch-input">
        <SearchInput value={searchName} onChange={onChange} />
        <Button buttonName="Search" onClick={applyFilters} />
      </div>
      <div className="app__advancedSearch-filterWrap">
        <span className="app__advancedSearch-filterType">Type :</span>
        <div className="app__advancedSearch-filterItems">
          {TYPE_FILTER.map((el, i) => {
            return (
              <div
                className="app__advancedSearch-filterItem"
                key={i}
                onClick={clickOnFilterItem}
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>

      <SectionHeader text="Search Result" />
      <Suspense fallback={<Loader />}>
        <SearchResults searchName={query} />
      </Suspense>
    </div>
  );
};
