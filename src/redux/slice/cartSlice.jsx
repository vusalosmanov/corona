import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            )

            state.totalQuantity++
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quatity: 1,
                    totalPrice: newItem.price
                })
            }

            else {
                existingItem.quatity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number
                    (newItem.price)
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quatity))
        }
    }

});

export const cartActions = cartSlice.actions

export default cartSlice.reducer