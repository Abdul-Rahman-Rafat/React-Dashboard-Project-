import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import counterReducer from './slices/counterSlice'
import timerReducer from './slices/timerSlice'
import notesReducer from './slices/notesSlice'
import usersReducer from './slices/usersSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    timer: timerReducer,
    notes: notesReducer,
    users: usersReducer,
  },
})
