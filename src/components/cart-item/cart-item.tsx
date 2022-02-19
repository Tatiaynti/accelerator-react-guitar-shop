import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MAX_COUNT_GUITAR_IN_CART, MIN_COUNT_GUITAR_IN_CART } from '../../const';
import { deleteGuitarInCart, setTotalPrices } from '../../store/action';
import { GuitarType } from '../../types/guitar';
import { changeGuitarTypeToReadable } from '../../utils/utils';

type CartItemProps = {
  guitar: GuitarType,
}

function CartItem({guitar}: CartItemProps): JSX.Element {
  const {previewImg, name, vendorCode, type, stringCount, price, id} = guitar;
  const dispatch = useDispatch();
  const [guitarCount, setGuitarCount] = useState(1);

  const handleDecreaseButtonClick = () => {
    if (guitarCount > MIN_COUNT_GUITAR_IN_CART) {
      setGuitarCount(guitarCount - 1);
      dispatch(setTotalPrices(-price));
    } else {
      dispatch(deleteGuitarInCart(guitar));
      dispatch(setTotalPrices(-price));
    }
  };

  const handleIncreaseButtonClick = () => {
    if (guitarCount < MAX_COUNT_GUITAR_IN_CART) {
      setGuitarCount(guitarCount + 1);
      dispatch(setTotalPrices(price));
    }
  };

  const handleInputCountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const prevCount = guitarCount;
    setGuitarCount(Number(target.value));
    dispatch(setTotalPrices((Number(target.value) * price) - (prevCount * price)));
  };

  const handleInputCountBlure = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(target.value) > MAX_COUNT_GUITAR_IN_CART) {
      setGuitarCount(MAX_COUNT_GUITAR_IN_CART);
    }
    if (Number(target.value) < MIN_COUNT_GUITAR_IN_CART) {
      setGuitarCount(MIN_COUNT_GUITAR_IN_CART);
    }
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteGuitarInCart(guitar));
    dispatch(setTotalPrices(price));
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleDeleteButtonClick}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={`/${previewImg.replace('guitar', 'content/guitar')}`} width="55" height="130" alt={name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{changeGuitarTypeToReadable(type)}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={handleDecreaseButtonClick}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id={`${id}-count`} name={`${id}-count`} max={MAX_COUNT_GUITAR_IN_CART} value={guitarCount} onChange={handleInputCountChange} onBlur={handleInputCountBlure} />
        <button className="quantity__button" aria-label="Увеличить количество" onClick={handleIncreaseButtonClick}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitarCount < MIN_COUNT_GUITAR_IN_CART ? MIN_COUNT_GUITAR_IN_CART * price : guitarCount * price} ₽</div>
    </div>
  );
}

export default CartItem;
