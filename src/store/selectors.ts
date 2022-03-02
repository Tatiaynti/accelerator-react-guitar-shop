import { createSelector } from 'reselect';
import { CommentType } from '../types/comment';
import { GuitarType } from '../types/guitar';
import { GuitarInCartCount } from '../types/guitar-in-cart-count';
import { NameSpace, RootState } from './root-reducer';

const getGuitars = (state: RootState) => state[NameSpace.Data].catalog;
const getDataLoadingStatus = (state: RootState): boolean => state[NameSpace.Data].isDataLoaded;
const getGuitarsCount = (state: RootState): number => state[NameSpace.Pagination].guitarsCount;

const getCommentsCount = createSelector(
  [
    (state: RootState) => state[NameSpace.Data].comments,
    (_state: RootState, currentGuitarId: number) => currentGuitarId,
  ],
  (comments, currentGuitarId) => {
    const guitarComments = comments.filter((comment) => comment.guitarId === currentGuitarId);
    return guitarComments.length;
  });

const getGuitarById = (state: RootState): GuitarType | null => state[NameSpace.Data].guitar;
const getCommentsByGuitarId = (state: RootState): CommentType[] => state[NameSpace.Data].commentsByGuitarId;
const getIsCardLoaded = (state: RootState): boolean => state[NameSpace.Data].isCardLoaded;
const getAreCommentsLoaded = (state: RootState): boolean => state[NameSpace.Data].areCommentsLoaded;
const getGuitarsInCart = (state: RootState): GuitarType[] => state[NameSpace.Cart].guitarsInCart;
const getTotalPrice = (state: RootState): number => state[NameSpace.Cart].totalPrice;
const getGuitarsInCartCount = (state: RootState): GuitarInCartCount[] => state[NameSpace.Cart].guitarsInCartCount;
const getDiscount = (state: RootState): number => state[NameSpace.Cart].discount;

export {getDiscount, getGuitarsInCartCount, getTotalPrice, getGuitarsInCart, getAreCommentsLoaded, getIsCardLoaded, getCommentsByGuitarId, getGuitars, getDataLoadingStatus, getGuitarsCount, getCommentsCount, getGuitarById};
