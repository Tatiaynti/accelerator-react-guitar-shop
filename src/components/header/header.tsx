import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getGuitarsInCart } from '../../store/selectors';
import HeaderFormSearch from './header-form-search';

function Header(): JSX.Element {
  const path = useLocation().pathname;
  const guitarsInCart = useSelector(getGuitarsInCart);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Catalog}> <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li><Link className="link main-nav__link" to={AppRoute.PageNotFound}>Где купить?</Link>
            </li>
            <li><Link className="link main-nav__link" to={AppRoute.PageNotFound}>О компании</Link>
            </li>
          </ul>
        </nav>
        <HeaderFormSearch />
        <Link className={path === AppRoute.Cart ?
          'link header__cart-link link--current' :
          'link header__cart-link link'} aria-label="Корзина" to={AppRoute.Cart}
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {guitarsInCart.length !== 0 && <span className="header__cart-count">{guitarsInCart.length}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
