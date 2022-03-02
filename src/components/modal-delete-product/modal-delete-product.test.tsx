import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/root-reducer';
import { makeFakeGuitars } from '../../utils/mocks';
import ModalDeleteProduct from './modal-delete-product';

const guitars = makeFakeGuitars();
const onDeleteModalClose = jest.fn();
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
    totalPrice: 0,
  },
});
describe('Component: ModalDelete', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ModalDeleteProduct guitar={guitars[0]} onDeleteModalClose={onDeleteModalClose} />
      </Provider>);

    expect(screen.getByText(guitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });

});
