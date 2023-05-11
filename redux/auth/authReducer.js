import {createSlice} from "@reduxjs/toolkit";

const state = {
    userID: null,
    login: null,
    stateChange: false,
  };

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        login: null,
        stateChange: null,
    },
    reducers: {
        updateUserProfile: (state, {payload}) => ({
            ...state, 
            userId: payload.userId,
            login: payload.login,
        }),
        authStateChange: (state, {payload}) => ({
            ...state, 
            stateChange: payload.stateChange
        }),
        authLogOut: () => state,
    }
});