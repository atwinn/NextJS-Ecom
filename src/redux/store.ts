import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

// Import các reducers của bạn
import counterReducer from './counterSlice'
import modalSlice from './modalSlide'
import userSlice from './userSlice'

// Tạo store với reducer của bạn
const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalSlice,
    user: userSlice,
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
