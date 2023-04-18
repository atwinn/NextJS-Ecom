import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

// Import các reducers của bạn
import counterReducer from './counterSlice'
import modalSlice from './modalSlice'
import userSlice from './userSlice'
import tableSlice from './tableSlice'
import employeeSlide from './employeeSlice'
import accountSlide from './accountSlice'
import nccSlide from './nccSlice'
import productSlice from './productSlice'
import listPnSlice from './listPnSlice'
import categorySlice from './categorySlice'
import PaginationSlice from './pagimationSlice'

// Tạo store với reducer của bạn
const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalSlice,
    user: userSlice,
    table: tableSlice,
    employees: employeeSlide,
    accEmployees: accountSlide,
    ncc: nccSlide,
    product: productSlice,
    pn: listPnSlice,
    category: categorySlice
  },
})

// Export các kiểu cho useSelector hook
export type RootState = ReturnType<typeof store.getState>

// Export hook useSelector với kiểu RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Export useDispatch hook để dispatch các action
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()

export default store
