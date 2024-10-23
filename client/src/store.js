import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { surveyApiSlice } from './slices/surveyApiSlice'; 
import { searchApiSlice } from './slices/searchApiSlice';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [surveyApiSlice.reducerPath]: surveyApiSlice.reducer, 
        [searchApiSlice.reducerPath] : searchApiSlice.reducer,

        auth: authReducer,


    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .concat(surveyApiSlice.middleware), 
    devTools: true,
});

export default store;
