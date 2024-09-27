import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const apiResponseList = createSlice({
    name: "AllResponseData",
    initialState: { apiResponse: {} },
    reducers: {
        responseDetails: (state, action:PayloadAction<{}>) => {
            state.apiResponse = action.payload
        }
    }
})
export const { responseDetails } = apiResponseList.actions