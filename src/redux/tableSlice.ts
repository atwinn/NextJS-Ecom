import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableData {
  product: string | null;
  soluong: number | null;
  gia: number | null;
}

interface TableState {
  data: TableData[];
  idNCC: string
  idSp: string
  idPn:string
}

const initialState: TableState = {
  data: [],
  idNCC: "",
  idSp: "",
  idPn:""
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow(state, action: PayloadAction<TableData>) {
      state.data.push(action.payload);
    },
    deleteRow(state) {
      state.data.splice(0,state.data.length);
    },
    getNccId: (state,action) => {
      state.idNCC = action.payload
    },
    getSpId: (state,action) => {
      state.idSp = action.payload
    },
    getIdPN: (state,action) => {
      state.idPn = action.payload
    }
  },
});

export const { addRow,getNccId,getSpId, getIdPN,deleteRow} = tableSlice.actions;

export default tableSlice.reducer;