import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKey = "fda38699"; //закинуть в .env
export interface MovieResponse {
  Search: Array<MovieSearch[]>;
  totalResults: string;
  Response: string;
}

export interface MovieSearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieInfo { //разгрести
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbID: string;
  Type: string;
  BoxOffice: string;
}

export const moviesAPI = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    fetchAllMovies: build.query<Record<string, any>[], void>({
      query: () => ({
        url: `?apikey=${APIKey}&s=the_lord&type=movie`,
      }),
      transformResponse: (data: MovieResponse) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj: Record<string, MovieSearch> = {};
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
        url: `?apikey=${APIKey}&t=${query}&plot=full`,
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
        url: `?apikey=${APIKey}&s=${query}&type=movie`,
      }),
      transformResponse: (data: MovieResponse) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj: Record<string, MovieSearch> = {};
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
