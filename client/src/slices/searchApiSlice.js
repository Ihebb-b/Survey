import { apiSlice } from "./apiSlice";
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
      query: ({ gender, ageMin, ageMax, country }) => ({
        url: `${SURVEYS_URL}/advanced-search`,
        params: { gender, ageMin, ageMax, country },
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const {useSearchStatisticsQuery,
  useAdvancedSearchQuery} = searchApiSlice;
