/* eslint-disable @typescript-eslint/no-shadow */
import {createSlice} from '@reduxjs/toolkit';
import {
  CreateRFIDdata,
  deleteRfidListAction,
  EditRFIDdata,
  getRfidListAction,
} from './RFIDListAction';

type RfidData = {
  id: string;
  name: string;
  model: string;
  port: string;
  ip: any;
};

type AuthState = {
  RfidListData: RfidData[];
  loader: boolean;
  errors: {
    create: string | null;
    edit: string | null;
    list: string | null;
    delete: string | null;
  };
};

const initialState: AuthState = {
  RfidListData: [],
  loader: false,
  errors: {
    create: null,
    edit: null,
    list: null,
    delete: null,
  },
};

// Generalized handler for pending state
const handlePending = (
  state: AuthState,
  actionType: keyof AuthState['errors'],
) => {
  state.loader = true;
  state.errors[actionType] = null;
};

// Generalized handler for rejected state
const handleRejected = (
  state: AuthState,
  actionType: keyof AuthState['errors'],
  payload: any,
) => {
  state.loader = false;
  state.errors[actionType] = payload;
};

// Helper to add the common cases (pending, fulfilled, rejected) to an action
const addAsyncCases = (
  builder: any,
  action: any,
  actionType: keyof AuthState['errors'],
  fulfilledCallback: any,
) => {
  builder.addCase(action.fulfilled, (state: AuthState, action: any) => {
    fulfilledCallback(state, action);
    state.loader = false;
    state.errors[actionType] = null;
  });
  builder.addCase(action.rejected, (state: AuthState, action: any) => {
    handleRejected(state, actionType, action.payload);
  });
  builder.addCase(action.pending, (state: AuthState) => {
    handlePending(state, actionType);
  });
};

export const rfidListSlice = createSlice({
  name: 'rfidList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Create
    addAsyncCases(
      builder,
      CreateRFIDdata,
      'create',
      (state: AuthState, action: any) => {
        state.RfidListData.push(action.payload);
      },
    );

    // Edit
    addAsyncCases(
      builder,
      EditRFIDdata,
      'edit',
      (state: AuthState, action: any) => {
        const index = state.RfidListData.findIndex(
          item => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.RfidListData[index] = action.payload;
        }
      },
    );

    // Get List
    addAsyncCases(
      builder,
      getRfidListAction,
      'list',
      (state: AuthState, action: any) => {
        state.RfidListData = action.payload;
      },
    );

    // Delete
    addAsyncCases(
      builder,
      deleteRfidListAction,
      'delete',
      (state: AuthState, action: any) => {
        state.RfidListData = state.RfidListData.filter(
          item => item.id !== action.payload.id,
        );
      },
    );
  },
});

export default rfidListSlice.reducer;
