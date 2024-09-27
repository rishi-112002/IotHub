import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {spotDetails } from "../../api/EndPointsUrl";


export const GetSpotData = createAsyncThunk("getSpotData" , async(params:{baseUrl:string|null})=> {
    const {baseUrl} = params
     const fullUrl = `${baseUrl}${spotDetails}`
    try{
        console.log("url of getSpotData" , fullUrl)
        const {data} = await axios.get(fullUrl);
        return data;
    }catch (err) {
        console.log(err);
    }
})