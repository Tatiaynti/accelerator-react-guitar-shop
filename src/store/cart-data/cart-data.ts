import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/cart';
import { setTotalPrice, setGuitarsInCartCount, setDiscount, deleteGuitarInCart, setGuitarsInCart } from '../action';

const initialState: CartData = {
  totalPrice: 0,
  guitarsInCart: [],
  guitarsInCartCount: [],
  discount: 0,
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarsInCart, (state, action) => {
      const { guitarInCart } = action.payload;
      state.guitarsInCart.push(guitarInCart);
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
    })
    .addCase(deleteGuitarInCart, (state, action) => {
      const { deletedGuitarInCart } = action.payload;
      const indexGuitar = state.guitarsInCart.findIndex((guitar) => guitar.id === deletedGuitarInCart.id);
      const indexCount = state.guitarsInCartCount.findIndex((guitar) => guitar.id === deletedGuitarInCart.id);
      state.guitarsInCart.splice(indexGuitar, 1);
      state.guitarsInCartCount.splice(indexCount, 1);
    })
    .addCase(setTotalPrice, (state, action) => {
      const { totalPrice } = action.payload;
      state.totalPrice = totalPrice;
    })
    .addCase(setDiscount, (state, action) => {
      const { discount } = action.payload;
      state.discount = discount;
    });
});

export { cartData };
