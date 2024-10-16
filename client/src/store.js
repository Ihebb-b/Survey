import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { surveyApiSlice } from './slices/surveyApiSlice'; // Import the new survey API slice


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [surveyApiSlice.reducerPath]: surveyApiSlice.reducer, // For survey-specific API interactions

        auth: authReducer,


    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .concat(surveyApiSlice.middleware), // Add the survey API middleware
    devTools: true,
});

export default store;
