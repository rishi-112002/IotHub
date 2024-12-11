import { BaseUrlHTTPS, EditSpot, SpotDataByType, UpdateSpotUrl, deleteSpots, uploadSpotUrl } from '../../api/EndPointsUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorStrings, Strings } from '../../assets/constants/Lable';

export const weighBridgeAdd = createAsyncThunk(
  Strings.SPOT_UPLOAD_WEIGH_DATA,
  async (
    params: { weighData: any; baseUrls: string | null; token: any; buCode: any },
    { rejectWithValue },
  ) => {
    const { weighData, token, buCode } = params;
    const fullUrl = `${BaseUrlHTTPS}${uploadSpotUrl}`;

    try {
      const { data } = await axios.post(fullUrl, weighData, {
        headers: {
          'Content-Type': Strings.APPLICATION_JSON,
          'current-bu': buCode,
          authorization: `${Strings.BEARER} ${token}`,
          'client-name': Strings.IOT_HUB,
        },
      });

      if (!data) {
        return rejectWithValue(errorStrings.UPLOAD_FAILED_ERROR);
      }
      return data;
    } catch (err: any) {
      if (err.response) {
        const message =
          err.response.data?.message || errorStrings.ERROR_DURING_UPLOAD;
        return rejectWithValue(`${errorStrings.UPLOAD_ERROR}: ${message}`);
      } else if (err.request) {
        return rejectWithValue(
          errorStrings.INTERNET_ERROR
        );
      } else {
        return rejectWithValue(`${errorStrings.UPLOAD_ERROR}: ${err.message}`);
      }
    }
  },
);

export const WeighBridgeSpotData = createAsyncThunk(
  Strings.WEIGH_BRIDGE_SPOT_DATA,
  async (
    params: {
      baseUrl: string | null;
      spotType: string | null;
      buCode: string | null;
      token: string | null;
    },
    { rejectWithValue },
  ) => {
    const { baseUrl, spotType } = params;
    const fullUrl = `${baseUrl}${SpotDataByType}`;
    try {
      const { data } = await axios.get(fullUrl);
      const genericData = (data || []).filter(
        (item: any) => item.type === Strings.GENERIC_SPOT,
      );
      const formatGenericData = genericData.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      const filteredData = (data || []).filter(
        (item: any) => item.type !== Strings.GENERIC_SPOT,
      );
      const result = {
        filteredData,
        spotType,
        formatGenericData,
      };
      return result;
    } catch (err: any) {
      return rejectWithValue(errorStrings.fAILED_TO_FETCH_WEIGHBRIDE_DATA);
    }
  },
);

export const DeleteWeighBridgeSpot = createAsyncThunk(
  Strings.DELETE_SPOT,
  async (
    params: { baseUrl: any; id: any; buCode: any; token: any },
    { rejectWithValue },
  ) => {
    const { id, buCode, token } = params;
    const fullUrl = `${BaseUrlHTTPS}${deleteSpots}${id}`;
    try {
      const { data } = await axios.delete(fullUrl, {
        headers: {
          'Content-Type': Strings.APPLICATION_JSON,
          'current-bu': buCode,
          authorization: `${Strings.BEARER} ${token}`,
          'client-name':Strings.IOT_HUB ,
        },
      });
      return { data, id };
    } catch (err: any) {
      if (err.response) {
        // Server returned an error response
        return rejectWithValue({
          message: err.response.message || errorStrings.UNKNOW_ERROR,
          status: err.response.status,
        });
      } else if (err.request) {
        // No response received
        return rejectWithValue({ message: errorStrings.NO_RESPONSE_FROM_SERVER, status: null });
      } else {
        // Error during request setup
        return rejectWithValue({ message: err.message, status: null });
      }
    }
  },
);
export const WeighBridegeSpotDataEdit = createAsyncThunk(Strings.WEIGH_BRIDGE_SPOT_DATA_EDIT, async (params: { baseUrl: string | null, buCode: string | null, token: string | null, id: any }) => {
  const { baseUrl, id } = params;
  const fullUrl = `${baseUrl}${EditSpot}${id}`;

  try {
    const { data } = await axios.get(fullUrl);
    return data;
  } catch (err) {
  }
})



export const UpdateWeighBridgeSpot = createAsyncThunk(
  Strings.SPOT_UPDATE_WEIGHBRIDGE_SPOT,
  async (params: { weighData: any; baseUrls: string | null; token: any, buCode: any }, { rejectWithValue }) => {
    const { weighData, token, buCode } = params;
    try {
      const { data } = await axios.post(`${BaseUrlHTTPS}${UpdateSpotUrl}`, weighData, {
        headers: {
          'Content-Type': Strings.APPLICATION_JSON,
          'current-bu': buCode,
          'authorization': `${Strings.BEARER} ${token}`,
          'client-name': Strings.IOT_HUB,
        },
      });


      if (!data) {
        return rejectWithValue(errorStrings.UPDATE_FAILED_ERROR);
      }
      return data;
    } catch (err: any) {

      // Check if the error response is available
      if (err.response) {

        const message = err.response.data?.message || errorStrings.ERROR_DURING_UPLOAD;
        // Return the specific error message from the server
        return rejectWithValue(`${errorStrings.UPDATE_ERROR}: ${message}`);

      } else if (err.request) {
        return rejectWithValue(`${errorStrings.NO_RESPONSE_FROM_SERVER} 
          ${errorStrings.INTERNET_ERROR}`);

      } else {
        return rejectWithValue(`${errorStrings.UPLOAD_ERROR}: ${err.message}`);
      }
    }
  }
);
