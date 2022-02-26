import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type ModalSuccessAddToCartProps = {
  onSuccessModalClose: () => void
}

function ModalSuccessAddToCart({ onSuccessModalClose }: ModalSuccessAddToCartProps): JSX.Element {
  return (
    <ReactFocusLock>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal=""></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <Link to={AppRoute.Cart} className="button button--small modal__button">Перейти в корзину</Link>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={onSuccessModalClose}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onSuccessModalClose}>
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalSuccessAddToCart;
