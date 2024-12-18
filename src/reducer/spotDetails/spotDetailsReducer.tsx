import { createSlice } from "@reduxjs/toolkit"
import { GetSpotDetails } from "./spotDetailsAction"
import { Strings } from "../../assets/constants/Lable"
type AuthState = {
    spotDetails: [],
    loader: boolean
}
const initState: AuthState = {
    spotDetails: [],
    loader: false
}
export const spotDetailsSlice = createSlice({
    name: Strings.SPOT_DETAILS,
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(GetSpotDetails.fulfilled, (state, action) => {
            state.spotDetails = action.payload
            state.loader = false

        })
        builder.addCase(GetSpotDetails.rejected, (state) => {
            state.spotDetails = []
            state.loader = false
        })
        builder.addCase(GetSpotDetails.pending, (state) => {
            state.loader = true
        })
    }

})