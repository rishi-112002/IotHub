import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { evenLogs, EventLofsForToday, getAllSpotEventLogsUrl } from "../../api/EndPointsUrl";


export const GetSpotEventLogs = createAsyncThunk("getSpotEventLogs", async (params: { baseUrl: string|null, spotName: string }) => {
    const { baseUrl, spotName } = params
    const fullUrl = `${baseUrl}${evenLogs}?spot=${spotName}&limit=500`

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
        // console.log(err);
    }
})
export const GetSpotEventLogsForToday = createAsyncThunk("getSpotEventLogsForToday ", async (params: { baseUrl: string|null, time: string }) => {
    const { baseUrl, time } = params
    const fullUrl = `${baseUrl}${EventLofsForToday}fromDateTime=${time}`;

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
        // console.log(err);
    }
})
export const GetAllSpotEventLogs = createAsyncThunk("getAllSpotEventLogs ", async (params: { baseUrl: string|null}) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${getAllSpotEventLogsUrl}`;

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
        // console.log(err);
    }
})