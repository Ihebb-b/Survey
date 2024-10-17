import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/surveys";

export const surveyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation({
      query: (newSurvey) => ({
        url: `${USERS_URL}/create`,
        method: "POST",
        body: newSurvey,
      }),
      invalidatesTags: ["Survey"],
    }),
    
  }),
});

export const { useCreateSurveyMutation } = surveyApiSlice;
