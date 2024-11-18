import { createSlice } from "@reduxjs/toolkit"
import { GetSpotDetails } from "./spotDetailsAction"



type AuthState = {
    spotDetails: [],
    loader: boolean
}

const initState: AuthState = {
    spotDetails: [],
    loader: false
}
export const spotDetailsSlice = createSlice({
    name: "spotDetails",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(GetSpotDetails.fulfilled, (state, action) => {
            state.spotDetails = action.payload
            state.loader = false

        })
        builder.addCase(GetSpotDetails.rejected, (state) => {
            state.spotDetails = []
            // console.log("error")
            state.loader = false
        })
        builder.addCase(GetSpotDetails.pending, (state) => {
            // console.log("pending of GetSpotDetails")
            state.loader = true
        })
    }

})