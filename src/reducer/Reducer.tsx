import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Strings } from "../assets/constants/Lable";

export const apiResponseList = createSlice({
    name: Strings.ALL_RESPONSE_DATA,
    initialState: { apiResponse: {} },
    reducers: {
        responseDetails: (state, action:PayloadAction<{}>) => {
            state.apiResponse = action.payload
        }
    }
})
export const { responseDetails } = apiResponseList.actions