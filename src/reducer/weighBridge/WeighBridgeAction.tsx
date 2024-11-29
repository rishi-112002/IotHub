import { EditSpot, SpotDataByType, deleteSpots } from '../../api/EndPointsUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const weighBridgeAdd = createAsyncThunk(
  'spot/uploadWeighData',
  async (
    params: { weighData: any; baseUrls: string | null; token: any; buCode: any },
    { rejectWithValue },
  ) => {
    const { weighData, token, buCode } = params;
    console.log("hello from api", weighData)
    const fullUrl = 'https://13.235.84.67/iv1/spots/create';

    try {
      const { data } = await axios.post(fullUrl, weighData, {
        headers: {
          'Content-Type': 'application/json',
          'current-bu': buCode,
          authorization: `Bearer ${token}`,
          'client-name': 'iothub',
        },
      });

      if (!data) {
        return rejectWithValue('Upload failed: Invalid data or server error.');
      }
      return data;
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        const message =
          err.response.data?.message || 'An error occurred during the upload.';
        // console.error(`Upload failed with status ${status}: ${message}`);
        return rejectWithValue(`Upload error: ${message}`);
      } else if (err.request) {
        // console.error('No response received from the server:', err.request);
        return rejectWithValue(
          'No response from the server. Please check your network connection.',
        );
      } else {
        // console.error('Error in request setup:', err.message);
        return rejectWithValue(`Upload error: ${err.message}`);
      }
    }
  },
);

export const WeighBridgeSpotData = createAsyncThunk(
  'weighBridgeSpotData',
  async (
    params: {
      baseUrl: string | null;
      spotType: string | null;
      buCode: string | null;
      token: string | null;
    },
    { rejectWithValue },
  ) => {
    const { baseUrl, spotType, buCode, token } = params;
    const fullUrl = `${baseUrl}${SpotDataByType}`;
    try {
      const { data } = await axios.get(fullUrl);
      const genericData = (data || []).filter(
        (item: any) => item.type === 'GENERIC_SPOT',
      );
      const formatGenericData = genericData.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      const filteredData = (data || []).filter(
        (item: any) => item.type !== 'GENERIC_SPOT',
      );
      const result = {
        filteredData,
        spotType,
        formatGenericData,
      };
      return result;
    } catch (err: any) {
      return rejectWithValue('Failed to fetch weigh bridge spot data.');
    }
  },
);

export const DeleteWeighBridgeSpot = createAsyncThunk(
  'deleteSpot',
  async (
    params: { baseUrl: any; id: any; buCode: any; token: any },
    { rejectWithValue },
  ) => {
    const { baseUrl, id, buCode, token } = params;
    const fullUrl = `${baseUrl}${deleteSpots}${id}`;
    try {
      const { data } = await axios.delete(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          'current-bu': buCode,
          authorization: `Bearer ${token}`,
          'client-name': 'iothub',
        },
      });
      return { data, id };
    } catch (err: any) {
      return rejectWithValue('Failed to delete weigh bridge spot.');
    }
  },
);
export const WeighBridegeSpotDataEdit = createAsyncThunk('weighBridegeSpotData', async (params: { baseUrl: string | null, buCode: string | null, token: string | null, id: any }) => {
  const { baseUrl, buCode, token, id } = params;
  const fullUrl = `${baseUrl}${EditSpot}${id}`;

  try {
    const { data } = await axios.get(fullUrl);
    return data;
  } catch (err) {
  }
})



export const UpdateWeighBridgeSpot = createAsyncThunk(
  'spot/updateWeighBridgeSpot',
  async (params: { weighData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
    const { weighData, baseUrls, token, buCode } = params;
    try {
      const { data } = await axios.post('https://13.235.84.67/iv1/spots/update', weighData, {
        headers: {
          'Content-Type': 'application/json',
          'current-bu': buCode,
          'authorization': `Bearer ${token}`,
          'client-name': 'iothub',
        },
      });


      if (!data) {
        return rejectWithValue('update failed: Invalid data or server error.');
      }
      return data;
    } catch (err: any) {

      // Check if the error response is available
      if (err.response) {
        // Server returned a response (4xx or 5xx)
        const status = err.response.status;
        const message = err.response.data?.message || 'An error occurred during the upload.';

        // Log the exact error response
        // console.error(`update failed with status ${status}: ${message}`);

        // Return the specific error message from the server
        return rejectWithValue(`update error: ${message}`);

      } else if (err.request) {
        // The request was made but no response was received (e.g., network issues)
        // console.error('No response received from the server:', err.request);
        return rejectWithValue('No response from the server. Please check your network connection.');

      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error('Error in request setup:', err.message);
        return rejectWithValue(`update error: ${err.message}`);
      }
    }
  }
);
