import { createSlice } from "@reduxjs/toolkit"
import { GetAllSpotEventLogs, GetSpotEventLogs, GetSpotEventLogsForToday } from "./EventLogsAction"



type AuthState = {
    eventLogs: [],
    eventLogsByTime: [],
    loader: boolean,
    eventLogsAll: [],
    allEventLogLoader: boolean
}

const initState: AuthState = {
    eventLogs: [],
    eventLogsByTime: [],
    loader: false,
    eventLogsAll: [],
    allEventLogLoader: false

}
export const eventLogsSlice = createSlice({
    name: "eventLogs",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(GetSpotEventLogs.fulfilled, (state, action) => {
            state.eventLogs = action.payload
            state.loader = false
        })
        builder.addCase(GetSpotEventLogs.rejected, (state) => {
            state.eventLogs = []
            // console.log("error")
            state.loader = false
        })
        builder.addCase(GetSpotEventLogs.pending, (state) => {
            // console.log("pending of  GetSpotEventLogs ")
            state.loader = true
        })
        builder.addCase(GetSpotEventLogsForToday.fulfilled, (state, action) => {
            state.eventLogsByTime = action.payload
            state.loader = false
        })
        builder.addCase(GetSpotEventLogsForToday.rejected, (state) => {
            state.eventLogsByTime = []
            // console.log("error")
            state.loader = false
        })
        builder.addCase(GetSpotEventLogsForToday.pending, (state) => {
            // console.log("pending of GetSpotEventLogsForToday")
            state.loader = true
        })
        builder.addCase(GetAllSpotEventLogs.fulfilled, (state, action) => {
            state.eventLogsAll = action.payload
            state.allEventLogLoader = false
        })
        builder.addCase(GetAllSpotEventLogs.rejected, (state) => {
            state.eventLogsAll = []
            // console.log("error getting all event Logs")
            state.allEventLogLoader = false
        })
        builder.addCase(GetAllSpotEventLogs.pending, (state) => {
            // console.log("pending of getting all event Logs")
            state.allEventLogLoader = true
        })
    }

})