import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_CATEGORY } from "@/pages/api/api";

interface ProductState {
    category: any;
    categoryId: any;
    status: "success" | "loading" | "failed" | "idle";
    error: string | null;
}
const initialState: ProductState = {
    category: [],
    categoryId: [],
    status: "idle",
    error: null,
};

export const fetchCategory = createAsyncThunk(
    "employees/fetchCategory",
    async () => {
        const response = await axios.get(API_CATEGORY);
        return response.data;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        updateCate: (state, action) => {
            state.categoryId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = "success";
                state.error = null;
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch category";
            });
    },
});
export const { updateCate } = categorySlice.actions;

export default categorySlice.reducer;
export const selectCategory = (state: RootState) => state.category.category;
export const selectCategoryStatus = (state: RootState) => state.category.status;
export const selectCategoryError = (state: RootState) => state.category.error;
