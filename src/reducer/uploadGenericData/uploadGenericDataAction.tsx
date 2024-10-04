import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { uploadGeneric } from "../../api/EndPointsUrl";

export const uploadGenericData = createAsyncThunk(
    "spot/uploadGenericData",
    async (params: { genericData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
        const { genericData, baseUrls, token, buCode } = params;
        const fullUrl = `http://65.1.73.174/iv1/spots/create`;
        try {
            const { data } = await axios.post("https://65.1.73.174/iv1/spots/create", genericData, {
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