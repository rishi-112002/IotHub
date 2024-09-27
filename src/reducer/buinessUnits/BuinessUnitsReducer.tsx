import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetBuinessUnits } from "./BuinessUnitsAction"
   

type AuthState = {
    buinessunits: [],
    loader:boolean
}

const initState:AuthState = {
    buinessunits: [],
    loader:false
}
export const businessUnitsSlice = createSlice({
    name: "buinessunits",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(GetBuinessUnits.fulfilled, (state, action) => {
            state.buinessunits = action.payload
           state.loader = false
           console.log("done")
        })
        builder.addCase(GetBuinessUnits.rejected, (state ) => {
            state.buinessunits = []
            console.log("error")
           state.loader = false
        })
        builder.addCase(GetBuinessUnits.pending, (state) => {
            console.log("pending")
           state.loader = true
        })
    }

})