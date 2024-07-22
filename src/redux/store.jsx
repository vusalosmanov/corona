import { configureStore, combineReducers } from "@reduxjs/toolkit";
import autReducer from './slice/authSlice'

import cartSlice from "./slice/cartSlice";
const rootReducer = combineReducers({
    auth : autReducer,
    cart : cartSlice,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;