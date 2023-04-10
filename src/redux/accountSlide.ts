import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_ACCOUNT_EMPLOYEE } from "@/pages/api/api";

interface EmployeeState {
  accEmployees: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: EmployeeState = {
  accEmployees: [],
  status: "idle",
  error: null,
};

export const fetchAccountEmployees = createAsyncThunk(
  "employees/fetchAccountEmployees",
  async () => {
    const response = await axios.get(API_ACCOUNT_EMPLOYEE);
    // console.log(response);
    return response.data;
  }
);

const accEmployeeSlice = createSlice({
  name: "accEmployees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAccountEmployees.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.accEmployees = action.payload;
      })
      .addCase(fetchAccountEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      });
  },
});
export const {} = accEmployeeSlice.actions;

export default accEmployeeSlice.reducer;
export const selectAccEmployees = (state: RootState) =>
  state.accEmployees.accEmployees;
export const selectAccEmployeesStatus = (state: RootState) =>
  state.accEmployees.status;
export const selectAccEmployeesError = (state: RootState) =>
  state.accEmployees.error;
