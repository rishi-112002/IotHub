import { createSlice } from "@reduxjs/toolkit";
import { SpotsDataByType } from "./SpotsDataByTypeAction";

type AuthState = {
    GenericSpots: any[],
    WeighBridgeSpots: any[],
    loader: boolean
}

const initState: AuthState = {
    GenericSpots: [],
    WeighBridgeSpots: [],
    loader: false
};

export const SpotsDataByTypeSlice = createSlice({
    name: "SpotsByType",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SpotsDataByType.pending, (state) => {
                state.loader = true;
            })
            .addCase(SpotsDataByType.fulfilled, (state, action) => {
                state.loader = false;
                // Assuming the action.payload has a spotType property
                const { filteredData, spotType }: any = action.payload; // Modify the payload structure to include spotType
                if (spotType === "GENERIC_SPOT") {
                    state.GenericSpots = filteredData; // Update GenericSpots
                } else if (spotType === "UNIDIRECTIONAL_WEIGHBRIDGE") {
                    state.WeighBridgeSpots = filteredData; // Update WeighBridgeSpots
                    console.log("filterd data of WeighBridge", filteredData,)
                }
            })
            .addCase(SpotsDataByType.rejected, (state) => {
                console.log("error");
                state.loader = false;
                state.GenericSpots = []; // Optionally reset both on error, or just one
                state.WeighBridgeSpots = [];
            });
    }
});
export default SpotsDataByTypeSlice.reducer;
