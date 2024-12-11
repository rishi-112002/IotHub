import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CreateRFIDListEndPoint,
  EditRFIDListEndPoint,
  RFIDListEndPoint,
} from '../../api/EndPointsUrl';

const BASE_URL = 'https://13.235.84.67';

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
    return error.response?.data?.message || 'An error occurred.';
  }
  return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
};

const postRequest = async (url: string, data: any, config: any) => {
  const { data: responseData } = await axios.post(url, data, config);
  return responseData;
};

export const CreateRFIDdata = createAsyncThunk(
  'CreateRFIDdata',
  async ({ rfidData, token, buCode }: any, { rejectWithValue }) => {
    const fullUrl = `${BASE_URL}${CreateRFIDListEndPoint}`;
    try {
      const data = await postRequest(
        fullUrl,
        rfidData,
        axiosConfig(token, buCode),
      );
      if (!data) {
        return rejectWithValue('Upload failed: Invalid data or server error.');
      }
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  },
);

export const EditRFIDdata = createAsyncThunk(
  'EditRFIDdata',
  async ({ rfidData, token, buCode }: any, { rejectWithValue }) => {
    const fullUrl = `${BASE_URL}${EditRFIDListEndPoint}`;
    try {
      const data = await postRequest(
        fullUrl,
        rfidData,
        axiosConfig(token, buCode),
      );
      if (!data) {
        console.log('not Data in Edit');
        return rejectWithValue('Upload failed: Invalid data or server error.');
      }
      return data;
    } catch (error) {
      console.log('Error in Edit', handleError(error));
      const message = handleError(error);
      return rejectWithValue(message);
    }
  },
);

export const getRfidListAction = createAsyncThunk(
  'getRfidListAction',
  async ({ baseUrl }: any, { rejectWithValue }) => {
    const fullUrl = `${baseUrl}${RFIDListEndPoint}`;
    try {
      const { data } = await axios.get(fullUrl);
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  },
);

export const deleteRfidListAction = createAsyncThunk(
  'deleteRfidListAction',
  async ({ id, buCode, token }: any, { rejectWithValue }) => {
    const fullUrl = `${BASE_URL}/iv1/readers/remove/${id}`;
    try {
      const data = await axios.delete(fullUrl, axiosConfig(token, buCode));
      if (!data) {
        return rejectWithValue('Error: Invalid credentials or server error.');
      }
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  },
);