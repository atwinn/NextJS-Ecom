// src/store/employeeSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_PRODUCT } from "@/pages/api/api";

interface ProductState {
  product: any;
  productId: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: ProductState = {
  product: [],
  productId: [],
  status: "idle",
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "employees/fetchProduct",
  async () => {
    const response = await axios.get(API_PRODUCT);
    // console.log(response);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProd: (state, action) => {
      state.productId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      });
  },
});
export const { updateProd } = productSlice.actions;

export default productSlice.reducer;
export const selectProduct = (state: RootState) => state.product.product;
export const selectProductStatus = (state: RootState) => state.product.status;
export const selectProductError = (state: RootState) => state.product.error;
