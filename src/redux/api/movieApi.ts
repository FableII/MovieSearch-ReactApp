import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKey = "fda38699";

export interface ISearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieResponse {
  Search: ISearch[];
  totalResults: string;
  Response: string;
}

export const moviesAPI = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    fetchAllMovies: build.query<Record<string, any>[], void>({
      query: () => ({
        url: `?apikey=${APIKey}&s=the_lord`,
      }),
      transformResponse: (data: Record<any, any>) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj: Record<any, any> = {};
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
      transformResponse: (data: Array<ISearch>) => {
        const transformedData: any = {};

        for (let key in data) {
          transformedData[key.toLowerCase()] = data[key];
        }

        return transformedData;
      },
    }),
    fetchMovies: build.query({
      query: (query) => ({
        url: `?apikey=${APIKey}&s=${query}`,
      }),
      transformResponse: (data: any) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj: any = {};
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
