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
import CartItem from './cart-item';

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
    guitarsInCart: [],
  },
  PAGINATION: {
    guitarsCount: 0,
  },
  CART: {
    totalPrices: [],
  },
});
describe('Component: CartItem', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartItem guitar={guitars[0]} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(guitars[0].name)).toBeInTheDocument();
  });

});
