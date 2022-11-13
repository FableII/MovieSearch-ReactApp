/// ВНИМАНИЕ ЭТО ТЕСТ !!!!!!!!!!!!!!!!!!

/* import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MovieResponse {
  title?: string;
  [propName: string]: any;
}

export interface MovieResponse1 {
  Search: any[];
  totalResults: string;
  Response: string;
}

export interface MovieResponse2 {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieResponse3 {
  Title: string;
  Year: string;
  Poster: string;
}

const API_KEY = 'fda38699'
const APIKey = '53c800d'; 

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  tagTypes: ['Movies'],
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    getAllMovies: build.query<any, void>({
      query: () => ({
        url: `?apikey=${APIKey}&s=the_lord`,
        method: "GET",
      }),
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
        return res; 
      },
    }),
  })
});

export const { useGetAllMoviesQuery, useGetOneMovieQuery, useSearchMovieQuery } = moviesApi; */ // ВЕРСИЯ ДЛЯ TS

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKey = "53c800d";

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
    fetchMovies: build.query<Record<string, any>[], string>({
      query: (query) => ({
        url: `?apikey=${APIKey}&s=${query}`,
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
  }),
});

export const { useFetchAllMoviesQuery, useFetchOneMovieQuery, useFetchMoviesQuery} = moviesAPI;
