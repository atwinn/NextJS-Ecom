// src/store/employeeSlice.ts

import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_EMPLOYEE } from "@/pages/api/api";

interface EmployeeState {
  employees: any;
  employeesId:any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: EmployeeState = {
  employees: [],
  employeesId: [],
  status: "idle",
  error: null,

};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(API_EMPLOYEE);
    // console.log(response);
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
      addModalEmployee: (state,action) => {
        // console.log(action.payload);
        state.employeesId = action.payload
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      })
     
  },
});
export const {addModalEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeesStatus = (state: RootState) => state.employees.status;
export const selectEmployeesError = (state: RootState) => state.employees.error;
