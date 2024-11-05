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


  }),
});

export const { 
  useGetStatisticsQuery,
  useGetEatingHabitsByAgeQuery,
  useGetMedicalHistoryByFoodChoicesQuery,
  useGetMedicalHistoryByHabitsAndSportQuery,
  useGetFruitStatisticsByCountryQuery,
  } = statsApiSlice;
