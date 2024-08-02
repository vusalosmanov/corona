import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
    isLoggedIn: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            state.totalQuantity++;
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    date: newItem.date,
                    color: newItem.color,
                    os: newItem.os,
                    cpu: newItem.cpu,
                    gpu: newItem.gpu,
                    storageCapacity: newItem.storageCapacity,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) + Number(newItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.totalPrice),
                0
            );
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        increaseQuantity: (state, action) => {
            const index = action.payload;
            const item = state.cartItems[index];
            item.quantity++;
            item.totalPrice = item.price * item.quantity;
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.totalPrice,
                0
            );
        },
        decreaseQuantity: (state, action) => {
            const index = action.payload;
            const item = state.cartItems[index];
            if (item.quantity > 1) {
                item.quantity--;
                item.totalPrice = item.price * item.quantity;
                state.totalAmount = state.cartItems.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                );
            }
        },
        removeItem: (state, action) => {
            const index = action.payload;
            state.cartItems.splice(index, 1);
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.totalPrice,
                0
            );
            state.totalQuantity--;
        }
    },
});
export const cartActions = cartSlice.actions;
export const { addItem, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
