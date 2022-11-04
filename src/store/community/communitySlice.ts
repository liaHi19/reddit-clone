import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICommunityState } from "./community.interface";
import { ICommunity } from "../../shared/types/community.interface";
import {
  getCurrentCommunity,
  getMySnippets,
  joinCommunity,
  leaveCommunity,
  updateImageOfCommunity,
} from "./communityActions";

const initialState: ICommunityState = {
  loading: false,
  uploadingImage: false,
  mySnippets: [],
  currentCommunity: {} as ICommunity,
  error: null,
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resetCommunity: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMySnippets.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getMySnippets.fulfilled, (state, { payload }) => {
        (state.loading = false), (state.mySnippets = payload);
      })
      .addCase(joinCommunity.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(joinCommunity.fulfilled, (state, { payload }) => {
        (state.loading = false), state.mySnippets.push(payload);
      })
      .addCase(leaveCommunity.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(leaveCommunity.fulfilled, (state, { payload }) => {
        (state.loading = false),
          (state.mySnippets = state.mySnippets.filter(
            (snippet) => snippet.id !== payload
          ));
      })
      .addCase(getCurrentCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentCommunity.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentCommunity = payload;
      })
      .addCase(updateImageOfCommunity.pending, (state) => {
        state.uploadingImage = true;
        state.error = null;
      })
      .addCase(updateImageOfCommunity.fulfilled, (state, { payload }) => {
        state.uploadingImage = false;
        state.currentCommunity = {
          ...state.currentCommunity,
          imageURL: payload,
        } as ICommunity;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { resetCommunity } = communitySlice.actions;

export const { reducer } = communitySlice;
