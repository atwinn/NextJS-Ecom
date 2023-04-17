import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaginationState {
    page: number
    pageSize: number | string
    totalPage: number | string
}

const initialState: PaginationState = {
    page: 0,
    pageSize: 0,
    totalPage: 0
}

export const PaginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
      setPage: (state,action) => {
        state.page = action.payload
      },
      setPageSide: (state,action) => {
        state.pageSize = action.payload
      },
      setPageTotal: (state,action) => {
        state.totalPage = action.payload
      },
    },
})

export const {setPage,setPageSide,setPageTotal} = PaginationSlice.actions

export default PaginationSlice.reducer
