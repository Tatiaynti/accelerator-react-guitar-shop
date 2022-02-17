import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';

enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadComments = 'data/loadComments',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  LoadGuitarsOnPage = 'data/loadGuitarsOnPage',
  RedirectToRoute = 'redirectToRoute',
  SetPriceRangeMin = 'filter/setPriceRangeMin',
  SetPriceRangeMax = 'filter/setPriceRangeMax',
  SetUserPriceMin = 'filter/setUserPriceMin',
  SetUserPriceMax = 'filter/setUserPriceMax',
  SetGuitarsCount = 'pagination/setGuitarsCount',
  LoadGuitarById = 'data/loadGuitarById',
  LoadCommentsByGuitarId = 'data/loadCommentsByGuitarId',
  SetIsCardLoaded = 'data/setIsProductCardLoaded',
  SetAreCommentsLoaded = 'data/setIsCommentsLoaded',
  SetGuitarsInCart = 'data/setGuitarsInCart',
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>;

export {ActionType};
export type {ThunkActionResult};
