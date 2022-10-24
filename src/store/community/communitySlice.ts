import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICommunityState } from "./community.interface";
import {
  getMySnippets,
  joinCommunity,
  leaveCommunity,
} from "./communityActions";

const initialState: ICommunityState = {
  loading: false,
  mySnippets: [],
  error: null,
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
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
            (snippet) => snippet.communityId !== payload
          ));
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { reducer } = communitySlice;
