import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { spotDetails } from '../../api/EndPointsUrl';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'An error occurred.';
  }
  return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
};

export const GetSpotData = createAsyncThunk('getSpotData', async (params: { baseUrl: string | null }, { rejectWithValue }) => {
  const { baseUrl } = params;
  const fullUrl = `${baseUrl}${spotDetails}`;
  try {
    console.log('url of getSpotData', fullUrl);
    const { data } = await axios.get(fullUrl);
    return data;
  } catch (error) {
    const message = handleError(error);
    // console.log('Create Error:', message);
    return rejectWithValue(message);
  }
})

export const GetSpotName = createAsyncThunk('getSpotName', async (params: { baseUrl: string | null }, { rejectWithValue }) => {
  const { baseUrl } = params;
  const fullUrl = `${baseUrl}${spotDetails}`;
  try {
    console.log('url of getSpotName', fullUrl);
    const { data } = await axios.get(fullUrl);
    const formattedOptions = data.map((item: any) => ({
      name: item.name,
      id: item.id,
    }));
    return formattedOptions;
  } catch (error) {
    const message = handleError(error);
    // console.log('Create Error:', message);
    return rejectWithValue(message);
  }
})