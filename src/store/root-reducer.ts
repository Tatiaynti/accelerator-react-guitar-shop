import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { filtersData } from './filters-data/filters-data';
import { paginationData } from './pagination-data/pagination-data';
import { cartData } from './cart-data/cart-data';

enum NameSpace {
  Data = 'DATA',
  SearchParameters = 'SEARCH',
  Pagination = 'PAGINATION',
  Cart = 'CART',
}

const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.SearchParameters]: filtersData,
  [NameSpace.Pagination]: paginationData,
  [NameSpace.Cart]: cartData,
});

export {NameSpace, rootReducer};
export type RootState = ReturnType<typeof rootReducer>;
