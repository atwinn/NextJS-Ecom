import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface TableData {
  idgetSP?: string | number;
  product: string | null;
  soluong?: number | null | string;
  gia?: number | null | string;
}

export interface TableState {
  data: TableData[];
  dataInView: TableData[];
  idNCC: string;
  idSp: string;
  idPn: string;
  tab: string;
  dataCTPn: TableData[];
}
export const initialState: TableState = {
  data: [],
  dataInView: [],
  idNCC: "",
  idSp: "",
  idPn: "",
  tab: "1",
  dataCTPn: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    deleteRow(state) {
      state.data.splice(0, state.data.length);
    },
    getNccId: (state, action) => {
      state.idNCC = action.payload;
    },
    getSpId: (state, action) => {
      state.idSp = action.payload;
    },
    getIdPN: (state, action) => {
      state.idPn = action.payload;
    },
    getInforModalCtPN: (state, action) => {
      state.dataCTPn = action.payload;
    },
    fetchCtPn: (state, action) => {
     state.data = action.payload
      
    },
    fetchCtPnInView: (state, action) => {
     state.dataInView = action.payload
      
    },
    setTab: (state, action) => {
     state.tab = action.payload
      
    },
  },
});

export const {
  getNccId,
  getSpId,
  getIdPN,
  deleteRow,
  getInforModalCtPN,
  fetchCtPn,
  fetchCtPnInView,
  setTab
} = tableSlice.actions;

export default tableSlice.reducer;
