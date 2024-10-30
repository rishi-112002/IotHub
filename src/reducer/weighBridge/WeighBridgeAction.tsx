import {SpotDataByType, deleteSpots} from '../../api/EndPointsUrl';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const weighBridgeAdd = createAsyncThunk(
  'spot/uploadWeighData',
  async (
    params: {weighData: any; baseUrls: string | null; token: any; buCode: any},
    {rejectWithValue},
  ) => {
    const {weighData, token, buCode} = params;
    const fullUrl = ' https://13.235.84.67/iv1/spots/create';

    try {
      const {data} = await axios.post(fullUrl, weighData, {
        headers: {
          'Content-Type': 'application/json',
          'current-bu': buCode,
          authorization: `Bearer ${token}`,
          'client-name': 'iothub',
        },
      });

      if (!data) {
        console.log('Upload failed: ', data);
        return rejectWithValue('Upload failed: Invalid data or server error.');
      }
      console.log('Upload success:', data);
      return data;
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        const message =
          err.response.data?.message || 'An error occurred during the upload.';
        console.error(`Upload failed with status ${status}: ${message}`);
        return rejectWithValue(`Upload error: ${message}`);
      } else if (err.request) {
        console.error('No response received from the server:', err.request);
        return rejectWithValue(
          'No response from the server. Please check your network connection.',
        );
      } else {
        console.error('Error in request setup:', err.message);
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
    {rejectWithValue},
  ) => {
    const {baseUrl, spotType, buCode, token} = params;
    const fullUrl = `${baseUrl}${SpotDataByType}`;
    console.log('Full URL:', fullUrl, 'Token:', token, 'BU Code:', buCode);
    try {
      const {data} = await axios.get(fullUrl);
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
      console.log('Error in WeighBridgeSpotData:', err);
      return rejectWithValue('Failed to fetch weigh bridge spot data.');
    }
  },
);

export const DeleteWeighBridgeSpot = createAsyncThunk(
  'deleteSpot',
  async (
    params: {baseUrl: any; id: any; buCode: any; token: any},
    {rejectWithValue},
  ) => {
    const {baseUrl, id, buCode, token} = params;
    const fullUrl = `${baseUrl}${deleteSpots}${id}`;
    try {
      const {data} = await axios.delete(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          'current-bu': buCode,
          authorization: `Bearer ${token}`,
          'client-name': 'iothub',
        },
      });
      console.log('URL for delete:', fullUrl, 'Response:', data);
      return {data, id};
    } catch (err: any) {
      console.log('Error in DeleteWeighBridgeSpot:', err);
      return rejectWithValue('Failed to delete weigh bridge spot.');
    }
  },
);
