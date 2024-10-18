import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { displays, readers, smartController, weighBridges, weightParsers } from "../../api/EndPointsUrl";


export const GetSmartControllers = createAsyncThunk("getSmartControllers", async (params: { baseUrl: any }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${smartController}`
    try {

        const { data } = await axios.get(fullUrl);
        const formattedOptions = data.map((item: any) => ({
            name: item.name,
            id: item.id,
        }));
        return formattedOptions;
    } catch (err) {
        console.log(err);
    }
})
export const GetDisplays = createAsyncThunk("getDisplays", async (params: { baseUrl: any }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${displays}`
    try {

        const { data } = await axios.get(fullUrl);
        const formattedOptions = data.map((item: any) => ({
            name: item.name,
            id: item.id,
        }));
        return formattedOptions;
    } catch (err) {
        console.log(err);
    }
})
export const GetReader = createAsyncThunk("getReader", async (params: { baseUrl: any }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${readers}`
    try {

        const { data } = await axios.get(fullUrl);
        const formattedOptions = data.map((item: any) => ({
            name: item.name,
            id: item.id,
        }));
        return formattedOptions;
    } catch (err) {
        console.log(err);
    }
})

export const GetWeightBridge = createAsyncThunk("getWeightBridge", async (params: { baseUrl: any }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${weighBridges}`
    try {

        const { data } = await axios.get(fullUrl);
        const formattedOptions = data.activeWeighbridges.map((item: any) => ({
            name: item.name,
            id: item.id,
        }));
        return formattedOptions;
    } catch (err) {
        console.log(err);
    }
})

export const GetWeightParsers = createAsyncThunk("getWeightParsers", async (params: { baseUrl: any }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${weightParsers}`
    try {
        const { data } = await axios.get(fullUrl);
        const formattedOptions = data.map((item: any) => ({
            name: item.name,
            id: item.id
        }));

        return formattedOptions;
    } catch (err) {
        console.log("weightParsersError", err);
    }
})  