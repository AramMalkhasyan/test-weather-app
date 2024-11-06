import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchFiveDayData = createAsyncThunk("fetchfiveDayData", async (city) => {
    const apiKey = "4efb13211a6cee18104b9d85bd5861dc";
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    return data.json();
});

const fiveDaysApiSlice = createSlice({
    name: "five day weather",
    initialState: {
        isLoading: false,
        data: null,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFiveDayData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchFiveDayData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchFiveDayData.rejected, (state) => {
            state.error = true;
        });
    }
})

export default fiveDaysApiSlice.reducer;