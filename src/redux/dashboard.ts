import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashBoardState {
    value: number
}

const initialState: DashBoardState = {
    value: 0,
}

export const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
    },
})

export const {   } = dashBoardSlice.actions

export default dashBoardSlice.reducer
