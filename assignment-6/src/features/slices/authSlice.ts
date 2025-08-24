import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../interfaces/interfaces";


const initialState:AuthState = {
    name:null,
    email:null,
    role:null,
    accessToken:null,
    isBlocked:null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthData(state,action:PayloadAction<AuthState>){
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.accessToken = action.payload.accessToken;
            state.isBlocked = action.payload.isBlocked;
        },
        clearAuthData(state){
            state.name = null;
            state.email = null;
            state.role = null;
            state.accessToken = null;
            state.isBlocked = null;
        }
    
    }
})

export const {setAuthData,clearAuthData} = authSlice.actions;
export default authSlice.reducer;
export const currentUserSelector = (state:AuthState) => state