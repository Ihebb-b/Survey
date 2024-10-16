import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/user";

export const surveyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation({
      query: (newSurvey) => ({
        url: `${USERS_URL}/survey`,
        method: "POST",
        body: newSurvey,
      }),
      invalidatesTags: ["Survey"],
    }),
  }),
});

export const { useCreateSurveyMutation } = surveyApiSlice;
