import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteGenericSpot,
  GenericSpotData,
  GenericSpotsData,
  UpdateGenericSpot,
  uploadGenericData,
} from './uploadGenericDataAction';
interface GenericSpot {
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
const initialGenericSpot: GenericSpot = {
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
  genericData: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
  deleteError: any
  GenericSpots: any[];
  loader: boolean;
  GenericSpot: GenericSpot,
  response: any;
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UploadState = {
  genericData: null,
  response: null,
  status: 'idle',
  error: null,
  GenericSpots: [],
  loader: false,
  deleteStatus: 'idle',
  deleteError: null,
  GenericSpot: initialGenericSpot,
  updateStatus: 'idle'
};
export const UploadGenericSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetStatus: state => {
      state.status = 'idle'; // Reset the status to 'idle'
    },
    resetDeleteStatus: state => {
      state.deleteStatus = 'idle'; // Reset the status to 'idle'
    },
    resetUpadteStatus: state => {
      state.updateStatus = 'idle'; // Reset the status to 'idle'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadGenericData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadGenericData.fulfilled,
        (state, action: PayloadAction<any>) => {
          const newData = action.payload;
          state.status = 'succeeded';
          state.error = null;
          // Check if genericData already exists, and append new data
          if (state.GenericSpots) {
            state.GenericSpots = [...state.GenericSpots, newData];
          } else {
            state.genericData = newData;
          }
        },
      )
      .addCase(uploadGenericData.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Failed to upload generic data';
      })
      .addCase(GenericSpotsData.pending, state => {
        state.loader = true;
      })
      .addCase(GenericSpotsData.fulfilled, (state, action) => {
        state.loader = false;
        // Assuming the action.payload has a spotType property
        const { filteredData }: any = action.payload; // Modify the payload structure to include spotType
        state.GenericSpots = filteredData; // Update GenericSpots
      })
      .addCase(GenericSpotsData.rejected, state => {
        state.loader = false;
        state.GenericSpots = []; // Optionally reset both on error, or just one
      });

    builder.addCase(DeleteGenericSpot.fulfilled, (state, action) => {
      state.response = action.payload;
      console.log("fulfiled of delete")

      state.loader = false;
      state.deleteError = null;
      state.deleteStatus = 'succeeded';
      const deletedSpotId = action.payload?.id; // Modify this according to your payload structure
      // Filter out the deleted spot from WeighBridgeSpots
      state.GenericSpots = state.GenericSpots.filter(
        spot => spot.id !== deletedSpotId,
      );
    });
    builder.addCase(DeleteGenericSpot.rejected, (state, action: any) => {
      console.log("rejected of delete", action.payload.message)
      state.response = [];
      state.deleteStatus = 'failed';
      state.deleteError = action.payload.message;
      state.loader = false;
    });
    builder.addCase(DeleteGenericSpot.pending, (state, action) => {
      state.deleteStatus = 'loading';
      state.deleteError = null;
      state.loader = true;
    })
      .addCase(GenericSpotData.pending, state => {
        state.loader = true;
      })
      .addCase(GenericSpotData.fulfilled, (state, action) => {
        state.loader = false;
        // Assuming the action.payload has a spotType property
        // Modify the payload structure to include spotType
        state.GenericSpot = action.payload; // Update GenericSpots
      })
      .addCase(GenericSpotData.rejected, state => {
        state.loader = false;
        state.GenericSpot = initialGenericSpot; // Optionally reset both on error, or just one
      })
      .addCase(UpdateGenericSpot.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updateStatus = 'succeeded';
          state.error = null;
          const updatedSpot = action.payload; // assuming payload contains the updated spot details

          // Find the index of the spot to update
          const index = state.GenericSpots.findIndex(spot => spot.id === updatedSpot.id);

          // If spot is found, update it in the array
          if (index !== -1) {
            state.GenericSpots[index] = updatedSpot;
          }

        }
      )
      .addCase(UpdateGenericSpot.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error =
          (action.payload as string) || 'Failed to upload generic data';
      })
      .addCase(UpdateGenericSpot.pending, state => {
        state.updateStatus = 'loading';
        state.error = null;
      })
  },
});
export const { resetStatus, resetDeleteStatus, resetUpadteStatus } = UploadGenericSlice.actions;
