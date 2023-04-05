import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  curModal: string;
}

const initialState: ModalState = {
  isOpen: false,
  curModal: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    currModal: (state, action) => {
      state.curModal = action.payload;
    },
  },
});

export const { openModal, closeModal, currModal } = modalSlice.actions;

export default modalSlice.reducer;
