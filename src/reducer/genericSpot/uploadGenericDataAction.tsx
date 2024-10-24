import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSpots, SpotDataByType } from "../../api/EndPointsUrl";
import axios from "axios";

export const uploadGenericData = createAsyncThunk(
    "spot/uploadGenericData",
    async (params: { genericData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
        const { genericData, baseUrls, token, buCode } = params;
        const fullUrl = `http://65.1.73.174/iv1/spots/create`;
        try {
            const { data } = await axios.post("https://13.235.84.67/iv1/spots/create", genericData, {
                headers: {
                    "Content-Type": "application/json",
                    "current-bu": buCode,
                    "authorization": `Bearer ${token}`,
                    'client-name': 'iothub',
                },
            });


            if (!data) {
                console.log("Upload failed: ", data);
                return rejectWithValue("Upload failed: Invalid data or server error.");
            }
            console.log("upload success", data);
            return data;
        } catch (err: any) {
            console.log("error", err, fullUrl, genericData);
      
            // Check if the error response is available
            if (err.response) {
              // Server returned a response (4xx or 5xx)
              const status = err.response.status;
              const message = err.response.data?.message || "An error occurred during the upload.";
      
              // Log the exact error response
              console.error(`Upload failed with status ${status}: ${message}`);
              
              // Return the specific error message from the server
              return rejectWithValue(`Upload error: ${message}`);
              
            } else if (err.request) {
              // The request was made but no response was received (e.g., network issues)
              console.error("No response received from the server:", err.request);
              return rejectWithValue("No response from the server. Please check your network connection.");
              
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error in request setup:", err.message);
              return rejectWithValue(`Upload error: ${err.message}`);
            }
          }
        }
      );
export const SpotsDataByType = createAsyncThunk("spotsDataByType", async (params: { baseUrl: string | null, spotType: any, buCode: string | null, token: string | null }) => {
    const { baseUrl, spotType, buCode, token } = params
    const fullUrl = `${baseUrl}${SpotDataByType}`
    console.log("full url and Token and bucode", token, buCode, fullUrl)
    try {
        const { data } = await axios.get(fullUrl);
        const filteredData = data.filter((item: any) => item.type === spotType);
        const Data = {
            filteredData,
            spotType ,
        }
        console.log("Url for WeighBridge", fullUrl)
        return Data;
    } catch (err) {
        console.log(err);
    }
})
export const DeleteGenericSpot = createAsyncThunk("deleteSpot", async (params: { baseUrl: any, id: string, bucode: string | null, token: string | null }) => {
    const { id, bucode, token } = params
    const fullUrl = `https://13.235.84.67${deleteSpots}${id}`
    console.log("Token", token)
    try {

        const { data } = await axios.delete(fullUrl, {
            headers: {
                "Content-Type": "application/json",
                "current-bu": bucode,
                "authorization": `Bearer ${token}`,
                'client-name': 'iothub',
            }
        },);
        console.log("url for delete", fullUrl, data)
        return {data , id};
    } catch (err) {
        console.log(err);
        console.log("url for delete", fullUrl)

    }
})