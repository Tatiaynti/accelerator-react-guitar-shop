import { GuitarInCartCount } from './guitar-in-cart-count';

type CartData = {
  totalPrice: number,
  guitarsInCartCount: GuitarInCartCount[],
  discount: number
};

export type {CartData};
