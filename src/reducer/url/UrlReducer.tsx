import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetUrls } from "./UrlAction";
import { errorStrings, Strings } from "../../assets/constants/Lable";

type AuthState = {
  urls: any[]; // Updated to 'any[]' to handle the array of URLs
  loader: boolean;
  error: string | null; // Added error state
};

const initState: AuthState = {
  urls: [],
  loader: false,
  error: null, // Initialize error as null
};

export const GetUrlsSlice = createSlice({
  name: Strings.URLS,
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUrls.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.urls = action.payload; // Set URLs from the action payload
      state.loader = false; // Set loader to false as request is fulfilled
      state.error = null; // Clear any previous error
    });

    builder.addCase(GetUrls.rejected, (state, action: PayloadAction<any>) => {
      state.urls = []; // Clear URLs on error
      state.error = action.payload || errorStrings.INTERNET_ERROR; // Set error from action or default message
      state.loader = false; // Stop the loader
    });

    builder.addCase(GetUrls.pending, (state) => {
      state.loader = true; // Set loader to true when request is pending
      state.error = null; // Clear any previous error on new request
    });
  },
});

export default GetUrlsSlice.reducer;
