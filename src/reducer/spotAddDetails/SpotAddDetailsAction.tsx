import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  displays,
  readers,
  smartController,
  weighBridges,
  weightParsers,
} from '../../api/EndPointsUrl';
import { Strings } from '../../assets/constants/Lable';

export const GetSmartControllers = createAsyncThunk(
  Strings.GET_SMART_CONTROLLERS,
  async (params: { baseUrl: any }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${smartController}`;
    try {
      const { data } = await axios.get(fullUrl);
      const formattedOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      return formattedOptions;
    } catch (err) {
    }
  },
);
export const GetDisplays = createAsyncThunk(
  Strings.GET_DISPLAYS,
  async (params: { baseUrl: any }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${displays}`;
    try {
      const { data } = await axios.get(fullUrl);
      const formattedOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      return formattedOptions;
    } catch (err) {
    }
  },
);
export const GetReader = createAsyncThunk(
  Strings.GET_READER,
  async (params: { baseUrl: any }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${readers}`;
    try {
      const { data } = await axios.get(fullUrl);
      const formattedOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      return formattedOptions;
    } catch (err) {
    }
  },
);

export const GetWeightBridge = createAsyncThunk(
  Strings.GET_WEIGHT_BRIDGE,
  async (params: { baseUrl: any }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${weighBridges}`;
    try {
      const { data } = await axios.get(fullUrl);


      const activeWeighbridges = Array.isArray(data.activeWeighbridges) ? data.activeWeighbridges : [];
      const expiredWeighbridges = Array.isArray(data.expiredWeighbridges) ? data.expiredWeighbridges : [];

      // Combine both active and expired weighbridges
      const allWeighbridges = [...activeWeighbridges, ...expiredWeighbridges];

      if (data.activeWeighbridges && Array.isArray(data.activeWeighbridges)) {
        const formattedOptions = allWeighbridges.map((item: any) => ({
          name: item.name,
          id: item.id,
          type: item.type
        }));
        return formattedOptions;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }


);

export const GetWeightParsers = createAsyncThunk(
  Strings.GET_WEIGHT_PARSERS,
  async (params: { baseUrl: any }) => {
    const { baseUrl } = params;
    const fullUrl = `${baseUrl}${weightParsers}`;
    try {
      const { data } = await axios.get(fullUrl);
      const formattedOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));

      return formattedOptions;
    } catch (err) {
    }
  },
);
