import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeGuitar } from '../../utils/mocks';
import ProductCard from './product-card';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const mockGuitar = makeFakeGuitar();
    const store = mockStore({
      DATA: { productCard: {}, comments: [], guitarsInCart: []},
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductCard productCard={mockGuitar} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', () => {
    history.push('/fake');
    const mockGuitar = makeFakeGuitar();

    const store = mockStore({
      DATA: { productCard: {}, comments: [], guitarsInCart: []},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Guitar} exact>
              <h1>This is product page</h1>
            </Route>
            <Route>
              <ProductCard productCard={mockGuitar} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Подробнее/i));
    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});
