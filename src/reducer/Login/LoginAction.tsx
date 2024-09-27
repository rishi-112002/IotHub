import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginurl } from "../../api/EndPointsUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const loginUser = createAsyncThunk(
  "user/login",
  async (params: { loginData: { username: string; password: string; buCode: string }; baseUrls: string | null }, { rejectWithValue }) => {
    const { loginData, baseUrls } = params;
    const fullUrl = `${baseUrls}${loginurl}`;
    try {
      const { data } = await axios.post(fullUrl, loginData);

      if (data.result === "ERROR") {
        console.log("Login failed: ", data);
        return rejectWithValue("Login failed: Invalid credentials or server error.");
      }
      console.log("loginData" , loginData)
      await AsyncStorage.setItem("userName", loginData.username);
      await AsyncStorage.setItem("buCode", loginData.buCode);
      await AsyncStorage.setItem("token", data.result);

      const detail = {
        token: data.result,
        userName: loginData.username,
        buCode: loginData.buCode,
      };

      return detail;
    } catch (err) {
      console.error("Login error in catch block: ", err);
      return rejectWithValue("Login error: Something went wrong.");
    }
  }
);
export const CheckUserlogin = createAsyncThunk(
  "user/loginStatus",
  async (_, thunkAPI) => {
    try {
      const userName = await AsyncStorage.getItem("userName")
      const buCode = await AsyncStorage.getItem("buCode")
      const token = await AsyncStorage.getItem("token")
      const detail = {
        token: token,
        userName: userName,
        buCode: buCode
      }
      if (userName && token) {
        return detail;
      }
      else {
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error) {
      console.log("error of catch", error)
      return thunkAPI.rejectWithValue(error)

    }
  }

)
export const logoutUser = createAsyncThunk(
  "user/logout/User",
  async () => {
    await AsyncStorage.removeItem("userName")
    await AsyncStorage.removeItem("buCode")
    await AsyncStorage.removeItem("token")
  }
)
export const GetBaseUrl = createAsyncThunk(
  "baseUrl/get",
  async () => {
    const userURL = await AsyncStorage.getItem('baseurl');
    if (!userURL) {
      throw new Error("URL not found in AsyncStorage");
    }
    return userURL;
  }
);
export const ClearResponse = createAsyncThunk(
  "user/logoutUser",
  async () => {
    await AsyncStorage.removeItem("baseurl")
  }
)


