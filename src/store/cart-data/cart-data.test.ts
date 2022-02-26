import { makeFakeGuitars } from '../../utils/mocks';
import { deleteGuitarInCart, setGuitarsInCart, setTotalPrices } from '../action';
import { cartData } from './cart-data';

const guitars = makeFakeGuitars();

describe('Reducer: cartData', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        totalPrices: [],
      });
  });

  it('should update guitars in cart by setGuitarsInCart', () => {
    const state = {
      totalPrices: [],
    };
    expect(cartData(state, setGuitarsInCart(guitars[0])))
      .toEqual({
        totalPrices: [],
      });
  });

  it('should delete guitars in cart by deleteGuitarInCart', () => {
    const state = {
      totalPrices: [],
    };
    expect(cartData(state, deleteGuitarInCart(guitars[0])))
      .toEqual({
        totalPrices: [],
      });
  });

  it('should update total price by setTotalPrices', () => {
    const state = {
      totalPrices: [],
    };
    expect(cartData(state, setTotalPrices(1000)))
      .toEqual({
        totalPrices: [1000],
      });
  });
});
