import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice/apiSlice';
import fiveDayApiReducer from './apiSlice/fiveDaysApiSlice';


export const store = configureStore({
    reducer: {
        apiCall: apiReducer,
        fiveDayApiCall: fiveDayApiReducer
    }
})