import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/statistics";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => `${USERS_URL}/stats`,
      providesTags: ["Statistics"],
    }),

    getEatingHabitsByAge: builder.query({
      query: () => `${USERS_URL}/eatingHabits`,
      providesTags: ["EatingHabits"],
    }),

    getMedicalHistoryByFoodChoices: builder.query({
      query: () => `${USERS_URL}/medicalHistory`,
      providesTags: ["MedicalHistory"],
    }),

    getMedicalHistoryByHabitsAndSport: builder.query({
      query: () => `${USERS_URL}/medicalHistorySport`,
      providesTags: ["MedicalHistoryHabitsSport"],
    }),

    getFruitStatisticsByCountry: builder.query({
      query: () =>  `${USERS_URL}/fruitStatsByCountry`,
      providesTags: ["FruitStatistics"],
    }),

    // Demographic Statistics

    getGenderStatistics: builder.query({
      query: () =>  `${USERS_URL}/genderStats`,
      providesTags: ["GenderStatistics"],
    }),

    getAgeGroupDistribution: builder.query({
      query: () =>  `${USERS_URL}/age-group`,
      providesTags: ["AgeGroupDistribution"],
    }),

    getCountryRepresentation: builder.query({
      query: () =>  `${USERS_URL}/countryRepresentation`,
      providesTags: ["CountryRepresentation"],
    }),

    getSocialStatus: builder.query({
      query: () =>  `${USERS_URL}/socialStatus`,
      providesTags: ["SocialStatus"],
    }),

    getAverageChildrenStatistics: builder.query({
      query: () =>  `${USERS_URL}/averageChildren`,
      providesTags: ["AverageChildrenStatistics"],
    }),

  }),
});

export const { 
  useGetStatisticsQuery,
  useGetEatingHabitsByAgeQuery,
  useGetMedicalHistoryByFoodChoicesQuery,
  useGetMedicalHistoryByHabitsAndSportQuery,
  useGetFruitStatisticsByCountryQuery,
  useGetGenderStatisticsQuery,
  useGetAgeGroupDistributionQuery,
  useGetCountryRepresentationQuery,
  useGetSocialStatusQuery,
  useGetAverageChildrenStatisticsQuery,
  } = statsApiSlice;
