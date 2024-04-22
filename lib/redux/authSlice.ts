/*
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart, User } from "../../../interfaces";

interface AuthState {
    user: User | null;
    isLogged: boolean;
    cart: Cart | null;
}

interface LoginPayload {
    user: User;
    cart: Cart;
}

interface updateCartPayload {
    cart: Cart;
}

const isLocalStorageAvailable: boolean = typeof localStorage !== "undefined";

const initialState: AuthState = {
    user: null,
    isLogged:
        isLocalStorageAvailable && localStorage.getItem("token") ? true : false,
    cart: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.user = action.payload.user;
            state.isLogged = true;
            state.cart = action.payload.cart;
        },
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        updateCart: (state, action: PayloadAction<updateCartPayload>) => {
            state.cart = action.payload.cart;
        },
    },
});

export const { login, logout, setUser, updateCart } = authSlice.actions;
export default authSlice.reducer;
*/