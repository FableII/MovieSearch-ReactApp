import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IMovieResponse {
  name?: string;
  [propName: string]: any;
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  tagTypes: ['Movies'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anapioficeandfire.com/api/books/' }),
  endpoints: (build) => ({
    getAllMovies: build.query<Record<string, any>[], void>({
      query: () => '',
    }),
    getOneMovie: build.query<IMovieResponse, string>({
      query: (name) => ({
        url: `?name=${name}`,
        method: "GET",
      }),
      transformResponse: (res: Array<IMovieResponse>) => res[0]
    }),
    searchMovie: build.query<IMovieResponse, string>({
      query: (name) => ({
        url: `?name=${name}`,
        method: "GET",
      }),
      transformResponse: (res: Array<IMovieResponse> | []) => {
        return res
          .filter((el) => el.name) //СЮДА ОБРАТИТЬ ВНИМАНИЕ
          .map((el) => {
            return {
              name: el.name,
              authors: el.authors[0],
              mediaType: el.mediaType,
              isbn: el.isbn,
              numberOfPages: el.numberOfPages,
              publisher: el.publisher,
              released: el.released
            };
          });
      },
    }),
  })
});

export const { useGetAllMoviesQuery, useGetOneMovieQuery, useSearchMovieQuery } = moviesApi;
