import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { spotDetails } from '../../api/EndPointsUrl';
import { errorStrings, Strings } from '../../assets/constants/Lable';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || errorStrings.ERROR_DURING_UPLOAD;
  }
  return `${Strings.ERROR_s} ${error instanceof Error ? error.message : errorStrings.UNKNOW_ERROR}`;
};

export const GetSpotData = createAsyncThunk(
  Strings.GET_SPOT_DATA,
  async (params: { baseUrl: string | null }, { rejectWithValue }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${spotDetails}`;
    try {
      const { data } = await axios.get(fullUrl);
      return data;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  },
);

export const GetSpotName = createAsyncThunk(
  Strings.GET_SPOT_NAME,
  async (params: { baseUrl: string | null }, { rejectWithValue }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${spotDetails}`;
    try {
      const { data } = await axios.get(fullUrl);
      const formattedOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      return formattedOptions;
    } catch (error) {
      const message = handleError(error);
      return rejectWithValue(message);
    }
  },
);
