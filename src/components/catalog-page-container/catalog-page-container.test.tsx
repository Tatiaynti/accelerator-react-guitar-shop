import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeComments, makeFakeGuitars } from '../../utils/mocks';
import CatalogPageContainer from './catalog-page-container';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitars = makeFakeGuitars();
const comments = makeFakeComments();

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

store.dispatch = jest.fn();

describe('Component: CatalogPageContainer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogPageContainer />
        </Router>
      </Provider>);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });
});
