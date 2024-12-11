import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorStrings, Strings } from '../../assets/constants/Lable';

export const GetUrls = createAsyncThunk(
    Strings.GET_URLS,
    async (params: { baseUrl: string }, { rejectWithValue }) => {
        const { baseUrl } = params;

        try {
            const { data } = await axios.get(baseUrl);
            return data;
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.message || // API response message
                err?.message ||                // Axios error message
                errorStrings.NO_RESPONSE_FROM_SERVER;   // Fallback message
            // Pass the error message to rejectWithValue
            return rejectWithValue(errorMessage);
        }
    }
);
