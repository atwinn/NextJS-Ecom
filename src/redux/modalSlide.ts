import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
       openModal: (state,action) => {
        state.isOpen = action.payload
       },
       closeModal: (state,action) => {
        state.isOpen = action.payload
       }
    },
})

export const { openModal,closeModal } = modalSlice.actions

export default modalSlice.reducer
