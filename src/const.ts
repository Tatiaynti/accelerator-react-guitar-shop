const PRODUCTS_PER_PAGE = 9;
const FIRST_PAGE = 1;
const MIN_COMMENT_LENGTH = 3;
const MIN_COUNT_GUITAR_IN_CART = 1;
const MAX_COUNT_GUITAR_IN_CART = 99;
const LIGHT_DISCOUNT = 3000;
const MEDIUM_DISCOUNT = 4000;
const HEIGHT_DISCOUNT = 5000;
const NO_DISCOUNT = 0;

enum AppRoute {
  Catalog = '/',
  Guitar = '/guitars/:id',
  Cart = '/cart',
  PageNotFound = '*',
  Query = '/?',
  Pagination = '/catalog/page_:pageNumber',
}

const APIRoute  = {
  Catalog: '/guitars',
  Comments: '/comments',
  FilterQuery: ((filterParams: string, sort: string, order: string, page: number): string => `/guitars${filterParams ? `${filterParams}` : '?'}${sort}${order}&_start=${(page - 1) * PRODUCTS_PER_PAGE}&_limit=${PRODUCTS_PER_PAGE}`),
  GuitarsCount:  ((filterParams: string): string => `/guitars${filterParams ? `${filterParams}` : '?'}`),
  CurrentGuitarComments: ((guitarId: number): string => `/guitars/${guitarId}/comments`),
  Coupons: '/coupons',
};

enum SortType {
  Price = 'price',
  Rating = 'rating',
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

const stringValues = [4, 6, 7, 12];

enum FilterByType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

enum GuitarTypeToReadable {
  Electric = 'Электрогитара',
  Acoustic = 'Акустическая гитара',
  Ukulele = 'Укулеле',
}

const filtersByStringAndType = [
  {
    elementId: '4-strings',
    value: 4,
    guitarTypes: [FilterByType.Electric.toString(), FilterByType.Ukulele.toString()],
  },
  {
    elementId: '6-strings',
    value: 6,
    guitarTypes: [FilterByType.Acoustic.toString(), FilterByType.Electric.toString()],
  },
  {
    elementId: '7-strings',
    value: 7,
    guitarTypes: [FilterByType.Acoustic.toString(), FilterByType.Electric.toString()],
  },
  {
    elementId: '12-strings',
    value: 12,
    guitarTypes: [FilterByType.Acoustic.toString()],
  },
];

enum stringLabels {
  fourStrings = 4,
  sixStrings = 6,
  sevenStrings = 7,
  twelveStrings = 12,
}

enum StringCount {
  FourStrings = '4-strings',
  SixStrings = '6-strings',
  SevenStrings = '7-strings',
  TwelveStrings = '12-strings',
}

enum FilterPath {
  Sort = '&_sort=',
  Order = '&_order=',
  PriceGte = '&price_gte=',
  PriceLte = '&price_lte=',
  Type = '&type_like=',
  String = '&stringCount_like=',
  PaginationStart = '&_start=',
  PaginationEnd = '&_end=',
}

type FetchGuitarProperty = {
  sortType: SortType | string,
  orderType: SortOrder | string,
  userPriceMin: string,
  userPriceMax: string,
  isAcousticCheck: boolean,
  isElectricCheck: boolean,
  isUkuleleCheck: boolean,
  isFourStringsCheck: boolean,
  isSixStringsCheck: boolean,
  isSevenStringsCheck: boolean,
  isTwelveStringsCheck: boolean,
  currentPageNumber: number,
};

enum QueryParams {
  Sort = '_sort',
  Order = '_order',
  PriceGte = 'price_gte',
  PriceLte = 'price_lte',
  AcousticType = 'acousticType',
  ElectricType = 'electricType',
  UkuleleType = 'ukuleleType',
  FourString = '4stringCount',
  SixString = '6stringCount',
  SevenString = '7stringCount',
  TwelveString = '12stringCount',
  CurrentPageNumber = 'page',
}

enum DefaultPriceRange {
  Min = 1000,
  Max = 30000,
}

enum PromoCode {
  Unvalid = '',
  Light = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555'
}

enum PromoCodeValidate {
  Unknown = 'unknown',
  True = 'true',
  False = 'false'
}

export {NO_DISCOUNT, LIGHT_DISCOUNT, MEDIUM_DISCOUNT, HEIGHT_DISCOUNT, PromoCode, PromoCodeValidate, MIN_COUNT_GUITAR_IN_CART, MAX_COUNT_GUITAR_IN_CART, MIN_COMMENT_LENGTH, GuitarTypeToReadable, QueryParams, FilterPath, StringCount, AppRoute, APIRoute, SortType, SortOrder, stringValues, filtersByStringAndType, PRODUCTS_PER_PAGE, FIRST_PAGE, stringLabels, FilterByType, DefaultPriceRange};
export type {FetchGuitarProperty};
