import { toast } from 'react-toastify';
import { APIRoute, FetchGuitarProperty, FilterByType, FilterPath, PRODUCTS_PER_PAGE, stringLabels } from '../const';
import { ThunkActionResult } from '../types/action';
import { CommentType, NewCommentType } from '../types/comment';
import { PostCoupon } from '../types/coupon';
import { GuitarType } from '../types/guitar';
import { loadComments, loadCommentsByGuitarId, loadGuitarById, loadGuitars, setGuitarsCount, setAreCommentsLoaded, setIsProductCardLoaded, setPriceRangeMax, setPriceRangeMin, setDiscount } from './action';

const fetchGuitarsAction = (fetchProperty: FetchGuitarProperty): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {
      sortType,
      orderType,
      userPriceMin,
      userPriceMax,
      isAcousticCheck,
      isElectricCheck,
      isUkuleleCheck,
      isFourStringsCheck,
      isSixStringsCheck,
      isSevenStringsCheck,
      isTwelveStringsCheck,
    } = fetchProperty;

    let path = `${APIRoute.Catalog}?`;

    if (sortType) {
      path += `${FilterPath.Sort}${sortType}`;
    }
    if (orderType) {
      path += `${FilterPath.Order}${orderType}`;
    }
    if (userPriceMin) {
      path += `${FilterPath.PriceGte}${userPriceMin}`;
    }
    if (userPriceMax) {
      path += `${FilterPath.PriceLte}${userPriceMax}`;
    }
    if (isAcousticCheck) {
      path += `${FilterPath.Type}${FilterByType.Acoustic}`;
    }
    if (isElectricCheck) {
      path += `${FilterPath.Type}${FilterByType.Electric}`;
    }
    if (isUkuleleCheck) {
      path += `${FilterPath.Type}${FilterByType.Ukulele}`;
    }
    if (isFourStringsCheck) {
      path += `${FilterPath.String}${stringLabels.fourStrings}`;
    }
    if (isSixStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sixStrings}`;
    }
    if (isSevenStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sevenStrings}`;
    }
    if (isTwelveStringsCheck) {
      path += `${FilterPath.String}${stringLabels.twelveStrings}`;
    }
    const { data } = await api.get<GuitarType[]>(path);
    dispatch(loadGuitars(data));
    if (
      isAcousticCheck ||
      isElectricCheck ||
      isUkuleleCheck ||
      isFourStringsCheck ||
      isSixStringsCheck ||
      isSevenStringsCheck ||
      isTwelveStringsCheck) {
      dispatch(setPriceRangeMin(data.slice().sort((a, b) => a.price - b.price)[0].price));
      dispatch(setPriceRangeMax(data.slice().sort((a, b) => b.price - a.price)[0].price));
    }
  };

const fetchCommentsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<CommentType[]>(APIRoute.Comments);
    dispatch(loadComments(data));
  };

const fetchGuitarsOnPageAction = (fetchProperty: FetchGuitarProperty): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {
      sortType,
      orderType,
      userPriceMin,
      userPriceMax,
      isAcousticCheck,
      isElectricCheck,
      isUkuleleCheck,
      isFourStringsCheck,
      isSixStringsCheck,
      isSevenStringsCheck,
      isTwelveStringsCheck,
      currentPageNumber,
    } = fetchProperty;

    let path = `${APIRoute.Catalog}?${FilterPath.PaginationStart}${currentPageNumber * PRODUCTS_PER_PAGE}${FilterPath.PaginationEnd}${(currentPageNumber + 1) * PRODUCTS_PER_PAGE}`;

    if (sortType) {
      path += `${FilterPath.Sort}${sortType}`;
    }
    if (orderType) {
      path += `${FilterPath.Order}${orderType}`;
    }
    if (userPriceMin) {
      path += `${FilterPath.PriceGte}${userPriceMin}`;
    }
    if (userPriceMax) {
      path += `${FilterPath.PriceLte}${userPriceMax}`;
    }
    if (isAcousticCheck) {
      path += `${FilterPath.Type}${FilterByType.Acoustic}`;
    }
    if (isElectricCheck) {
      path += `${FilterPath.Type}${FilterByType.Electric}`;
    }
    if (isUkuleleCheck) {
      path += `${FilterPath.Type}${FilterByType.Ukulele}`;
    }
    if (isFourStringsCheck) {
      path += `${FilterPath.String}${stringLabels.fourStrings}`;
    }
    if (isSixStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sixStrings}`;
    }
    if (isSevenStringsCheck) {
      path += `${FilterPath.String}${stringLabels.sevenStrings}`;
    }
    if (isTwelveStringsCheck) {
      path += `${FilterPath.String}${stringLabels.twelveStrings}`;
    }
    try {
      const { data, headers } = await api.get<GuitarType[]>(path);
      await
      dispatch(fetchCommentsAction());
      dispatch(loadGuitars(data));
      dispatch(setGuitarsCount(+headers['x-total-count']));
    } catch (error) {
      toast.error('Сервер недоступен');
    }
  };

const fetchGuitarByIdAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsProductCardLoaded(false));
    try {
      const { data } = await api.get<GuitarType>(`${APIRoute.Catalog}/${id}`);
      dispatch(loadGuitarById(data));
      dispatch(setIsProductCardLoaded(true));
    } catch (error) {
      dispatch(setIsProductCardLoaded(true));
    }
  };

const fetchCommentsByGuitarIdAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setAreCommentsLoaded(false));
    try {
      const { data } = await api.get<CommentType[]>(`${APIRoute.Catalog}/${id}/comments`);
      dispatch(loadCommentsByGuitarId(data
        .sort((prev, next) => new Date(next.createAt).getTime() - new Date(prev.createAt).getTime())));
      dispatch(setAreCommentsLoaded(true));
    } catch (error) {
      dispatch(setAreCommentsLoaded(true));
    }
  };

const postComments = (id: string, postComment: NewCommentType, onSuccessPost: () => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post(APIRoute.Comments, postComment);
    onSuccessPost();
    dispatch(setAreCommentsLoaded(false));
    try {
      const { data } = await api.get<CommentType[]>(`${APIRoute.Catalog}/${id}/comments`);
      dispatch(loadCommentsByGuitarId(data
        .sort((prev, next) => new Date(next.createAt).getTime() - new Date(prev.createAt).getTime())));
      dispatch(setAreCommentsLoaded(true));
    } catch (error) {
      dispatch(setAreCommentsLoaded(true));
    }
  };

const postCoupons = (coupon: PostCoupon, onSuccessPost: () => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.post(APIRoute.Coupons, coupon);
    dispatch(setDiscount(data));
    onSuccessPost();
  };

export {postCoupons, postComments, fetchCommentsAction, fetchGuitarsAction, fetchGuitarsOnPageAction, fetchGuitarByIdAction, fetchCommentsByGuitarIdAction};
