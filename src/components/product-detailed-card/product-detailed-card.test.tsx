import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeFakeComments, makeFakeGuitars } from '../../utils/mocks';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/root-reducer';
import { AnyAction } from '@reduxjs/toolkit';
import ProductDetailedCard from './product-detailed-card';
import { render, screen } from '@testing-library/react';

const guitars = makeFakeGuitars();
const comments = makeFakeComments();
const history = createMemoryHistory();
const middlewares = [thunk.withExtraArgument(createAPI)];
const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
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
    guitarsInCart: [],
  },
  PAGINATION: {
    guitarsCount: 0,
  },
});

describe('Component: ProductDetailedCard', () => {

  it('should render ProductDetailedCard', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductDetailedCard />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(guitars[0].vendorCode)).toBeInTheDocument();
    expect(screen.getByText(guitars[0].description)).toBeInTheDocument();
  });
});
