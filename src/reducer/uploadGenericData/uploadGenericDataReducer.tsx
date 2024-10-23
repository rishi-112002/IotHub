import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteGenericSpot, SpotsDataByType, uploadGenericData } from './uploadGenericDataAction';

interface UploadState {
    genericData: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    GenericSpots: any[],
    loader: boolean,
    response: any

}

const initialState: UploadState = {
    genericData: null,
    response: null,
    status: 'idle',
    error: null,
    GenericSpots: [],
    loader: false
};
export const UploadGenericSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';  // Reset the status to 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadGenericData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(uploadGenericData.fulfilled, (state, action: PayloadAction<any>) => {
                const newData = action.payload;
                console.log("initialState of generic data ", state.GenericSpots);

                state.status = 'succeeded';
                state.error = null;

                // Always create a new array for state to ensure re-render
                if (newData.result !== "ERROR") {
                    // Spread old array and append new data
                    console.log("Updated GenericSpots after push", state.GenericSpots.length);  // Now length should reflect updated data
                }

                // Check if genericData already exists, and append new data
                if (state.GenericSpots) {
                    console.log("new data in if", state.GenericSpots.length);
                    state.GenericSpots = [...state.GenericSpots, newData];
                    console.log("new data in after", state.GenericSpots.length);

                } else {
                    console.log("new data in else", newData);
                    state.genericData = newData;
                }

            })
            .addCase(uploadGenericData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to upload generic data';
                console.log("error in reducer ", action.payload);
            })
            .addCase(SpotsDataByType.pending, (state) => {
                state.loader = true;
            })
            .addCase(SpotsDataByType.fulfilled, (state, action) => {
                state.loader = false;
                // Assuming the action.payload has a spotType property
                const { filteredData, spotType }: any = action.payload; // Modify the payload structure to include spotType
                if (spotType === "GENERIC_SPOT") {
                    state.GenericSpots = filteredData; // Update GenericSpots
                }
            })
            .addCase(SpotsDataByType.rejected, (state) => {
                console.log("error");
                state.loader = false;
                state.GenericSpots = []; // Optionally reset both on error, or just one
            })
            builder.addCase(DeleteGenericSpot.fulfilled, (state, action) => {
                state.response = action.payload
                state.loader = false
                const deletedSpotId = action.payload?.id; // Modify this according to your payload structure
    
                // Filter out the deleted spot from WeighBridgeSpots
                state.GenericSpots = state.GenericSpots.filter(spot => spot.id !== deletedSpotId);
    
                console.log("Deleted spot with ID: ", deletedSpotId);
                console.log("done")
            })
            builder.addCase(DeleteGenericSpot.rejected, (state) => {
                state.response = []
                console.log("error")
                state.loader = false
            })
            builder.addCase(DeleteGenericSpot.pending, (state) => {
                console.log("pending")
                state.loader = true
            })
    },
});
export const { resetStatus } = UploadGenericSlice.actions;
