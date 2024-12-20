import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BaseUrlHTTPS, spotDetail} from '../../api/EndPointsUrl';
import {Strings} from '../../assets/constants/Lable';

export const GetSpotDetails = createAsyncThunk(
  Strings.GET_SPOT_DETAILS,

  async (params: {baseUrl: string; spotName: string}) => {
    const {spotName} = params;
    const fullUrl = `${BaseUrlHTTPS}${spotDetail}/${spotName}`;
    console.log('FULL URL :- ', fullUrl);
    try {
      const {data} = await axios.get(fullUrl);
      // console.log('SpotDetail Action :-', data);
      return data;
    } catch (err) {}
  },
);
