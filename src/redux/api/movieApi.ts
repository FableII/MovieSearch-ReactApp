import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Search } from "../../utils/types/types";

const API_KEY = "fda38699";

export interface MovieResponse {
  Search: Record<string, Search>[];
  totalResults: string;
  Response: string;
}

export interface MovieInfo {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Released: string;
  Director: string;
  Actors: string;
  Plot: string;
  Country: string;
  imdbRating: string;
  BoxOffice: string;
}

export const moviesAPI = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    fetchAllMovies: build.query<Record<string, any>[], void>({
      query: () => ({
        url: `?apikey=${API_KEY}&s=the_lord&type=movie`,
      }),
      transformResponse: (data: MovieResponse) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj: Record<string, Search> = {};
          for (let key in data.Search[i]) {
            obj[key[0].toLowerCase() + key.slice(1)] = data.Search[i][key];
          }
          transformedData.push(obj);
        }

        return transformedData;
      },
    }),

    fetchOneMovie: build.query<any, string>({
      query: (query) => ({
        url: `?apikey=${API_KEY}&t=${query}&plot=full`,
      }),
      transformResponse: (data: Array<MovieInfo>) => {
        const transformedData: Record<string, MovieInfo> = {};

        for (let key in data) {
          transformedData[key.toLowerCase()] = data[key];
        }

        return transformedData;
      },
    }),
    fetchMovies: build.query({
      query: (query) => ({
        url: `?apikey=${API_KEY}&s=${query}`,
      }),
      transformResponse: (data: MovieResponse) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj: Record<string, Search> = {};
          for (let key in data.Search[i]) {
            obj[key[0].toLowerCase() + key.slice(1)] = data.Search[i][key];
          }
          transformedData.push(obj);
        }

        return transformedData;
      },
    }),
  }),
});

export const {
  useFetchAllMoviesQuery,
  useFetchOneMovieQuery,
  useFetchMoviesQuery,
} = moviesAPI;
