import { createReducer } from '@reduxjs/toolkit';
import { CommentType } from '../../types/comment';
import { GuitarType } from '../../types/guitar';
import { loadComments, loadCommentsByGuitarId, loadGuitarById, loadGuitars, loadGuitarsCount, setAreCommentsLoaded, setIsProductCardLoaded } from '../action';

type CatalogType = {
  catalog: GuitarType[],
  isDataLoaded: boolean,
  comments: CommentType[],
  guitarsOnPage: GuitarType[],
  guitar: GuitarType | null,
  commentsByGuitarId: CommentType[],
  isCardLoaded: boolean,
  areCommentsLoaded: boolean,
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
    });
});

export {guitarData};
