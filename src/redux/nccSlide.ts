import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_EMPLOYEE, API_NCC } from "@/pages/api/api";

interface NCCState {
  ncc: any;
  nccId:any
  status: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: NCCState = {
    ncc: [],
    nccId: [],
  status: "idle",
  error: null,

};

export const fetchNcc = createAsyncThunk(
  "employees/fetchNcc",
  async () => {
    const response = await axios.get(API_NCC);
    // console.log(response);
    return response.data;
  }
);

const nccSlice = createSlice({
  name: "ncc",
  initialState,
  reducers: {
      updateNcc: (state,action) => {
        // console.log(action.payload);
        state.nccId = action.payload
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNcc.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNcc.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.ncc = action.payload;
      })
      .addCase(fetchNcc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      })
     
  },
});
export const {updateNcc } = nccSlice.actions;

export default nccSlice.reducer;
export const selectNcc = (state: RootState) => state.ncc.ncc;
export const selectNccStatus = (state: RootState) => state.ncc.status;
export const selectNccError = (state: RootState) => state.ncc.error;
