import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginurl } from '../../api/EndPointsUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorStrings, Strings } from '../../assets/constants/Lable';
export const loginUser = createAsyncThunk(
 Strings.USER_LOGIN,
  async (
    params: {
      loginData: { username: string; password: string; buCode: string };
      baseUrls: string | null;
    },
    { rejectWithValue },
  ) => {
    const { loginData, baseUrls } = params;
    const fullUrl = `${baseUrls}${loginurl}`;
    try {
      const { data } = await axios.post(fullUrl, loginData);

      if (data.result === Strings.ERROR) {
        return rejectWithValue(
         errorStrings.LOGIN_FAILED_INVALID_CREDENTIALS
        );
      }
      await AsyncStorage.setItem(Strings.USER_NAME, loginData.username);
      await AsyncStorage.setItem(Strings.BUCODE, loginData.buCode);
      await AsyncStorage.setItem(Strings.TOKEN, data.result);

      const detail = {
        token: data.result,
        userName: loginData.username,
        buCode: loginData.buCode,
      };

      return detail;
    } catch (err) {
      return rejectWithValue(errorStrings.LOGIN_ERROR_SOMETHING_WRONG);
    }
  },
);
export const CheckUserlogin = createAsyncThunk(
  Strings.USER_LOGIN_STATUS,
  async (_, thunkAPI) => {
    try {
      const userName = await AsyncStorage.getItem(Strings.USER_NAME);
      const buCode = await AsyncStorage.getItem(Strings.BUCODE);
      const token = await AsyncStorage.getItem(Strings.TOKEN);
      const detail = {
        token: token,
        userName: userName,
        buCode: buCode,
      };
      if (userName && token) {
        return detail;
      } else {
        return thunkAPI.rejectWithValue(Strings.ERROR_s);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const logoutUser = createAsyncThunk(Strings.USER_LOGOUT, async () => {
  await AsyncStorage.removeItem(Strings.USER_NAME);
  await AsyncStorage.removeItem(Strings.BUCODE);
  await AsyncStorage.removeItem(Strings.TOKEN);
});
export const GetBaseUrl = createAsyncThunk(Strings.BASEURL_GET, async () => {
  const userURL = await AsyncStorage.getItem(Strings.BASE_URL);
  if (!userURL) {
    throw new Error(errorStrings.URL_NOT_FOUND_IN_ASYNC);
  }
  return userURL;
});
export const ClearResponse = createAsyncThunk(Strings.USER_LOGOUT_USER, async () => {
  await AsyncStorage.removeItem(Strings.BASE_URL);
});
