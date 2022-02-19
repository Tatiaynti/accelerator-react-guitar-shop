import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/cart';
import { setTotalPrices } from '../action';

const initialState: CartData = {
  guitarsInCart: [],
  totalPrices: [],
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(setTotalPrices, (state, action) => {
      const { totalPrice } = action.payload;
      state.totalPrices.push(totalPrice);
    });
});

export { cartData };
