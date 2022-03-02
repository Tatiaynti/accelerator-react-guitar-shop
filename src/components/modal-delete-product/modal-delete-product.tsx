import ReactFocusLock from 'react-focus-lock';
import { useDispatch } from 'react-redux';
import { deleteGuitarInCart } from '../../store/action';
import { GuitarType } from '../../types/guitar';
import { changeGuitarTypeToReadable } from '../../utils/utils';

type ModalDeleteProps = {
  guitar: GuitarType,
  onDeleteModalClose: () => void
}

function ModalDeleteProduct({ guitar, onDeleteModalClose }: ModalDeleteProps): JSX.Element {
  const dispatch = useDispatch();
  const {previewImg, name, vendorCode, type, stringCount, price} = guitar;
  document.body.classList.add('unscrollable');

  const handleDeleteButtonClick = () => {
    dispatch(deleteGuitarInCart(guitar));
    document.body.classList.remove('unscrollable');
  };

  return (
    <ReactFocusLock>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal="" onClick={onDeleteModalClose}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info"><img className="modal__img" src={`/${previewImg.replace('guitar', 'content/guitar')}`} alt={name} width="67" height="137"/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{changeGuitarTypeToReadable(type)},<br /> {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button" onClick={handleDeleteButtonClick}>Удалить товар</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={onDeleteModalClose}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onDeleteModalClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalDeleteProduct;
