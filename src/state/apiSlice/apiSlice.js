import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk("fetchData", async (city) => {
    const apiKey = "4efb13211a6cee18104b9d85bd5861dc";
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    return data.json();
})

const apiSlice = createSlice({
    name: "weather",
    initialState: {
        isLoading: false,
        data: null,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchData.rejected, (state) => {
            state.error = true;
        });
    }
})

export default apiSlice.reducer;