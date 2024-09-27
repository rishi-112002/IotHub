import { createSlice } from "@reduxjs/toolkit"
import { GetSpotData } from "./spotDataAction"

type AuthState = {
    spotData: [],
    loader:boolean
}

const initState:AuthState = {
    spotData: [],
    loader:true
}
export const spotDataSlice = createSlice({
    name: "spotData",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(GetSpotData.fulfilled, (state, action) => {
            state.spotData = action.payload
           state.loader = false
           console.log("done")


        })
        builder.addCase(GetSpotData.rejected, (state ) => {
            state.spotData = []
            console.log("error")
           state.loader = false
        })
        builder.addCase(GetSpotData.pending, (state) => {
            console.log("pending")
           state.loader = true
        })
    }

})