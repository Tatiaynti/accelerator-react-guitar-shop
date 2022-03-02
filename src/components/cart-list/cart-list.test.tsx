import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import { makeFakeGuitars } from '../../utils/mocks';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/root-reducer';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CartList from './cart-list';

const history = createMemoryHistory();
const guitars = makeFakeGuitars();
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
  },
  PAGINATION: {
    guitarsCount: 0,
  },
  CART: {
    totalPrice: 0,
    guitarsInCart: guitars,
    guitarsInCartCount: [],
    discount: 0,
  },
});

describe('Component: CartList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartList />
        </Router>
      </Provider>);

    expect(screen.getByText(guitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(guitars[1].name)).toBeInTheDocument();
  });

});
