import {createSlice} from '@reduxjs/toolkit';
import {GetSpotData} from './spotDataAction';

type AuthState = {
  spotData: [];
  loader: boolean;
  error: string | null;
};

const initState: AuthState = {
  spotData: [],
  loader: true,
  error: null,
};
export const spotDataSlice = createSlice({
  name: 'spotData',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetSpotData.fulfilled, (state, action) => {
      state.spotData = action.payload;
      state.loader = false;
      console.log('done :- ');
    });
    builder.addCase(GetSpotData.rejected, (state, action) => {
      state.error = action.payload as string;
      console.log('error');
      state.loader = false;
    });
    builder.addCase(GetSpotData.pending, state => {
      console.log('pending');
      state.loader = true;
    });
  },
});
