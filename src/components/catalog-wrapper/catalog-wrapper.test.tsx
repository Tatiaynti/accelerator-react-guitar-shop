import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeComments, makeFakeGuitars } from '../../utils/mocks';
import CatalogWrapper from './catalog-wrapper';

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
    guitarsInCart: [],
  },
  PAGINATION: {
    guitarsCount: 0,
  },
});

store.dispatch = jest.fn();

describe('Component: CatalogWrapper', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogWrapper />
        </Router>
      </Provider>);

    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
});
