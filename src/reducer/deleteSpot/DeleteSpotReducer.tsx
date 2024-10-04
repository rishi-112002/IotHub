import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DeleteSpot } from "./DeleteSpotAction"

type AuthState = {
    response: any
    loader: boolean
}

const initState: AuthState = {
    response: null,
    loader: false
}
export const DeleteSpotSlice = createSlice({
    name: "deleteSpotSlice",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(DeleteSpot.fulfilled, (state, action) => {
            state.response = action.payload
            state.loader = false
            console.log("done")
        })
        builder.addCase(DeleteSpot.rejected, (state) => {
            state.response = []
            console.log("error")
            state.loader = false
        })
        builder.addCase(DeleteSpot.pending, (state) => {
            console.log("pending")
            state.loader = true
        })
    }

})