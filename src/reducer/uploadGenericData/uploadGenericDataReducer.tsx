import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadGenericData } from './uploadGenericDataAction';

interface UploadState {
    genericData: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UploadState = {
    genericData: null,
    status: 'idle',
    error: null,
};

export const UploadGenericSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadGenericData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(uploadGenericData.fulfilled, (state, action: PayloadAction<any>) => {
                state.genericData = action.payload;
                if (state.genericData.result !== "ERROR") {
                    state.status = 'succeeded';
                    state.error = null;

                } else {
                    state.status = 'failed';
                }
            })
            .addCase(uploadGenericData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to upload generic data';
                console.log("error in reducer ", action.payload)
            });
    },
});

