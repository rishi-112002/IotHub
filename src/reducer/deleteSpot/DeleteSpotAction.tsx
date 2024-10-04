import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteSpots } from "../../api/EndPointsUrl";


export const DeleteSpot = createAsyncThunk("deleteSpot", async (params: { baseUrl: any, id: string, bucode: string, token: string }) => {
    const { baseUrl, id, bucode, token } = params
    const fullUrl = `${baseUrl}/${deleteSpots}${id}`
    console.log("Token" , token)
    try {

        const { data } = await axios.delete(fullUrl, {
            headers: {
                "Content-Type": "application/json",
                "current-bu": bucode,
                "authorization": `Bearer ${token}`,
                'client-name': 'iothub',
            }
        },);
        console.log("url for delete", fullUrl, data)
        return data;
    } catch (err) {
        console.log(err);
        console.log("url for delete", fullUrl)

    }
})