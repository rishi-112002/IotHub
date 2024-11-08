import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreateRFIDListEndPoint, EditRFIDListEndPoint, RFIDListEndPoint } from '../../api/EndPointsUrl';

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
  async ({ rfidData, token, buCode }, { rejectWithValue }) => {
    const fullUrl = `${BASE_URL}${CreateRFIDListEndPoint}`;
    try {
      const data = await postRequest(fullUrl, rfidData, axiosConfig(token, buCode));
      if (!data) {
        return rejectWithValue('Upload failed: Invalid data or server error.');
      }
      // console.log('Upload success', data);
      return data;
    } catch (error) {
      const message = handleError(error);
      // console.log('Create Error:', message);
      return rejectWithValue(message);
    }
  }
);

export const EditRFIDdata = createAsyncThunk(
  'EditRFIDdata',
  async ({ rfidData, token, buCode }:any, { rejectWithValue }) => {
    // console.log('Action :- ', rfidData);
    const fullUrl = `${BASE_URL}${EditRFIDListEndPoint}`;
    try {
      const data = await postRequest(fullUrl, rfidData, axiosConfig(token, buCode));
      if (!data) {
        return rejectWithValue('Upload failed: Invalid data or server error.');
      }
      // console.log('Edit success', data);
      return data;
    } catch (error) {
      const message = handleError(error);
      // console.log('Edit Error:', message);
      return rejectWithValue(message);
    }
  }
);

export const getRfidListAction = createAsyncThunk(
  'getRfidListAction',
  async ({ baseUrl }, { rejectWithValue }) => {
    
    const fullUrl = `${baseUrl}${RFIDListEndPoint}`;
    try {
      const { data } = await axios.get(fullUrl);
      // console.log("Rfid List Data : - ",data)
      return data;
    } catch (error) {
      const message = handleError(error);
      // console.log('Get Error:', message);
      return rejectWithValue(message);
    }
  }
);

export const deleteRfidListAction = createAsyncThunk(
  'deleteRfidListAction',
  async ({ id, buCode, token }, { rejectWithValue }) => {
    const fullUrl = `${BASE_URL}/iv1/readers/remove/${id}`;
    try {
      const data = await axios.delete(fullUrl, axiosConfig(token, buCode));
      if (data.result === 'ERROR') {
        return rejectWithValue('Error: Invalid credentials or server error.');
      }
      // console.log('Successfully deleted:', data);
      return data;
    } catch (error) {
      const message = handleError(error);
      console.log('Action Delete Error:', message);
      return rejectWithValue(message);
    }
  }
);


