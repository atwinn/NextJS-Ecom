import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_PX } from "@/pages/api/api";

interface PhieuXuatState {
    px: any;
    ctPx: any;
    pxId: any;
    status: "idle" | "loading" | "failed";
    error: string | null;
}
const initialState: PhieuXuatState = {
    px: [],
    ctPx: [],
    pxId: [],
    status: "idle",
    error: null,
};

export const fetchPx = createAsyncThunk(
    "employees/fetchPx",
    async () => {
        const response = await axios.get(API_PX);
        return response.data;
    }
);

const pxSlice = createSlice({
    name: "phieuxuat",
    initialState,
    reducers: {
        pxInformation: (state, action) => {
            state.pxId = action.payload
        },
        addCtPx: (state, action) => {
            state.ctPx = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPx.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPx.fulfilled, (state, action) => {
                state.status = "idle";
                state.error = null;
                state.px = action.payload;
            })
            .addCase(fetchPx.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch employees";
            });
    },
});
export const { pxInformation, addCtPx } = pxSlice.actions;

export default pxSlice.reducer;
export const selectPX = (state: RootState) => state.phieuxuat.px;
export const selectPXStatus = (state: RootState) => state.phieuxuat.status;
export const selectPXError = (state: RootState) => state.phieuxuat.error;
