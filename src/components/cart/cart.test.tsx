import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Cart from './cart';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/root-reducer';
import { makeFakeComments, makeFakeGuitars } from '../../utils/mocks';


const guitars = makeFakeGuitars();
const comments = makeFakeComments();
const history = createMemoryHistory();
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
    comments: comments,
    guitarsOnPage: guitars,
    guitar: guitars[0],
    commentsByGuitarId: comments,
    isCardLoaded: true,
    areCommentsLoaded: true,
  },
  PAGINATION: {
    guitarsCount: 0,
  },
  CART: {
    totalPrice: 0,
    guitarsInCart: [],
    guitarsInCartCount: [],
    discount: 0,
  },
});
describe('Component: Cart', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>
      </Provider>);

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате/i)).toBeInTheDocument();
  });

});
