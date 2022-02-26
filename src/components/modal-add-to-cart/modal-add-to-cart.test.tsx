import { createAPI } from '../../services/api';
import { makeFakeGuitars } from '../../utils/mocks';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/root-reducer';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import ModalAddToCart from './modal-add-to-cart';

const guitars = makeFakeGuitars();
const onAddToCardModalClose = jest.fn();
const onSuccessModalOpen = jest.fn();
const middlewares = [thunk.withExtraArgument(createAPI)];
const mockStore = configureMockStore<
RootState,
  Action,
  ThunkDispatch<RootState, typeof createAPI, Action>
>(middlewares);

const store = mockStore({
  DATA: {
    catalog: guitars,
    isDataLoaded: true,
    guitarsOnPage: guitars,
    guitar: guitars[0],
    isCardLoaded: true,
    areCommentsLoaded: true,
    guitarsInCart: guitars,
  },
  PAGINATION: {
    guitarsCount: 0,
  },
  CART: {
    totalPrices: [],
  },
});

describe('Component: ModalAddToCart', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ModalAddToCart guitar={guitars[0]} onAddToCardModalClose={onAddToCardModalClose} onSuccessModalOpen={onSuccessModalOpen} />
      </Provider>);

    expect(screen.getByText(guitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

});
