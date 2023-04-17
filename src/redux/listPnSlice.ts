import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_EMPLOYEE, API_NCC, API_NSX, API_PN } from "@/pages/api/api";

interface PNState {
  pn: any;
  historyPn:any
  status: "idle" | "loading" | "failed";
  statusNSX: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: PNState = {
    pn: [],
    historyPn: [],
  status: "idle",
  statusNSX: "idle",
  error: null,

};

export const fetchPN = createAsyncThunk(
  "employees/fetchPN",
  async (data:any, thunkAPI) => {
    // console.log(data.page);
    const {page,pageSize} = data
    // console.log(`https://l3mshop.onrender.com/api/phieu-nhaps?sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    const response = await axios.get(`${API_PN}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    // console.log(response);
    return response.data;
  }
);

const nccSlice = createSlice({
  name: "ncc",
  initialState,
  reducers: {
      getDataHistory: (state,action) => { 
        state.historyPn = action.payload
       }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPN.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPN.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.pn = action.payload;
      })
      .addCase(fetchPN.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      })
     
  },
});
export const { getDataHistory} = nccSlice.actions;

export default nccSlice.reducer;
export const selectPn = (state: RootState) => state.pn.pn;
export const selectPnStatus = (state: RootState) => state.pn.status;
export const selectPnError = (state: RootState) => state.pn.error;

