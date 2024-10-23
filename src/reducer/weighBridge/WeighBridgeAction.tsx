import { SpotDataByType } from "../../api/EndPointsUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const weighBridgeAdd = createAsyncThunk(
  "spot/uploadWeighData",
  async (params: { weighData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
    const { weighData, baseUrls, token, buCode } = params;
    const fullUrl = `http://65.1.73.174/iv1/spots/create`;
    try {
      const { data } = await axios.post("https://13.235.84.67/iv1/spots/create", weighData, {
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
      console.log("error", err, fullUrl, weighBridgeAdd);

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
export const WeighBridgeSpotData = createAsyncThunk("weighBridgeSpotData", async (params: { baseUrl: string | null, spotType: any, buCode: string | null, token: string | null }) => {
  const { baseUrl, spotType, buCode, token } = params
  const fullUrl = `${baseUrl}${SpotDataByType}`
  console.log("full url and Token and bucode", token, buCode, fullUrl)
  try {
    const { data } = await axios.get(fullUrl);
    const genericData = data.filter((item: any) => item.type === "GENERIC_SPOT")
    const formatGenericData = genericData.map((item: any) => ({
      name: item.name,
      id: item.id,
    }));
    const filteredData = data.filter((item: any) => item.type !== "GENERIC_SPOT");
    const Data = {
      filteredData,
      spotType,
      formatGenericData
    }
    console.log("Url for WeighBridge", fullUrl)
    return Data;
  } catch (err) {
    console.log(err);
  }
})
import { deleteSpots } from "../../api/EndPointsUrl";


export const DeleteWeighBridgeSpot = createAsyncThunk("deleteSpot", async (params: { baseUrl: any, id: string, bucode: string | null, token: string | null }) => {
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