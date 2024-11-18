import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUrls = createAsyncThunk(
    "getUrls",
    async (params: { baseUrl: string }, { rejectWithValue }) => {
        const { baseUrl } = params;

        try {
            const { data } = await axios.get(baseUrl);
            return data;
        } catch (err: any) {
            // console.error("Error fetching URLs:", err.message);

            // Return a custom error message or API response error
            return rejectWithValue(err.response?.data?.message || "Failed to fetch URLs");
        }
    }
);
