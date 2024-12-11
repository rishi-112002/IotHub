import {createSlice} from '@reduxjs/toolkit';
import {
  GetAllSpotEventLogs,
  GetSpotEventLogs,
  GetSpotEventLogsForToday,
} from './EventLogsAction';
import { Strings } from '../../assets/constants/Lable';

type AuthState = {
  eventLogs: [];
  eventLogsByTime: [];
  loader: boolean;
  eventLogsAll: [];
  allEventLogLoader: boolean;
};

const initState: AuthState = {
  eventLogs: [],
  eventLogsByTime: [],
  loader: false,
  eventLogsAll: [],
  allEventLogLoader: false,
};
export const eventLogsSlice = createSlice({
  name: Strings.EVENT_LOGS,
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetSpotEventLogs.fulfilled, (state, action) => {
      state.eventLogs = action.payload;
      state.loader = false;
    });
    builder.addCase(GetSpotEventLogs.rejected, state => {
      state.eventLogs = [];
      state.loader = false;
    });
    builder.addCase(GetSpotEventLogs.pending, state => {
      state.loader = true;
    });
    builder.addCase(GetSpotEventLogsForToday.fulfilled, (state, action) => {
      state.eventLogsByTime = action.payload;
      state.loader = false;
    });
    builder.addCase(GetSpotEventLogsForToday.rejected, state => {
      state.eventLogsByTime = [];
      state.loader = false;
    });
    builder.addCase(GetSpotEventLogsForToday.pending, state => {
      state.loader = true;
    });
    builder.addCase(GetAllSpotEventLogs.fulfilled, (state, action) => {
      state.eventLogsAll = action.payload;
      state.allEventLogLoader = false;
    });
    builder.addCase(GetAllSpotEventLogs.rejected, state => {
      state.eventLogsAll = [];
      state.allEventLogLoader = false;
    });
    builder.addCase(GetAllSpotEventLogs.pending, state => {
      state.allEventLogLoader = true;
    });
  },
});
