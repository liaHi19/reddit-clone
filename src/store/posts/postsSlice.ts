import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { findById } from "../../helpers/functions";
import { IPostsState } from "./posts.interface";

import {
  createNewVote,
  deletePost,
  getPosts,
  getPostVote,
  getPostVotes,
  getSelectedPost,
  updatePostVoteOnTwo,
  updateVoteOnOne,
} from "./postsActions";

import { createComment } from "../comments/commentsActions";

const initialState: IPostsState = {
  loading: false,
  posts: [],
  selectedPost: null,
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
        console.log();

        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== payload);
        state.postVotes = state.postVotes.filter(
          (vote) => vote.postId !== payload
        );
        if (state.selectedPost) {
          state.selectedPost = null;
        }
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
        if (state.selectedPost) {
          state.selectedPost.loading = true;
        }
        state.error = null;
      })
      .addCase(createNewVote.fulfilled, (state, { payload }) => {
        const currentPost = findById(state.posts, payload.postId);
        if (currentPost) {
          currentPost.loading = false;
          currentPost.voteStatus = currentPost?.voteStatus + payload.voteValue;
        }
        if (state.selectedPost) {
          state.selectedPost.loading = false;
          state.selectedPost.voteStatus =
            state.selectedPost.voteStatus + payload.voteValue;
        }
        state.postVotes.push(payload);
      })
      .addCase(updateVoteOnOne.pending, (state, { meta }) => {
        const postId = meta.arg.updatedPostVote.postId;
        const currentPost = findById(state.posts, postId);
        if (currentPost) {
          currentPost.loading = true;
        }
        if (state.selectedPost) {
          state.selectedPost.loading = true;
        }
        state.error = null;
      })
      .addCase(updateVoteOnOne.fulfilled, (state, { payload }) => {
        const currentPost = findById(state.posts, payload.postId);
        if (currentPost) {
          currentPost.loading = false;
          currentPost.voteStatus = currentPost.voteStatus - payload.voteValue;
        }
        if (state.selectedPost) {
          state.selectedPost.loading = false;
          state.selectedPost.voteStatus =
            state.selectedPost.voteStatus - payload.voteValue;
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
        if (state.selectedPost) {
          state.selectedPost.loading = true;
        }
        state.error = null;
      })
      .addCase(updatePostVoteOnTwo.fulfilled, (state, { payload }) => {
        const currentPost = findById(state.posts, payload.postId);

        if (currentPost) {
          currentPost.loading = false;
          currentPost.voteStatus =
            currentPost.voteStatus + 2 * payload.voteValue;
        }
        if (state.selectedPost) {
          state.selectedPost.loading = false;
          state.selectedPost.voteStatus =
            state.selectedPost.voteStatus + 2 * payload.voteValue;
        }
        state.postVotes = state.postVotes.map((postVote) =>
          postVote.id === payload.id
            ? { ...postVote, voteValue: payload.voteValue }
            : postVote
        );
      })
      .addCase(getSelectedPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelectedPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedPost = payload;
      })
      .addCase(getPostVote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostVote.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.postVotes = payload;
      })
      .addCase(createComment.fulfilled, (state) => {
        if (state.selectedPost) {
          state.selectedPost.numberOfComments =
            state.selectedPost.numberOfComments + 1;
        }
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
