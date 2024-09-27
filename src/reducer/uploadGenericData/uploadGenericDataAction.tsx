import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { uploadGeneric } from "../../api/EndPointsUrl";

export const uploadGenericData = createAsyncThunk(
    "spot/uploadGenericData",
    async (params: { genericData: any; baseUrls: string | null; token: any , buCode:any }, { rejectWithValue }) => {
        const { genericData, baseUrls, token , buCode } = params;
        const fullUrl = `http://65.1.73.174/iv1/spots/create`;
        try {
            const { data } = await axios.post("https://65.1.73.174/iv1/spots/create",  genericData, {
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
            console.log("uploadedData", genericData);
            return data;
        } catch (err) {
            console.log("error", err, fullUrl, genericData)
            console.error("Upload error in catch block: ", err);
            return rejectWithValue("Upload error: Something went wrong.");
        }
    }
);
