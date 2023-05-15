import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_CATEGORY } from "@/pages/api/api";

interface Comment {
    com: any;
    comId: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}
const initialState: Comment = {
    com: [],
    comId: [],
    status: "idle",
    error: null,
};

export const fetchComment = createAsyncThunk(
    "users/fetchComment",
    async (id: any) => {
        const response = await axios.get(`/api/dscomment?product=${id}`);
        return response.data;
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.status = "success";
                state.error = null;
                state.com = action.payload;
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch category";
            });
    },
});
export const { } = commentSlice.actions;

export default commentSlice.reducer;
export const selectComment = (state: RootState) => state.comment.com;
export const selectCommentStatus = (state: RootState) => state.comment.status;
export const selectCommentError = (state: RootState) => state.comment.error;
