import { createReducer } from '@reduxjs/toolkit';
import { CommentType } from '../../types/comment';
import { GuitarType } from '../../types/guitar';
import { deleteGuitarInCart, loadComments, loadCommentsByGuitarId, loadGuitarById, loadGuitars, loadGuitarsCount, setAreCommentsLoaded, setGuitarsInCart, setIsProductCardLoaded } from '../action';

type CatalogType = {
  catalog: GuitarType[],
  isDataLoaded: boolean,
  comments: CommentType[],
  guitarsOnPage: GuitarType[],
  guitar: GuitarType | null,
  commentsByGuitarId: CommentType[],
  isCardLoaded: boolean,
  areCommentsLoaded: boolean,
  guitarsInCart: GuitarType[],
}

const initialState: CatalogType = {
  catalog: [
    {
      id: 0,
      name: '',
      vendorCode: '',
      type: '',
      description: '',
      previewImg: '',
      stringCount: 0,
      rating: 0,
      price: 0,
    },
  ],
  isDataLoaded: false,
  comments: [],
  guitarsOnPage: [],
  guitar: null,
  commentsByGuitarId: [],
  isCardLoaded: false,
  areCommentsLoaded: false,
  guitarsInCart: [],
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.catalog = action.payload.guitars;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      const { guitars } = action.payload;
      state.guitarsOnPage = guitars;
    })
    .addCase(loadComments, (state, action) => {
      const {comments} = action.payload;
      state.comments = state.comments.concat(comments);
    })
    .addCase(loadGuitarById, (state, action) => {
      const { guitar } = action.payload;
      state.guitar = guitar;
    })
    .addCase(loadCommentsByGuitarId, (state, action) => {
      const { commentsByGuitarId } = action.payload;
      state.commentsByGuitarId = commentsByGuitarId;
    })
    .addCase(setIsProductCardLoaded, (state, action) => {
      const { isProductCardLoaded } = action.payload;
      state.isCardLoaded = isProductCardLoaded;
    })
    .addCase(setAreCommentsLoaded, (state, action) => {
      const { areCommentsLoaded } = action.payload;
      state.areCommentsLoaded = areCommentsLoaded;
    })
    .addCase(setGuitarsInCart, (state, action) => {
      const { guitarInCart } = action.payload;
      state.guitarsInCart.push(guitarInCart);
    })
    .addCase(deleteGuitarInCart, (state, action) => {
      const { deletedGuitarInCart } = action.payload;
      const index = state.guitarsInCart.findIndex((guitar) => guitar.id === deletedGuitarInCart.id);
      state.guitarsInCart.splice(index, 1);
    });
});

export {guitarData};
