import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteWeighBridgeSpot, weighBridgeAdd, WeighBridgeSpotData } from './WeighBridgeAction';

interface UploadState {
    weighBridge: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    WeighBridgeSpots: any[],
    loader: boolean,
    genericData: any[],
    response: any,
    deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const initialState: UploadState = {
    weighBridge: null,
    status: 'idle',
    error: null,
    WeighBridgeSpots: [],
    loader: false,
    genericData: [],
    response: null,
    deleteStatus: 'idle',


};

export const WeighBridgeSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';  // Reset the status to 'idle'
        },
        resetDeleteStatus: (State) => {
            State.status = "idle"
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
                const newData = action.payload;
                if (state.weighBridge.result !== "ERROR") {
                    state.status = 'succeeded';
                    state.error = null;

                } else {
                    state.status = 'failed';
                }
                if (state.WeighBridgeSpots) {
                    console.log("new data in if", state.WeighBridgeSpots.length);
                    state.WeighBridgeSpots = [...state.WeighBridgeSpots, newData];
                    console.log("new data in after", state.WeighBridgeSpots.length);

                } else {
                    console.log("new data in else", newData);
                    state.genericData = newData;
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
        builder.addCase(DeleteWeighBridgeSpot.fulfilled, (state, action) => {
            state.response = action.payload
            state.loader = false
            const deletedSpotId = action.payload?.id; // Modify this according to your payload structure
            state.deleteStatus = "succeeded"
            // Filter out the deleted spot from WeighBridgeSpots
            state.WeighBridgeSpots = state.WeighBridgeSpots.filter(spot => spot.id !== deletedSpotId);
            console.log("done")
        })
        builder.addCase(DeleteWeighBridgeSpot.rejected, (state) => {
            state.response = []
            state.deleteStatus = "failed"
            console.log("error")
            state.loader = false
        })
        builder.addCase(DeleteWeighBridgeSpot.pending, (state) => {
            state.deleteStatus = "loading"
            console.log("pending")
            state.loader = true

        })
    },
});
export const { resetStatus, resetDeleteStatus } = WeighBridgeSlice.actions;

