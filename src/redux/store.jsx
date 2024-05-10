import { configureStore, combineReducers } from "@reduxjs/toolkit";
import autReducer from './slice/authSlice'
import { auth } from "../firebase/config";
const rootReducer = combineReducers({
    auth : autReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;