// /* eslint-disable @typescript-eslint/no-shadow */
// import {createSlice} from '@reduxjs/toolkit';
// import {
//   CreateRFIDdata,
//   deleteRfidListAction,
//   EditRFIDdata,
//   getRfidListAction,
// } from './RFIDListAction';

// type RfidData = {
//   id: string;
//   name: string;
//   model: string;
//   port: string;
//   ip: any;
// };

// type AuthState = {
//   RfidListData: RfidData[];
//   loader: boolean;
//   errors: {
//     create: string | null;
//     edit: string | null;
//     list: string | null;
//     delete: string | null;
//   };
// };

// const initialState: AuthState = {
//   RfidListData: [],
//   loader: false,
//   errors: {
//     create: null,
//     edit: null,
//     list: null,
//     delete: null,
//   },
// };

// // Generalized handler for pending state
// const handlePending = (
//   state: AuthState,
//   actionType: keyof AuthState['errors'],
// ) => {
//   state.loader = true;
//   state.errors[actionType] = null;
// };

// // Generalized handler for rejected state
// const handleRejected = (
//   state: AuthState,
//   actionType: keyof AuthState['errors'],
//   payload: any,
// ) => {
//   state.loader = false;
//   state.errors[actionType] = payload;
// };

// // Helper to add the common cases (pending, fulfilled, rejected) to an action
// const addAsyncCases = (
//   builder: any,
//   action: any,
//   actionType: keyof AuthState['errors'],
//   fulfilledCallback: any,
// ) => {
//   builder.addCase(action.fulfilled, (state: AuthState, action: any) => {
//     fulfilledCallback(state, action);
//     state.loader = false;
//     state.errors[actionType] = null;
//   });
//   builder.addCase(action.rejected, (state: AuthState, action: any) => {
//     handleRejected(state, actionType, action.payload);
//   });
//   builder.addCase(action.pending, (state: AuthState) => {
//     handlePending(state, actionType);
//   });
// };

// export const rfidListSlice = createSlice({
//   name: 'rfidList',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     // Create
//     addAsyncCases(
//       builder,
//       CreateRFIDdata,
//       'create',
//       (state: AuthState, action: any) => {
//         state.RfidListData.push(action.payload);
//       },
//     );

//     // Edit
//     addAsyncCases(
//       builder,
//       EditRFIDdata,
//       'edit',
//       (state: AuthState, action: any) => {
//         const index = state.RfidListData.findIndex(
//           item => item.id === action.payload.id,
//         );
//         if (index !== -1) {
//           state.RfidListData[index] = action.payload;
//         }
//       },
//     );

//     // Get List
//     addAsyncCases(
//       builder,
//       getRfidListAction,
//       'list',
//       (state: AuthState, action: any) => {
//         state.RfidListData = action.payload;
//       },
//     );

//     // Delete
//     addAsyncCases(
//       builder,
//       deleteRfidListAction,
//       'delete',
//       (state: AuthState, action: any) => {
//         state.RfidListData = state.RfidListData.filter(
//           item => item.id !== action.payload.id,
//         );
//       },
//     );
//   },
// });

// export default rfidListSlice.reducer;

// Triyal Code

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  editStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: string | null;
  // {
  //   create: string | null;
  //   edit: string | null;
  //   list: string | null;
  //   delete: string | null;
  // };
};

const initialState: AuthState = {
  RfidListData: [],
  loader: false,
  createStatus: 'idle',
  editStatus: 'idle',
  listStatus: 'idle',
  deleteStatus: 'idle',
  errors: null,
  // {
  //   create: null,
  //   edit: null,
  //   list: null,
  //   delete: null,
  // },
};

export const rfidListSlice = createSlice({
  name: 'rfidList',
  initialState,
  reducers: {
    resetCreateStatus: state => {
      state.createStatus = 'idle';
    },
    resetEditStatus: state => {
      state.editStatus = 'idle';
    },
    resetListStatus: state => {
      state.listStatus = 'idle';
    },
    resetDeleteStatus: state => {
      state.deleteStatus = 'idle';
    },
  },
  extraReducers: builder => {
    // Create
    builder
      .addCase(CreateRFIDdata.pending, state => {
        state.createStatus = 'loading';
        state.loader = true;
        state.errors = null;
      })
      .addCase(
        CreateRFIDdata.fulfilled,
        (state, action: PayloadAction<RfidData>) => {
          state.createStatus = 'succeeded';
          state.errors = null;
          state.loader = false;
          state.RfidListData.push(action.payload);
        },
      )
      .addCase(
        CreateRFIDdata.rejected,
        (state, action: PayloadAction<string>) => {
          state.loader = false;
          state.createStatus = 'failed';
          state.errors = action.payload;
        },
      );

    // Edit
    builder
      .addCase(EditRFIDdata.pending, state => {
        state.editStatus = 'loading';
        state.loader = true;
        state.errors = null;
      })
      .addCase(
        EditRFIDdata.fulfilled,
        (state, action: PayloadAction<RfidData>) => {
          state.editStatus = 'succeeded';
          state.errors = null;
          state.loader = false;
          const index = state.RfidListData.findIndex(
            item => item.id === action.payload.id,
          );
          if (index !== -1) {
            state.RfidListData[index] = action.payload;
          }
        },
      )
      .addCase(
        EditRFIDdata.rejected,
        (state, action: PayloadAction<string>) => {
          state.editStatus = 'failed';
          state.loader = false;
          state.errors = action.payload;
        },
      );

    // Get List
    builder
      .addCase(getRfidListAction.pending, state => {
        state.listStatus = 'loading';
        state.errors = null;
        state.loader = true;
      })
      .addCase(
        getRfidListAction.fulfilled,
        (state, action: PayloadAction<RfidData[]>) => {
          state.listStatus = 'succeeded';
          state.errors = null;
          state.loader = false;
          state.RfidListData = action.payload;
        },
      )
      .addCase(
        getRfidListAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.listStatus = 'failed';
          state.loader = false;
          state.errors = action.payload;
        },
      );

    // Delete
    builder
      .addCase(deleteRfidListAction.pending, state => {
        state.deleteStatus = 'loading';
        state.loader = true;
        state.errors = null;
      })
      .addCase(
        deleteRfidListAction.fulfilled,
        (state, action: PayloadAction<{id: string}>) => {
          state.deleteStatus = 'succeeded';
          state.loader = false;
          state.errors = null;
          const deletedSpotId = action.payload?.id; // Modify this according to your payload structure
          state.RfidListData = state.RfidListData.filter(
            item => item.id !== deletedSpotId,
          );
        },
      )
      .addCase(
        deleteRfidListAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.loader = false;
          state.deleteStatus = 'failed';
          state.errors = action.payload;
        },
      );
  },
});

export const {
  resetCreateStatus,
  resetEditStatus,
  resetListStatus,
  resetDeleteStatus,
} = rfidListSlice.actions;

export default rfidListSlice.reducer;
