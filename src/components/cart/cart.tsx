import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getTotalPrices } from '../../store/selectors';
import CartList from '../cart-list/cart-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import VisuallyHiddenComponent from '../visually-hidden-component/visually-hidden-component';

function Cart(): JSX.Element {
  const totalPrices = useSelector(getTotalPrices);
  const totalPrice = totalPrices.reduce((prev, current) => prev + current, 0);

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
                  <form className="coupon__form" id="coupon-form" method="post" action="/">
                    <div className="form-input coupon__input">
                      <label className="visually-hidden">Промокод</label>
                      <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                      <p className="form-input__message form-input__message--success">Промокод принят</p>
                    </div>
                    <button className="button button--big coupon__button">Применить</button>
                  </form>
                </div>
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice}</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
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
