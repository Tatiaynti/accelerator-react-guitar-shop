import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ModalSuccessAddToCart from './modal-success-add-to-cart';

const onSuccessModalClose = jest.fn();
const history = createMemoryHistory();

describe('Component: ModalSuccessAddToCart', () => {

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ModalSuccessAddToCart onSuccessModalClose={onSuccessModalClose} />
      </Router>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });

});
