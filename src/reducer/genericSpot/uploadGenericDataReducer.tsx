import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DeleteGenericSpot,
  GenericSpotsData,
  uploadGenericData,
} from './uploadGenericDataAction';

interface UploadState {
  genericData: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  GenericSpots: any[];
  loader: boolean;
  response: any;
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UploadState = {
  genericData: null,
  response: null,
  status: 'idle',
  error: null,
  GenericSpots: [],
  loader: false,
  deleteStatus: 'idle',
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
  },
  extraReducers: builder => {
    builder
      .addCase(uploadGenericData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadGenericData.fulfilled,
        (state, action: PayloadAction<any>) => {
          const newData = action.payload;
          state.status = 'succeeded';
          state.error = null;
          // Check if genericData already exists, and append new data
          if (state.GenericSpots) {
            console.log('new data in if', state.GenericSpots.length);
            state.GenericSpots = [...state.GenericSpots, newData];
            console.log('new data in after', state.GenericSpots.length);
          } else {
            console.log('new data in else', newData);
            state.genericData = newData;
          }
        },
      )
      .addCase(uploadGenericData.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Failed to upload generic data';
        console.log('error in reducer ', action.payload);
      })
      .addCase(GenericSpotsData.pending, state => {
        state.loader = true;
      })
      .addCase(GenericSpotsData.fulfilled, (state, action) => {
        state.loader = false;
        // Assuming the action.payload has a spotType property
        const {filteredData}: any = action.payload; // Modify the payload structure to include spotType
        state.GenericSpots = filteredData; // Update GenericSpots
      })
      .addCase(GenericSpotsData.rejected, state => {
        console.log('error');
        state.loader = false;
        state.GenericSpots = []; // Optionally reset both on error, or just one
      });
    builder.addCase(DeleteGenericSpot.fulfilled, (state, action) => {
      console.log('deleteId from action0', action.payload?.id);
      state.response = action.payload;
      state.loader = false;
      const deletedSpotId = action.payload?.id; // Modify this according to your payload structure

      // Filter out the deleted spot from WeighBridgeSpots
      console.log('beforeDelete', state.GenericSpots.length);
      state.GenericSpots = state.GenericSpots.filter(
        spot => spot.id !== deletedSpotId,
      );
      console.log('afterDelete', state.GenericSpots.length);

      state.deleteStatus = 'succeeded';
      console.log('Deleted spot with ID: ', deletedSpotId);
      console.log('done');
    });
    builder.addCase(DeleteGenericSpot.rejected, state => {
      state.response = [];
      console.log('error');
      state.deleteStatus = 'failed';
      state.loader = false;
    });
    builder.addCase(DeleteGenericSpot.pending, state => {
      console.log('pending');
      state.deleteStatus = 'loading';
      state.loader = true;
    });
  },
});
export const {resetStatus, resetDeleteStatus} = UploadGenericSlice.actions;
