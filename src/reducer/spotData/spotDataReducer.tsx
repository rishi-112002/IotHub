import { createSlice } from '@reduxjs/toolkit';
import { GetSpotData, GetSpotName } from './spotDataAction';

type AuthState = {
  spotData: [];
  loader: boolean;
  error: string | null;
  spotName: []
};

const initState: AuthState = {
  spotData: [],
  loader: true,
  error: null,
  spotName: []
};
export const spotDataSlice = createSlice({
  name: 'spotData',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetSpotData.fulfilled, (state, action) => {
      state.spotData = action.payload;
      state.loader = false;
      // console.log('done :- ');
    });
    builder.addCase(GetSpotData.rejected, (state, action) => {
      state.error = action.payload as string;
      // console.log('error');
      state.loader = false;
    });
    builder.addCase(GetSpotData.pending, state => {
      // console.log('pending of GetSpotData');
      state.loader = true;
    });
    builder.addCase(GetSpotName.fulfilled, (state, action) => {
      state.spotName = action.payload;
      state.loader = false;
      // console.log('done :- ');
    });
    builder.addCase(GetSpotName.rejected, (state, action) => {
      state.spotName = [];
      // console.log('error');
      state.loader = false;
    });
    builder.addCase(GetSpotName.pending, state => {
      // console.log('pending of GetSpotName');
      state.loader = true;
    });
  },
});
