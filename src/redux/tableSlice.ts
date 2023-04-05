import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableData {
  sanpham: string;
  soluong: number;
  gia: number;
}

interface TableState {
  data: TableData[];
}

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow(state, action: PayloadAction<TableData>) {
      state.data.push(action.payload);
    },
  },
});

export const { addRow } = tableSlice.actions;

export default tableSlice.reducer;