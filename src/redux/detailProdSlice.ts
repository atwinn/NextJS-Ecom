import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_CATEGORY } from "@/pages/api/api";

interface DetailProd {
    prod: any;
    prodId: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}
const initialState: DetailProd = {
    prod: [],
    prodId: [],
    status: "idle",
    error: null,
};

export const fetchDetail = createAsyncThunk(
    "users/fetchDetail",
    async (id: any) => {
        const response = await axios.get(`/api/products/${id}?populate=*`);
        return response.data;
    }
);

const detailProdSlice = createSlice({
    name: "detailProd",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetail.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchDetail.fulfilled, (state, action) => {
                state.status = "success";
                state.error = null;
                state.prod = action.payload;
            })
            .addCase(fetchDetail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch category";
            });
    },
});
export const { } = detailProdSlice.actions;

export default detailProdSlice.reducer;
export const selectDetail = (state: RootState) => state.detailProd.prod;
export const selectDetailStatus = (state: RootState) => state.detailProd.status;
export const selectDetailError = (state: RootState) => state.detailProd.error;
