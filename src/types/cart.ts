import { GuitarType } from './guitar';
import { GuitarInCartCount } from './guitar-in-cart-count';

type CartData = {
  totalPrice: number,
  guitarsInCart: GuitarType[],
  guitarsInCartCount: GuitarInCartCount[],
  discount: number
};

export type {CartData};
