import {createSlice} from '@reduxjs/toolkit';
import {
  GetDisplays,
  GetReader,
  GetSmartControllers,
  GetWeightBridge,
  GetWeightParsers,
} from './SpotAddDetailsAction';

type AuthState = {
  smartController: [];
  display: [];
  reader: [];
  weighBriges: any[];
  weightParsers: [];
  readerLoader: boolean;
  displaysLoader: boolean;
  smartControllerLoader: boolean;
};

const initState: AuthState = {
  smartController: [],
  display: [],
  weighBriges: [],
  weightParsers: [],
  reader: [],
  readerLoader: true,
  displaysLoader: false,
  smartControllerLoader: false,
};
export const SpotAddDetailsSlice = createSlice({
  name: 'genericAddDetails',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetSmartControllers.fulfilled, (state, action) => {
      state.smartController = action.payload;
      state.smartControllerLoader = false;
    });
    builder.addCase(GetSmartControllers.rejected, state => {
      state.smartController = [];
      state.smartControllerLoader = false;
    });
    builder.addCase(GetSmartControllers.pending, state => {
      state.smartControllerLoader = true;
    });
    builder.addCase(GetDisplays.fulfilled, (state, action) => {
      state.display = action.payload;
      state.displaysLoader = false;
    });
    builder.addCase(GetDisplays.rejected, state => {
      state.display = [];
      state.displaysLoader = false;
    });
    builder.addCase(GetDisplays.pending, state => {
      state.displaysLoader = true;
    });
    builder.addCase(GetReader.fulfilled, (state, action) => {
      state.reader = action.payload;
      state.readerLoader = false;
    });
    builder.addCase(GetReader.rejected, state => {
      state.reader = [];
      state.readerLoader = false;
    });
    builder.addCase(GetReader.pending, state => {
      state.readerLoader = true;
    });
    builder.addCase(GetWeightBridge.fulfilled, (state, action) => {
      state.weighBriges = action.payload;
      state.readerLoader = false;
    });
    builder.addCase(GetWeightBridge.rejected, state => {
      state.weighBriges = [];
      state.readerLoader = false;
    });
    builder.addCase(GetWeightBridge.pending, state => {
      state.readerLoader = true;
    });
    builder.addCase(GetWeightParsers.fulfilled, (state, action) => {
      state.weightParsers = action.payload;
      state.readerLoader = false;
    });
    builder.addCase(GetWeightParsers.rejected, state => {
      state.weightParsers = [];
      state.readerLoader = false;
    });
    builder.addCase(GetWeightParsers.pending, state => {
      state.readerLoader = true;
    });
  },
});
