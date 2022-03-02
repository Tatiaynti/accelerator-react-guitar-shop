import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { ActionType } from '../types/action';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';
import { GuitarInCartCount } from '../types/guitar-in-cart-count';

const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

const loadGuitarsCount = createAction(
  ActionType.LoadGuitarsCount,
  (guitars: GuitarType[]) => ({
    payload: {guitars},
  }),
);

const loadComments = createAction(
  ActionType.LoadComments,
  (comments: CommentType[]) => ({
    payload: {comments},
  }),
);

const setPriceRangeMin = createAction(
  ActionType.SetPriceRangeMin,
  (priceRangeMin: number) => ({
    payload: {priceRangeMin},
  }),
);

const setPriceRangeMax = createAction(
  ActionType.SetPriceRangeMax,
  (priceRangeMax: number) => ({
    payload: {priceRangeMax},
  }),
);

const setUserPriceMin = createAction(
  ActionType.SetUserPriceMin,
  (userPriceMin: string) => ({
    payload: {userPriceMin},
  }),
);

const setUserPriceMax = createAction(
  ActionType.SetUserPriceMax,
  (userPriceMax: string) => ({
    payload: {userPriceMax},
  }),
);

const setGuitarsCount = createAction(
  ActionType.SetGuitarsCount,
  (guitarsCount: number) => ({
    payload: {guitarsCount},
  }),
);

const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

const loadGuitarById = createAction(
  ActionType.LoadGuitarById,
  (guitar: GuitarType) => ({
    payload: {guitar},
  }),
);

const loadCommentsByGuitarId = createAction(
  ActionType.LoadCommentsByGuitarId,
  (commentsByGuitarId: CommentType[]) => ({
    payload: {commentsByGuitarId},
  }),
);

const setIsProductCardLoaded = createAction(
  ActionType.SetIsCardLoaded,
  (isProductCardLoaded: boolean) => ({
    payload: {isProductCardLoaded},
  }),
);

const setAreCommentsLoaded = createAction(
  ActionType.SetAreCommentsLoaded,
  (areCommentsLoaded: boolean) => ({
    payload: {areCommentsLoaded},
  }),
);

const setGuitarsInCart = createAction(
  ActionType.SetGuitarsInCart,
  (guitarInCart: GuitarType) => ({
    payload: {guitarInCart},
  }),
);

const deleteGuitarInCart = createAction(
  ActionType.DeleteGuitarInCart,
  (deletedGuitarInCart: GuitarType) => ({
    payload: {deletedGuitarInCart},
  }),
);

const setTotalPrice = createAction(
  ActionType.SetTotalPrice,
  (totalPrice: number) => ({
    payload: {totalPrice},
  }),
);

const setGuitarsInCartCount = createAction(
  ActionType.SetGuitarsInCartCount,
  (guitarInCartCount: GuitarInCartCount) => ({
    payload: {guitarInCartCount},
  }),
);

const setDiscount = createAction(
  ActionType.SetDiscount,
  (discount: number) => ({
    payload: {
      discount,
    },
  }),
);

export {setDiscount, setGuitarsInCartCount, setTotalPrice, deleteGuitarInCart, setGuitarsInCart, setAreCommentsLoaded, setIsProductCardLoaded, loadCommentsByGuitarId, loadGuitarById, setPriceRangeMin, setPriceRangeMax, setGuitarsCount, loadGuitarsCount, setUserPriceMin, setUserPriceMax, loadGuitars, redirectToRoute, loadComments};
