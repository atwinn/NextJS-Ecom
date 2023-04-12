import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableData {
  sanpham: string;
  soluong: number;
  gia: number;
}

interface TableState {
  data: TableData[];
  idNCC: string
}

const initialState: TableState = {
  data: [],
  idNCC: ""
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow(state, action: PayloadAction<TableData>) {
      state.data.push(action.payload);
    },
    getNccId: (state,action) => {
      state.idNCC = action.payload
    }
  },
});

export const { addRow,getNccId } = tableSlice.actions;

export default tableSlice.reducer;