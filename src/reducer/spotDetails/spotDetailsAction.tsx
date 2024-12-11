import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {spotDetail} from '../../api/EndPointsUrl';
import { Strings } from '../../assets/constants/Lable';

export const GetSpotDetails = createAsyncThunk(
  Strings.GET_SPOT_DETAILS,
  async (params: {baseUrl: string; spotName: string}) => {
    const {baseUrl, spotName} = params;
    const fullUrl = `${baseUrl}${spotDetail}/${spotName}`;

    try {
      const {data} = await axios.get(fullUrl);
      return data;
    } catch (err) {}
  },
);
