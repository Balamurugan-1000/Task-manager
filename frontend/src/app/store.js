import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice.js';
import authReducer from '../features/auth/authSlice.js';
// import dataStore from "../features/data/dataStore.js";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        // data: dataStore

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true

})


