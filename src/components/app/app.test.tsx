import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeComments, makeFakeGuitars } from '../../utils/mocks';
import App from './app';

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

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Catalog" when user navigates to "/"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "PageNotFound" when user navigates to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
