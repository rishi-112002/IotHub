import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrlHTTPS, deleteSpots, EditSpot, SpotDataByType, UpdateSpotUrl, uploadSpotUrl } from '../../api/EndPointsUrl';
import axios from 'axios';
import { errorStrings, Strings } from '../../assets/constants/Lable';

export const uploadGenericData = createAsyncThunk(
   Strings.UPLOAD_GENERIC_SPOT,
    async (params: { genericData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
        const { genericData, baseUrls, token, buCode } = params;
        try {
            const { data } = await axios.post(`${BaseUrlHTTPS}${uploadSpotUrl}`, genericData, {
                headers: {
                    'Content-Type': 'application/json',
                    'current-bu': buCode,
                    'authorization': `Bearer ${token}`,
                    'client-name': 'iothub',
                },
            });


            if (!data) {
                return rejectWithValue(errorStrings.UPLOAD_FAILED_ERROR);
            }
            return data;
        } catch (err: any) {

            // Check if the error response is available
            if (err.response) {
                // Server returned a response (4xx or 5xx)
                const status = err.response.status;
                const message = err.response.data?.message || errorStrings.ERROR_DURING_UPLOAD;

                // Log the exact error response
        

                // Return the specific error message from the server
                return rejectWithValue(`${errorStrings.UPLOAD_ERROR}: ${message}`);

            } else if (err.request) {
                // The request was made but no response was received (e.g., network issues)
    
                return rejectWithValue(`${errorStrings.NO_RESPONSE_FROM_SERVER} ${errorStrings.INTERNET_ERROR}`);
            } else {
                // Something happened in setting up the request that triggered an Error
        
                return rejectWithValue(`${errorStrings.UPLOAD_ERROR}: ${err.message}`);
            }
        }
    }
);
export const GenericSpotsData = createAsyncThunk(Strings.GENERIC_SPOTS_DATA, async (params: { baseUrl: string | null, buCode: string | null, token: string | null },) => {
    const { baseUrl, buCode, token } = params;
    const fullUrl = `${baseUrl}${SpotDataByType}`;

    try {
        const { data } = await axios.get(fullUrl);
        const filteredData = data.filter((item: any) => item.type === Strings.GENERIC_SPOT);
        const Data = {
            filteredData,
        };
        return Data;
    } catch (err) {
    }
})
export const DeleteGenericSpot = createAsyncThunk(
    Strings.DELETE_SPOT,
    async (params: { baseUrl: any; id: string; bucode: string | null; token: string | null }, { rejectWithValue }) => {
        const { id, bucode, token } = params;
        const fullUrl = `${BaseUrlHTTPS}${deleteSpots}${id}`;
        try {
            const { data } = await axios.delete(fullUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'current-bu': bucode,
                    'authorization': `Bearer ${token}`,
                    'client-name': 'iothub',
                },
            });

            return { data, id }; // Success: Return data and ID
        } catch (err: any) {
            if (err.response) {
                // Server returned an error response
                return rejectWithValue({
                    message: err.response.data?.message || errorStrings.ERROR_DURING_UPLOAD,
                    status: err.response.status,
                });
            } else if (err.request) {
                // No response received
                return rejectWithValue({ message: errorStrings.NO_RESPONSE_FROM_SERVER, status: null });
            } else {
                // Error during request setup
                return rejectWithValue({ message: err.message, status: null });
            }
        }
    }
);



export const GenericSpotData = createAsyncThunk(Strings.GENERIC_SPOT_DATA, async (params: { baseUrl: string | null, buCode: string | null, token: string | null, id: any }) => {
    const { baseUrl, buCode, token, id } = params;
    const fullUrl = `${baseUrl}${EditSpot}${id}`;

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
    }
})

export const UpdateGenericSpot = createAsyncThunk(
    Strings.UPDATE_GENERIC_SPOT,
    async (params: { genericData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
        const { genericData, baseUrls, token, buCode } = params;
        try {
            const { data } = await axios.post(`${BaseUrlHTTPS}${UpdateSpotUrl}`, genericData, {
                headers: {
                    'Content-Type': 'application/json',
                    'current-bu': buCode,
                    'authorization': `Bearer ${token}`,
                    'client-name': 'iothub',
                },
            });


            if (!data) {
                return rejectWithValue(errorStrings.UPDATE_FAILED_ERROR);
            }
            return data;
        } catch (err: any) {

            // Check if the error response is available
            if (err.response) {
                // Server returned a response (4xx or 5xx)
                const status = err.response.status;
                const message = err.response.data?.message || errorStrings.ERROR_DURING_UPLOAD;



                return rejectWithValue(`${errorStrings.UPLOAD_ERROR}${message}`);

            } else if (err.request) {
                // The request was made but no response was received (e.g., network issues)

                return rejectWithValue(`${errorStrings.NO_RESPONSE_FROM_SERVER} ${errorStrings.INTERNET_ERROR}`);

            } else {
                return rejectWithValue(`${errorStrings.UPLOAD_ERROR} ${err.message}`);
            }
        }
    }
);