import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/cart';
import { setTotalPrice, setGuitarsInCartCount } from '../action';

const initialState: CartData = {
  totalPrice: 0,
  guitarsInCartCount: [],
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(setTotalPrice, (state, action) => {
      const { totalPrice } = action.payload;
      state.totalPrice = totalPrice;
    })
    .addCase(setGuitarsInCartCount, (state, action) => {
      const { guitarInCartCount } = action.payload;
      if (state.guitarsInCartCount.some((guitar) => guitar.id === guitarInCartCount.id)) {
        state.guitarsInCartCount.forEach((guitar) => {
          if (guitar.id === guitarInCartCount.id) {
            guitar.count = guitarInCartCount.count;
          }
        });
      } else {
        state.guitarsInCartCount.push(guitarInCartCount);
      }
    });
});

export { cartData };
