import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_CATEGORY } from "@/pages/api/api";

interface CartState {
    cart: any;
    cartId: any;
    status: "success" | "loading" | "failed" | "idle";
    error: string | null;
}
const initialState: CartState = {
    cart: [],
    cartId: [],
    status: "idle",
    error: null,
};

export const fetchCart = createAsyncThunk(
    "user/fetchCart",
    async (id: any) => {
        const response = await axios.get(`/api/dscart?user_id=${id}`);
        return response.data.dscart;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartNumber: (state, action) => {
            state.cartId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "success";
                state.error = null;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch cart";
            });
    },
});
export const { updateCartNumber } = cartSlice.actions;

export default cartSlice.reducer;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError = (state: RootState) => state.cart.error;
