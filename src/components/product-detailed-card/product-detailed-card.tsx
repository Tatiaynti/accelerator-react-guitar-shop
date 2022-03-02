import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchCommentsByGuitarIdAction, fetchGuitarByIdAction } from '../../store/api-actions';
import { getCommentsByGuitarId, getGuitarById, getIsCardLoaded } from '../../store/selectors';
import { changeGuitarTypeToReadable, setRatingStars } from '../../utils/utils';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalAddToCart from '../modal-add-to-cart/modal-add-to-cart';
import ModalSuccessAddToCart from '../modal-success-add-to-cart/modal-success-add-to-cart';
import PageNotFound from '../page-not-found/page-not-found';
import ProductCardComments from '../product-card-comments/product-card-comments';
import VisuallyHiddenComponent from '../visually-hidden-component/visually-hidden-component';

type CardParams = {
  id: string
}

function ProductDetailedCard(): JSX.Element {
  const { id } = useParams<CardParams>();
  const dispatch = useDispatch();
  const guitar = useSelector(getGuitarById);
  const comments = useSelector(getCommentsByGuitarId);
  const isProductCardLoaded = useSelector(getIsCardLoaded);
  const [isFirstTabChosen, setFirstTabChosen] = useState(true);
  const [isModalAddToCardOpen, setIsModalAddToCardOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const handleEscapeKeyDown = useCallback((evt: { key: string; }) => {
    if (evt.key === 'Escape') {
      setIsModalAddToCardOpen(false);
      setIsModalSuccessOpen(false);
      document.body.removeEventListener('keydown', handleEscapeKeyDown);
    }
  }, []);

  const handleModalAddToCardOpen = () => {
    setIsModalAddToCardOpen(true);
    document.body.classList.add('unscrollable');
  };

  const onAddToCardModalClose = () => {
    setIsModalAddToCardOpen(false);
    document.body.classList.remove('unscrollable');
  };

  const onSuccessModalOpen = () => {
    setIsModalSuccessOpen(true);
    document.body.classList.add('unscrollable');
  };

  const onSuccessModalClose = () => {
    setIsModalSuccessOpen(false);
    document.body.classList.remove('unscrollable');
  };

  const handleCharacteristicsTabClick = () => {
    setFirstTabChosen(true);
  };

  const handleDescriptionTabClick = () => {
    setFirstTabChosen(false);
  };

  useEffect(() => {
    dispatch(fetchGuitarByIdAction(+id));
    dispatch(fetchCommentsByGuitarIdAction(+id));
  }, [id, dispatch]);

  useEffect(() => {
    isModalAddToCardOpen ?
      document.body.addEventListener('keydown', handleEscapeKeyDown) :
      document.body.removeEventListener('keydown', handleEscapeKeyDown);
  }, [handleEscapeKeyDown, isModalAddToCardOpen]);

  useEffect(() => {
    isModalSuccessOpen ?
      document.body.addEventListener('keydown', handleEscapeKeyDown) :
      document.body.removeEventListener('keydown', handleEscapeKeyDown);
  }, [handleEscapeKeyDown, isModalSuccessOpen]);

  if (!guitar || !isProductCardLoaded) {
    return (isProductCardLoaded ? <PageNotFound /> :
      <div className="wrapper">
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link to={AppRoute.Catalog} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={AppRoute.Catalog} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={AppRoute.Guitar} className="link">Товар</Link>
              </li>
            </ul>
            Loading...
          </div>
        </main>
      </div>);
  }

  const {name, previewImg, price, rating, stringCount, type, vendorCode, description} = guitar;

  const roundedRating = Math.round(rating);

  return (
    <>
      <VisuallyHiddenComponent/>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link to={AppRoute.Catalog} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={AppRoute.Catalog} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={AppRoute.Guitar} className="link">{name}</Link>
            </li>
          </ul>
          <div className="product-container"><img className="product-container__img" src={`/${previewImg.replace('guitar', 'content/guitar')}`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref={setRatingStars(roundedRating, 1)}></use> :
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref={setRatingStars(roundedRating, 2)}></use> :
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref={setRatingStars(roundedRating, 3)}></use> :
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref={setRatingStars(roundedRating, 4)}></use> :
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref={setRatingStars(roundedRating, 5)}></use> :
                </svg>
                <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
              </div>
              <div className="tabs">
                <button className={isFirstTabChosen ? 'button button--medium tabs__button' : 'button button--black-border button--medium tabs__button'} onClick={handleCharacteristicsTabClick}>Характеристики</button>
                <button className={isFirstTabChosen ? 'button button--black-border button--medium tabs__button' : 'button button--medium tabs__button'} onClick={handleDescriptionTabClick}>Описание</button>
                <div className="tabs__content" id="characteristics">
                  <table className={isFirstTabChosen ? 'tabs__table' : 'tabs__table hidden'}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{changeGuitarTypeToReadable(type)}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={isFirstTabChosen ? 'tabs__product-description hidden' : 'tabs__product-description'}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
              <button className="button button--red button--big product-container__button" onClick={handleModalAddToCardOpen}>Добавить в корзину</button>
            </div>
          </div>
          <ProductCardComments name={name} guitarId={id}/>
        </div>
      </main>
      {isModalAddToCardOpen && <ModalAddToCart guitar={guitar} onAddToCardModalClose={onAddToCardModalClose} onSuccessModalOpen={onSuccessModalOpen} />}
      {isModalSuccessOpen && <ModalSuccessAddToCart onSuccessModalClose={onSuccessModalClose} />}
      <Footer />
    </>
  );
}

export default ProductDetailedCard;
