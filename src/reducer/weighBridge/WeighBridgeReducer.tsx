import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { weighBridgeAdd, WeighBridgeSpotData } from './WeighBridgeAction';

interface UploadState {
    weighBridge: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    WeighBridgeSpots: any[],
    loader: boolean,
    genericData: any[]
}

const initialState: UploadState = {
    weighBridge: null,
    status: 'idle',
    error: null,
    WeighBridgeSpots: [],
    loader: false,
    genericData: []

};

export const WeighBridgeSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';  // Reset the status to 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(weighBridgeAdd.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(weighBridgeAdd.fulfilled, (state, action: PayloadAction<any>) => {
                state.weighBridge = action.payload;
                if (state.weighBridge.result !== "ERROR") {
                    state.status = 'succeeded';
                    state.error = null;

                } else {
                    state.status = 'failed';
                }
            })
            .addCase(weighBridgeAdd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to upload weighBridge data';
                console.log("error in reducer ", action.payload)
            })
            .addCase(WeighBridgeSpotData.pending, (state) => {
                state.loader = true;
            })
            .addCase(WeighBridgeSpotData.fulfilled, (state, action) => {
                state.loader = false;
                // Assuming the action.payload has a spotType property
                const { filteredData }: any = action.payload; // Modify the payload structure to include spotType
                state.genericData = action.payload?.formatGenericData
                state.WeighBridgeSpots = filteredData; // Update WeighBridgeSpots

            })
            .addCase(WeighBridgeSpotData.rejected, (state) => {
                console.log("error");
                state.loader = false;
                state.WeighBridgeSpots = [];
                state.genericData = []

            });
    },
});
export const { resetStatus } = WeighBridgeSlice.actions;

