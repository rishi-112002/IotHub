import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { evenLogs } from "../../api/EndPointsUrl";


export const GetSpotEventLogs = createAsyncThunk("getSpotEventLogs", async (params: { baseUrl: string, spotName: string }) => {
    const { baseUrl, spotName } = params
    const fullUrl = `${baseUrl}${evenLogs}?spot=${spotName}&limit=500`
    
    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
        console.log(err);
    }
})