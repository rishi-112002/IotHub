import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetDisplays, GetReader, GetSmartControllers, GetWeightBridge } from "./GenericAddDetailsAction"



type AuthState = {
    smartController: [],
    display: [],
    reader: [],
    weighBriges: [],
    readerLoader: boolean,
    displaysLoader: boolean,
    smartControllerLoader: boolean
}

const initState: AuthState = {
    smartController: [],
    display: [],
    weighBriges: [],
    reader: [],
    readerLoader: true,
    displaysLoader: false,
    smartControllerLoader: false
}
export const GenericAddDetailsSlice = createSlice({
    name: "genericAddDetails",
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(GetSmartControllers.fulfilled, (state, action) => {
            state.smartController = action.payload
            state.smartControllerLoader = false
            console.log("done")
        })
        builder.addCase(GetSmartControllers.rejected, (state) => {
            state.smartController = []
            console.log("error")
            state.smartControllerLoader = false
        })
        builder.addCase(GetSmartControllers.pending, (state) => {
            console.log("pending")
            state.smartControllerLoader = true
        })
        builder.addCase(GetDisplays.fulfilled, (state, action) => {
            state.display = action.payload
            state.displaysLoader = false
            console.log("done")
        })
        builder.addCase(GetDisplays.rejected, (state) => {
            state.display = []
            console.log("error")
            state.displaysLoader = false
        })
        builder.addCase(GetDisplays.pending, (state) => {
            console.log("pending")
            state.displaysLoader = true
        })
        builder.addCase(GetReader.fulfilled, (state, action) => {
            state.reader = action.payload
            state.readerLoader = false
            console.log("done")
        })
        builder.addCase(GetReader.rejected, (state) => {
            state.reader = []
            console.log("error")
            state.readerLoader = false
        })
        builder.addCase(GetReader.pending, (state) => {
            console.log("pending")
            state.readerLoader = true
        })
        builder.addCase(GetWeightBridge.fulfilled, (state, action) => {
            state.weighBriges = action.payload
            state.readerLoader = false
            console.log("done")
        })
        builder.addCase(GetWeightBridge.rejected, (state) => {
            state.weighBriges = []
            console.log("error")
            state.readerLoader = false
        })
        builder.addCase(GetWeightBridge.pending, (state) => {
            console.log("pending")
            state.readerLoader = true
        })
    }

})