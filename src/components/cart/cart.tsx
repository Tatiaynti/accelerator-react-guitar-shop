import { ChangeEvent, InvalidEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, MAX_COUNT_GUITAR_IN_CART, MIN_COUNT_GUITAR_IN_CART, PromoCode, PromoCodeValidate } from '../../const';
import { setTotalPrice } from '../../store/action';
import { getGuitarsInCart, getGuitarsInCartCount, getTotalPrice } from '../../store/selectors';
import { convertPromoCodeToDiscount } from '../../utils/utils';
import CartList from '../cart-list/cart-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import VisuallyHiddenComponent from '../visually-hidden-component/visually-hidden-component';

function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalPrice);
  const guitarsInCartCount = useSelector(getGuitarsInCartCount);
  const guitarsInCart = useSelector(getGuitarsInCart);

  const [couponValue, setCouponValue] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(PromoCodeValidate.Unknown);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let price = 0;
    guitarsInCart.forEach((guitar) => {
      guitarsInCartCount.forEach((count) => {
        if (guitar.id === count.id) {
          if (count.count > MAX_COUNT_GUITAR_IN_CART) {
            price = price + (guitar.price * MAX_COUNT_GUITAR_IN_CART);
          } else if (count.count < MIN_COUNT_GUITAR_IN_CART) {
            price = price + (guitar.price * MIN_COUNT_GUITAR_IN_CART);
          } else {
            price = price + (guitar.price * count.count);
          }
        }
      });
    });
    dispatch(setTotalPrice(price));
  }, [dispatch, guitarsInCart, guitarsInCartCount]);

  const handleCouponInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(target.value.toLowerCase().trim());
  };

  const handleCouponFormSubmit = (evt: InvalidEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (Object.values(PromoCode).includes(couponValue as PromoCode)  && couponValue !== PromoCode.Unvalid) {
      setIsCouponValid(PromoCodeValidate.True);
      setDiscount(convertPromoCodeToDiscount(couponValue as PromoCode));
    }
    else if (couponValue === PromoCode.Unvalid) {
      setIsCouponValid(PromoCodeValidate.Unknown);
    }
    else {
      setIsCouponValid(PromoCodeValidate.False);
      setDiscount(convertPromoCodeToDiscount());
    }
  };

  return (
    <>
      <VisuallyHiddenComponent/>
      <Header />
      <div className="wrapper">
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">Корзина</h1>
            <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
              <li className="breadcrumbs__item"><Link to={AppRoute.Catalog} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={AppRoute.Catalog} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={AppRoute.Cart} className="link">Корзина</Link>
              </li>
            </ul>
            <div className="cart">

              <CartList />

              <div className="cart__footer">
                <div className="cart__coupon coupon">
                  <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                  <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                  <form className="coupon__form" id="coupon-form" onSubmit={handleCouponFormSubmit}>
                    <div className="form-input coupon__input">
                      <label className="visually-hidden">Промокод</label>
                      <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" value={couponValue} onChange={handleCouponInputChange} />
                      {isCouponValid === PromoCodeValidate.False &&  <p className="form-input__message form-input__message--error">Неверный промокод</p>}
                      {isCouponValid === PromoCodeValidate.True &&  <p className="form-input__message form-input__message--success">Промокод принят</p>}

                    </div>
                    <button className="button button--big coupon__button">Применить</button>
                  </form>
                </div>
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice}</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span>                  {discount <= 0 ? <span className="cart__total-value">0 ₽</span> : <span className="cart__total-value cart__total-value--bonus">-{discount} ₽</span>}</p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{totalPrice - discount}</span></p>
                  <button className="button button--red button--big cart__order-button">Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}
export default Cart;
