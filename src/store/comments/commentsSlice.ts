import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICommentsState } from "./comments/comments.interface";
import { createComment, getPostComments } from "./commentsActions";

const initialState: ICommentsState = {
  loading: false,
  createLoading: false,
  deleteLoading: false,
  comments: [],
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        (state.createLoading = false), state.comments.push(payload);
      })
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostComments.fulfilled, (state, { payload }) => {
        (state.loading = false), (state.comments = payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { resetComments } = commentsSlice.actions;
export const { reducer } = commentsSlice;
