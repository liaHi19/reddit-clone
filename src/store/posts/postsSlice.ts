import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findById } from "../../helpers/functions";
import { IPostsState } from "./posts.interface";
import {
  createNewVote,
  deletePost,
  getPosts,
  getPostVotes,
  updatePostVoteOnTwo,
  updateVoteOnOne,
} from "./postsActions";

const initialState: IPostsState = {
  loading: false,
  posts: [],
  postVotes: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostVotes: (state) => {
      state.postVotes = initialState.postVotes;
    },
  },
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
        state.postVotes = state.postVotes.filter(
          (vote) => vote.postId !== payload
        );
      })
      .addCase(getPostVotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostVotes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.postVotes = payload;
      })
      .addCase(createNewVote.pending, (state, { meta }) => {
        const postId = meta.arg.postVote.postId;
        const currentPost = findById(state.posts, postId);
        if (currentPost) {
          currentPost.loading = true;
        }
        state.error = null;
      })
      .addCase(createNewVote.fulfilled, (state, { payload }) => {
        const currentPost = findById(state.posts, payload.postId);
        if (currentPost) {
          currentPost.loading = false;
          currentPost.voteStatus = currentPost?.voteStatus + payload.voteValue;
        }
        state.postVotes.push(payload);
      })
      .addCase(updateVoteOnOne.pending, (state, { meta }) => {
        const postId = meta.arg.updatedPostVote.postId;
        const currentPost = findById(state.posts, postId);
        if (currentPost) {
          currentPost.loading = true;
        }
        state.error = null;
      })
      .addCase(updateVoteOnOne.fulfilled, (state, { payload }) => {
        const currentPost = findById(state.posts, payload.postId);
        if (currentPost) {
          currentPost.voteStatus = currentPost.voteStatus - payload.voteValue;
          currentPost.loading = false;
        }
        state.postVotes = state.postVotes.filter(
          (postVote) => postVote.id !== payload.id
        );
      })
      .addCase(updatePostVoteOnTwo.pending, (state, { meta }) => {
        const postId = meta.arg.updatedPostVote.postId;
        const currentPost = findById(state.posts, postId);
        if (currentPost) {
          currentPost.loading = true;
        }
        state.error = null;
      })
      .addCase(updatePostVoteOnTwo.fulfilled, (state, { payload }) => {
        const currentPost = findById(state.posts, payload.postId);

        if (currentPost) {
          currentPost.voteStatus =
            currentPost.voteStatus + 2 * payload.voteValue;
          currentPost.loading = false;
        }
        state.postVotes = state.postVotes.map((postVote) =>
          postVote.id === payload.id
            ? { ...postVote, voteValue: payload.voteValue }
            : postVote
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { resetPostVotes } = postsSlice.actions;

export const { reducer } = postsSlice;
