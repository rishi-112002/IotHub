import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { evenLogs, EventLofsForToday, getAllSpotEventLogsUrl } from "../../api/EndPointsUrl";
import { Strings } from "../../assets/constants/Lable";


export const GetSpotEventLogs = createAsyncThunk(Strings.GET_SPOT_EVENT_LOGS, async (params: { baseUrl: string | null, spotName: string }) => {
    const { baseUrl, spotName } = params
    const fullUrl = `${baseUrl}${evenLogs}?spot=${spotName}&limit=500`

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
    }
})
export const GetSpotEventLogsForToday = createAsyncThunk(Strings.GET_SPOT_EVENT_LOGS_FOR_TODAY, async (params: { baseUrl: string | null, time: string }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${EventLofsForToday}`;

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
    }
})
export const GetAllSpotEventLogs = createAsyncThunk(Strings.GET_ALL_SPOT_EVENT_LOGS, async (params: { baseUrl: string | null }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${getAllSpotEventLogsUrl}`;

    try {
        const { data } = await axios.get(fullUrl);
        return data;
    } catch (err) {
    }
})