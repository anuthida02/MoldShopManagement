import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginState, User } from '../types/User.interface';

const initialState: LoginState = {
    isLogin: false,
    user: null
};

const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        login(state, action: PayloadAction<{ user: User }>){
            state.isLogin = true;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isLogin = false;
            state.user = null;
        },
    },
  });
  
  export const { login, logout } = loginSlice.actions;
  export default loginSlice.reducer;