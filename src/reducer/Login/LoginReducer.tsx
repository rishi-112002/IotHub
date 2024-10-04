import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckUserlogin, ClearResponse, GetBaseUrl, loginUser, logoutUser } from "./LoginAction";
interface UserState {
    userData: any; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const userInitialState: UserState = {
    userData: null,
    status: 'idle',
    error: null,
};

 const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => { // Replace `any` with a more specific type if possible
                state.userData = action.payload;
                if (state.userData.result !== "ERROR") {
                    state.status = 'succeeded';
                } else {
                    state.status = 'failed';
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to login';
            });
    },
});
interface AuthState {
    isLogedIn: boolean;
    token: string|null;
    userName: string|null;
    buCode: string|null;
    loading: boolean;
    error: string|null;
    baseUrl: string | null;
}

const initialState: AuthState = {
    isLogedIn: false,
    token: '',
    userName: '',
    buCode: '',
    loading: false,
    error: '',
    baseUrl: '',
};
 const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setBaseUrl: (state, action) => {
            state.baseUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.isLogedIn = true
                state.token = action.payload.token
                state.userName = action.payload.userName
                state.buCode = action.payload.buCode
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false
            })

            .addCase(CheckUserlogin.fulfilled, (state,  action) => {
                state.loading = false
                state.isLogedIn = true
                state.token = action.payload.token
                state.userName = action.payload.userName
                state.buCode = action.payload.buCode
            })
            .addCase(CheckUserlogin.rejected, (state, action) => {
                console.log("CheckUserloginRejected", action.error)
                state.loading = false
                state.isLogedIn = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.isLogedIn = false
                state.token = ""
                state.userName = ""
                state.buCode = ""
            })
            .addCase(GetBaseUrl.fulfilled, (state, action) => {
             
                state.baseUrl = action.payload;
            })
            .addCase(GetBaseUrl.rejected, (state, action) => {
                console.error("Failed to fetch base URL:", action.error.message);
                state.baseUrl = '';
            })
            .addCase(ClearResponse.fulfilled, (state) => {
                state.baseUrl = ""
            })




    }
})
export const { setBaseUrl } = authSlice.actions; 
export { userSlice, authSlice };