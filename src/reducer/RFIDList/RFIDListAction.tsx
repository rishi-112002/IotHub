import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { HttpStatusCode } from 'axios';
import { BaseUrlHTTPS, CreateRFIDListEndPoint, DeleteRfid, EditRFIDListEndPoint, RFIDListEndPoint } from '../../api/EndPointsUrl';
import { errorStrings, Strings } from '../../assets/constants/Lable';

const axiosConfig = (token: string, buCode: string) => ({
  headers: {
    'Content-Type': 'application/json',
    'current-bu': buCode,
    authorization: `Bearer ${token}`,
    'client-name': 'iothub',
  },
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || errorStrings.ERROR_DURING_UPLOAD;
  }
  return `${Strings.ERROR_s}: ${error instanceof Error ? error.message : errorStrings.UNKNOW_ERROR}`;
};

const postRequest = async (url: string, data: any, config: any) => {
  const { data: responseData } = await axios.post(url, data, config);
  return responseData;
};

export const CreateRFIDdata = createAsyncThunk(
  Strings.CREATE_RFID,
  async ({ rfidData, token, buCode }: any, { rejectWithValue }) => {
    const fullUrl = `${BaseUrlHTTPS}${CreateRFIDListEndPoint}`;
    try {
      const data = await postRequest(fullUrl, rfidData, axiosConfig(token, buCode));
      if (!data) {
        return rejectWithValue(errorStrings.UPLOAD_FAILED_ERROR);
      }
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  }
);

export const EditRFIDdata = createAsyncThunk(
  Strings.EDIT_RFID_,
  async ({ rfidData, token, buCode }: any, { rejectWithValue }) => {
    const fullUrl = `${BaseUrlHTTPS}${EditRFIDListEndPoint}`;
    try {
      const data = await postRequest(fullUrl, rfidData, axiosConfig(token, buCode));
      if (!data) {
        return rejectWithValue(errorStrings.UPDATE_FAILED_ERROR);
      }
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  }
);

export const getRfidListAction = createAsyncThunk(
  Strings.GET_RFID_LIST_ACTION,
  async ({ baseUrl }: any, { rejectWithValue }) => {

    const fullUrl = `${baseUrl}${RFIDListEndPoint}`;
    try {
      const { data } = await axios.get(fullUrl);
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  }
);

export const deleteRfidListAction = createAsyncThunk(
  Strings.DELETE_RFID_READER,
  async ({ id, buCode, token }: any, { rejectWithValue }) => {
    const fullUrl = `${BaseUrlHTTPS}${DeleteRfid}${id}`;
    try {
      const data = await axios.delete(fullUrl, axiosConfig(token, buCode));
      if (!data) {
        return rejectWithValue(errorStrings.NO_RESPONSE_FROM_SERVER);
      }
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  }
);


