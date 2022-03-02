import { makeFakeGuitars } from '../../utils/mocks';
import { deleteGuitarInCart, setGuitarsInCart, setTotalPrice } from '../action';
import { cartData } from './cart-data';

const guitars = makeFakeGuitars();

describe('Reducer: cartData', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        totalPrice: 0,
        guitarsInCartCount: [],
        discount: 0,
        guitarsInCart: [],
      });
  });

  it('should update guitars in cart by setGuitarsInCart', () => {
    const state = {
      totalPrice: 0,
      guitarsInCart: [],
      guitarsInCartCount: [],
      discount: 0,
    };
    expect(cartData(state, setGuitarsInCart(guitars[0])))
      .toEqual({
        totalPrice: 0,
        guitarsInCart: [],
        guitarsInCartCount: [],
        discount: 0,
      });
  });

  it('should delete guitars in cart by deleteGuitarInCart', () => {
    const state = {
      totalPrice: 0,
      guitarsInCartCount: [],
      discount: 0,
      guitarsInCart: [],
    };
    expect(cartData(state, deleteGuitarInCart(guitars[0])))
      .toEqual({
        totalPrice: 0,
        guitarsInCart: [],
        guitarsInCartCount: [],
        discount: 0,
      });
  });

  it('should update total price by setTotalPrices', () => {
    const state = {
      totalPrice: 0,
      guitarsInCartCount: [],
      discount: 0,
      guitarsInCart: [],
    };
    expect(cartData(state, setTotalPrice(1000)))
      .toEqual({
        totalPrice: 1000,
        guitarsInCartCount: [],
        discount: 0,
        guitarsInCart: [],
      });
  });
});
