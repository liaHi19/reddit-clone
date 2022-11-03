import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostsState } from "./posts.interface";
import { deletePost, getPosts } from "./postsActions";

const initialState: IPostsState = {
  loading: false,
  posts: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { reducer } = postsSlice;
