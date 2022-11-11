import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MovieResponse {
  title?: string;
  [propName: string]: any;
}

const API_KEY = 'fda38699'
const APIKey = '53c800d'; //тестовый

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  tagTypes: ['Movies'],
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    getAllMovies: build.query<any, void>({ // Record<string, any>[] вместо ANY
      query: () => ({
        url: `?apikey=${APIKey}&s=the_witcher`,
        method: "GET",
      }),
      transformResponse: (res: Array<MovieResponse>) => {
      return res;
       }
    }),
    getOneMovie: build.query<MovieResponse, string>({
      query: (title) => ({
        url: `?apikey=${APIKey}&t=${title}&plot=full`,
        method: "GET",
      }),
      transformResponse: (res: Array<MovieResponse>) => {
       console.log(res);
        return res[0];
      }
    }),
    searchMovie: build.query<MovieResponse, string>({
      query: (title) => ({
        url: `?apikey=${APIKey}&s=${title}`,
        method: "GET",
      }),
      transformResponse: (res: Array<MovieResponse> | []) => {
        console.log(res);
        return res; // НЕ ЗАБЫТЬ ДОБАВИТЬ ФИЛЬТРАЦИЮ
      },
    }),
  })
});

export const { useGetAllMoviesQuery, useGetOneMovieQuery, useSearchMovieQuery } = moviesApi;


