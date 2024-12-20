import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetBuinessUnits} from './BuinessUnitsAction';
import { Strings } from '../../assets/constants/Lable';

type AuthState = {
  buinessunits: [];
  loader: boolean;
};

const initState: AuthState = {
  buinessunits: [],
  loader: false,
};
export const businessUnitsSlice = createSlice({
  name: Strings.BUINESS_UNITS,
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetBuinessUnits.fulfilled, (state, action) => {
      state.buinessunits = action.payload;
      state.loader = false;
    });
    builder.addCase(GetBuinessUnits.rejected, state => {
      state.buinessunits = [];
      state.loader = false;
    });
    builder.addCase(GetBuinessUnits.pending, state => {
      state.loader = true;
    });
  },
});
