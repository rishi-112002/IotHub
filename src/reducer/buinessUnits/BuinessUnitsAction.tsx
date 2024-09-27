import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buinessUnits } from "../../api/EndPointsUrl";


export const GetBuinessUnits = createAsyncThunk("getBuinessunits" , async(params:{baseUrl:string})=> {
    const {baseUrl} = params
     const fullUrl = `${baseUrl}${buinessUnits}`
    try{
   
        const {data} = await axios.get(fullUrl);
        const formattedOptions = data.result.map((item:any) => ({
            name: item.name,
            code: item.code,
          }));
        return formattedOptions;
    }catch (err) {
        console.log(err);
    }
})