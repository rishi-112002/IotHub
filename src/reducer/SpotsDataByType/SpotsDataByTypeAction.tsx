import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SpotDataByType } from "../../api/EndPointsUrl";
export const SpotsDataByType = createAsyncThunk("spotsDataByType", async (params: { baseUrl: string | null, spotType: any }) => {
    const { baseUrl, spotType } = params
    const fullUrl = `${baseUrl}${SpotDataByType}`

    try {
        const { data } = await axios.get(fullUrl);
        const filteredData = data.filter((item: any) => item.type === spotType);
        const Data = {
            filteredData,
            spotType
        }
        console.log("Url for WeighBridge", fullUrl)
        return Data;
    } catch (err) {
        console.log(err);
    }
})