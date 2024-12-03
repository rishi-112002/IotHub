import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CheckUserlogin,
  ClearResponse,
  GetBaseUrl,
  loginUser,
  logoutUser,
} from './LoginAction';
interface AuthState {
  isLogIn: boolean;
  token: string | null;
  userName: string | null;
  buCode: string | null;
  loading: boolean;
  error: string | null;
  baseUrl: string | null;
  userData: any,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';

}

const initialState: AuthState = {
  isLogIn: false,
  token: '',
  userName: '',
  buCode: '',
  loading: false,
  error: '',
  baseUrl: '',
  userData: null,
  status: 'idle'
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle"
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.status = 'loading';

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.isLogIn = true;
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.buCode = action.payload.buCode;
        if (state.userData.result !== 'ERROR') {
          state.status = 'succeeded';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(loginUser.rejected, state => {
        state.loading = false;
        state.status = 'failed';

      })

      .addCase(CheckUserlogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogIn = true;
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.buCode = action.payload.buCode;
      })
      .addCase(CheckUserlogin.rejected, (state, action) => {
        state.loading = false;
        state.isLogIn = false;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.isLogIn = false;
        state.token = '';
        state.userName = '';
        state.buCode = '';
        state.status = "idle"
      })
      .addCase(GetBaseUrl.fulfilled, (state, action) => {
        state.baseUrl = action.payload;
      })
      .addCase(GetBaseUrl.rejected, (state) => {
        state.baseUrl = '';
      })
      .addCase(ClearResponse.fulfilled, state => {
        state.baseUrl = '';
      });
  },
});
export const { setBaseUrl , resetStatus } = authSlice.actions;
export { authSlice };
