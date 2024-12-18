import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteWeighBridgeSpot, UpdateWeighBridgeSpot, WeighBridegeSpotDataEdit, weighBridgeAdd, WeighBridgeSpotData } from './WeighBridgeAction';
import { act } from 'react';
import { errorStrings, Strings } from '../../assets/constants/Lable';

interface weighBridgeSpot {
    id: number;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    name: string;
    bizUnitId: number;
    active: boolean;
    type: string;
    events: string;
    delayAlertAfter: number;
    buCode: string;
    stableWeightTolerance: number | null;
    ticksForStableWeight: number | null;
    maxPlatformReadyWeight: number | null;
    minPlatformReadyWeight: number | null;
    ticksForPlatformReady: number | null;
    minVehicleWeight: number | null;
    tagCount: number | null;
    validDiDirA: string | null;
    validDiDirB: string | null;
    securityTag: boolean;
    securityTagTimeout: number | null;
    weighbridgeEntry: boolean;
    weighbridgeDirection: string | null;
    weighbridgeId: number | null;
    genericSpotDirA: string | null;
    genericSpotDirB: string | null;
    weighbridgeName: string | null;
    driverTag: boolean;
    driverTagTimeout: number | null;
    expiryDate: string | null;
    smartio: any;
    readers: any[];
    displays: any[]; // Define further if display properties are known
    spotCommands: any[]; // Define further if commands structure is known
    cameras: any[]; // Define further if camera properties are known
}
const initialweighBridgeSpot: weighBridgeSpot = {
    id: 0,
    createdBy: '',
    updatedBy: '',
    createdAt: '',
    updatedAt: '',
    version: 0,
    name: '',
    bizUnitId: 0,
    active: false,
    type: '',
    events: '',
    delayAlertAfter: 0,
    buCode: '',
    stableWeightTolerance: null,
    ticksForStableWeight: null,
    maxPlatformReadyWeight: null,
    minPlatformReadyWeight: null,
    ticksForPlatformReady: null,
    minVehicleWeight: null,
    tagCount: null,
    validDiDirA: null,
    validDiDirB: null,
    securityTag: false,
    securityTagTimeout: null,
    weighbridgeEntry: false,
    weighbridgeDirection: null,
    weighbridgeId: null,
    genericSpotDirA: null,
    genericSpotDirB: null,
    weighbridgeName: null,
    driverTag: false,
    driverTagTimeout: null,
    expiryDate: null,
    smartio: {},
    readers: [],
    displays: [],
    spotCommands: [],
    cameras: [],
};
interface UploadState {
    weighBridge: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    WeighBridgeSpots: any[],
    loader: boolean,
    genericData: any[],
    response: any,
    deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
    weighBridgeSpot: weighBridgeSpot
    updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    deleteError: any

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
    weighBridgeSpot: initialweighBridgeSpot,
    updateStatus: 'idle',
    deleteError: null
};

export const WeighBridgeSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';  // Reset the status to 'idle'
        },
        resetDeleteStatus: (State) => {
            State.deleteStatus = 'idle';
        },
        resetUpadteStatus: state => {
            state.updateStatus = 'idle'; // Reset the status to 'idle'
        },
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
                if (state.weighBridge.result !== Strings.ERROR) {
                    state.status = 'succeeded';
                    state.error = null;

                } else {
                    state.status = 'failed';
                }
                if (state.WeighBridgeSpots) {
                    state.WeighBridgeSpots = [...state.WeighBridgeSpots, newData];

                } else {
                    state.genericData = newData;
                }
            })
            .addCase(weighBridgeAdd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || errorStrings.FAILED_TO_UPLOAD_WEIGHBRIDGE;
            })
            .addCase(WeighBridgeSpotData.pending, (state) => {
                state.loader = true;
            })
            .addCase(WeighBridgeSpotData.fulfilled, (state, action) => {
                state.loader = false;
                // Assuming the action.payload has a spotType property
                const { filteredData }: any = action.payload; // Modify the payload structure to include spotType
                state.genericData = action.payload?.formatGenericData;
                state.WeighBridgeSpots = filteredData; // Update WeighBridgeSpots

            })
            .addCase(WeighBridgeSpotData.rejected, (state) => {
                state.loader = false;
                state.WeighBridgeSpots = [];
                state.genericData = [];

            })
            .addCase(DeleteWeighBridgeSpot.fulfilled, (state, action: any) => {
                state.response = action.payload;
                state.loader = false;
                state.deleteError = null
                const deletedSpotId = action.payload?.id; // Modify this according to your payload structure
                state.deleteStatus = 'succeeded';
                // Filter out the deleted spot from WeighBridgeSpots
                state.WeighBridgeSpots = state.WeighBridgeSpots.filter(spot => spot.id !== deletedSpotId);
            })
            .addCase(DeleteWeighBridgeSpot.rejected, (state, action: any) => {
                state.response = [];
                state.deleteError = action.payload.message
                state.deleteStatus = 'failed';
                state.loader = false;
            })
            .addCase(DeleteWeighBridgeSpot.pending, (state) => {
                state.deleteStatus = 'loading';
                state.deleteError = null
                state.loader = true;

            })
            .addCase(WeighBridegeSpotDataEdit.pending, state => {
                state.loader = true;
            })
            .addCase(WeighBridegeSpotDataEdit.fulfilled, (state, action) => {
                state.loader = false;
                // Assuming the action.payload has a spotType property
                // Modify the payload structure to include spotType
                state.weighBridgeSpot = action.payload; // Update GenericSpots
            })
            .addCase(WeighBridegeSpotDataEdit.rejected, state => {
                state.loader = false;
                state.weighBridgeSpot = initialweighBridgeSpot; // Optionally reset both on error, or just one
            })
            .addCase(
                UpdateWeighBridgeSpot.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.updateStatus = 'succeeded';
                    state.error = null;
                    const updatedSpot = action.payload; // assuming payload contains the updated spot details

                    // Find the index of the spot to update
                    const index = state.WeighBridgeSpots.findIndex(spot => spot.id === updatedSpot.id);

                    // If spot is found, update it in the array
                    if (index !== -1) {
                        state.WeighBridgeSpots[index] = updatedSpot;
                    }
                }
            )
            .addCase(UpdateWeighBridgeSpot.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error =
                    (action.payload as string) || errorStrings.FAILED_TO_UPLOAD_WEIGHBRIDGE;
            })
            .addCase(UpdateWeighBridgeSpot.pending, state => {
                state.updateStatus = 'loading';
                state.error = null;
            })
    },
});
export const { resetStatus, resetDeleteStatus, resetUpadteStatus } = WeighBridgeSlice.actions;

