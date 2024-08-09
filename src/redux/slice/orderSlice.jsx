import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],  
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
    },
});

export const { addOrder } = orderSlice.actions;  
export default orderSlice.reducer; 
