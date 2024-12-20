import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buinessUnits } from "../../api/EndPointsUrl";
import { Strings } from "../../assets/constants/Lable";


export const GetBuinessUnits = createAsyncThunk(Strings.GET_BUINESS_UNITS, async (params: { baseUrl: string, buCode: string | null, token: string | null }) => {
    const { baseUrl } = params
    const fullUrl = `${baseUrl}${buinessUnits}`
    try {

        const { data } = await axios.get(fullUrl);
        const formattedOptions = data.result.map((item: any) => ({
            name: item.name,
            code: item.code,
        }));
        return formattedOptions;
    } catch (err) {
    }
})