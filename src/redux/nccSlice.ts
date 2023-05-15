import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_EMPLOYEE, API_NCC, API_NSX } from "@/pages/api/api";

interface NCCState {
  ncc: any;
  nsx: any;
  nsxId: any;
  nccId:any
  status: "idle" | "loading" | "failed";
  statusNSX: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: NCCState = {
    ncc: [],
    nsx: [],
    nsxId: [],
    nccId: [],
  status: "idle",
  statusNSX: "idle",
  error: null,

};

export const fetchNcc = createAsyncThunk(
  "employees/fetchNcc",
  async () => {
    const response = await axios.get(`${API_NCC}&pagination[page]=1&pagination[pageSize]=100`);
    // console.log(response);
    return response.data;
  }
);
export const fetchNsx = createAsyncThunk(
  "employees/fetchNsx",
  async () => {
    const response = await axios.get(API_NSX);
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
      },
      updateNsx: (state,action) => {
        // console.log(action.payload);
        state.nsxId = action.payload
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
      .addCase(fetchNsx.pending, (state) => {
        state.statusNSX = "loading";
        state.error = null;
      })
      .addCase(fetchNsx.fulfilled, (state, action) => {
        state.statusNSX = "idle";
        state.error = null;
        state.nsx = action.payload;
      })
      .addCase(fetchNsx.rejected, (state, action) => {
        state.statusNSX = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      })
     
  },
});
export const {updateNcc,updateNsx } = nccSlice.actions;

export default nccSlice.reducer;
export const selectNcc = (state: RootState) => state.ncc.ncc;
export const selectNccStatus = (state: RootState) => state.ncc.status;
export const selectNccError = (state: RootState) => state.ncc.error;
export const selectNsx = (state: RootState) => state.ncc.nsx;
export const selectNsxStatus = (state: RootState) => state.ncc.statusNSX;
export const selectNsxError = (state: RootState) => state.ncc.error;
