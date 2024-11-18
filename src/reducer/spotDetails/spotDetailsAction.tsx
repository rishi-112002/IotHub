import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { spotDetail } from "../../api/EndPointsUrl";

export const GetSpotDetails = createAsyncThunk("getSpotDetails", async (params: { baseUrl: string, spotName: string }) => {
    const { baseUrl, spotName } = params
    const fullUrl = `${baseUrl}${spotDetail}/${spotName}`
    
    try {
        // console.log("full url of spot detail" , fullUrl)
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
        // console.log(err);
    }
})