import { createSlice } from "@reduxjs/toolkit"
import { GetSpotEventLogs } from "./EventLogsAction"

   

type AuthState = {
    eventLogs: [],
    loader:boolean
}

const initState:AuthState = {
    eventLogs: [],
    loader:false
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
        builder.addCase(GetSpotEventLogs.rejected, (state ) => {
            state.eventLogs = []
            console.log("error")
           state.loader = false
        })
        builder.addCase(GetSpotEventLogs.pending, (state) => {
            console.log("pending")
           state.loader = true
        })
    }

})