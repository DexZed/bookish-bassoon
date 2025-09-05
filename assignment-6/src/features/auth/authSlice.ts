import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../interfaces/globalInterfaces";


const initialState:AuthState = {
    id:null,
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
        setAuthData(state,action:PayloadAction<Partial<AuthState>>){
            state.id = action.payload.id ?? state.id;
            state.name = action.payload.name ?? state.name;
            state.email = action.payload.email ?? state.email;
            state.role = action.payload.role ?? state.role;
            state.accessToken = action.payload.accessToken ?? state.accessToken;
            state.isBlocked = action.payload.isBlocked ?? state.isBlocked;
        },
        clearAuthData(state){
            state.id = null;
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