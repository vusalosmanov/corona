import { configureStore, combineReducers } from "@reduxjs/toolkit";
import autReducer from './slice/authSlice'
import orderSlice from "./slice/orderSlice";
import cartSlice from "./slice/cartSlice";
const rootReducer = combineReducers({
    auth: autReducer,
    cart: cartSlice,
    orders: orderSlice,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;