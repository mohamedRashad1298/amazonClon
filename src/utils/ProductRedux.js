import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
 basket:[],
 totalPrice:0,
 totalQuantity: 0,
 user:null,
}

const ProductSlice = createSlice({
 name:"product",
 initialState,
 reducers:{
  AddToBasket(state,action){
    const index = state.basket.findIndex((item) => item.title === action.payload.title);

    if (index !== -1) {
      // If the item already exists, update the quantity
      state.basket[index].quantity += 1;
    } else {
      // If the item doesn't exist, add it to the basket
      state.basket.push({ ...action.payload, quantity: 1 });
    }
    state.totalPrice += action.payload.price;
    state.totalQuantity += 1;
    
  },
  removeFromBasket(state,action){
    const index = state.basket.findIndex((item) => item.title === action.payload.title);

    if (index !== -1) {
      // If the item exists, decrement the quantity
      state.basket[index].quantity -= 1;

      // If quantity becomes zero, remove the item from the basket
      if (state.basket[index].quantity === 0) {
        state.basket.splice(index, 1);
      }

      // Update totalQuantity and totalPrice
      state.totalQuantity -= 1;
      state.totalPrice -= action.payload.price;
    }
  },

emaptyBasket(state){
state.basket = [];
state.totalPrice=0;
state.totalQuantity=0
},

userLogin(state,action){
state.user = action.payload
},
userLogOut(state){
  state.user = null
}

 }
})

export const ProductAction = ProductSlice.actions

const store = configureStore({
reducer : ProductSlice.reducer
})

export default store