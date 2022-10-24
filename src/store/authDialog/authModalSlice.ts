import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthModal, IView } from "./authModal.interface";

const initialState: IAuthModal = {
  open: false,
  view: "login",
};

export const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    handleAuthView(state, action: PayloadAction<IView>) {
      state.open = true;
      state.view = action.payload;
    },
    showAuthModal(state) {
      state.open = true;
    },
    hideAuthModal(state) {
      state.open = false;
    },
  },
});

export const { handleAuthView, showAuthModal, hideAuthModal } =
  authModalSlice.actions;

export const { reducer } = authModalSlice;
