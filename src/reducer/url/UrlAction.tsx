import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUrls = createAsyncThunk(
    "getUrls",
    async (params: { baseUrl: string }, { rejectWithValue }) => {
        const { baseUrl } = params;

        console.log("Data for URL is", baseUrl);
        try {
            const { data } = await axios.get(baseUrl);
            return data;
        } catch (err: any) {
            // Safely extract error message
            const errorMessage =
                err?.response?.data?.message || // API response message
                err?.message ||                // Axios error message
                "An unknown error occurred";   // Fallback message

            console.log("Caught in catch block:", errorMessage);

            // Pass the error message to rejectWithValue
            return rejectWithValue(errorMessage);
        }
    }
);
