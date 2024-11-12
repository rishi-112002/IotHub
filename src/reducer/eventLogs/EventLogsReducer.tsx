import { createSlice } from "@reduxjs/toolkit"
import { GetSpotEventLogs, GetSpotEventLogsForToday } from "./EventLogsAction"



type AuthState = {
    eventLogs: [],
    eventLogsByTime: [],
    loader: boolean
}

const initState: AuthState = {
    eventLogs: [],
    eventLogsByTime: [],
    loader: false
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
            console.log("error")
            state.loader = false
        })
        builder.addCase(GetSpotEventLogs.pending, (state) => {
            console.log("pending")
            state.loader = true
        })
        builder.addCase(GetSpotEventLogsForToday.fulfilled, (state, action) => {
            state.eventLogsByTime = action.payload
            state.loader = false
        })
        builder.addCase(GetSpotEventLogsForToday.rejected, (state) => {
            state.eventLogsByTime = []
            console.log("error")
            state.loader = false
        })
        builder.addCase(GetSpotEventLogsForToday.pending, (state) => {
            console.log("pending")
            state.loader = true
        })
    }

})