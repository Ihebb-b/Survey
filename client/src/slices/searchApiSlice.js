import { apiSlice } from "./apiSlice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USERS_URL = "/api/search";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchStatistics: builder.query({
      query: (query) => ({
        url: `${USERS_URL}/search`,
        params: { query },
      }),
      providesTags: ["Search"],
    }),
    advancedSearch: builder.query({
      query: ({ gender, ageMin, ageMax, country, page = 1, limit =10 }) => ({
        url: `${USERS_URL}/advanced-search`,
        params: { gender, ageMin, ageMax, country, page, limit },
      }),
      providesTags: ["AdvancedSearch"],
    }),

    getAllSuggestions: builder.query({
      query: () => ({
        url: `${USERS_URL}/suggestions`,
      }),
      providesTags: ["Suggestions"],
    }),
  
  }),


});

export const {useSearchStatisticsQuery,
  useAdvancedSearchQuery,
  useGetAllSuggestionsQuery,} = searchApiSlice;
