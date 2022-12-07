import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "./authModal.interface";

const initialState: IDialog = {
  modalOpen: false,
  deleteConfirm: false,
  edit: false,
  item: null,
};

const dialogSlice = createSlice({
  name: "dialogModal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalOpen = true;
    },
    hideModal: (state) => {
      state.modalOpen = false;
    },
    showDeleteConfirm: (state) => {
      state.deleteConfirm = true;
    },
    hideDeleteConfirm: (state) => {
      state.deleteConfirm = false;
    },
    startEdit: (state, { payload }) => {
      state.edit = true;
      state.item = payload;
    },
    hideEdit: (state) => {
      if (state.edit) {
        state.item = null;
        state.edit = false;
      }
    },
  },
});

export const {
  showModal,
  hideModal,
  showDeleteConfirm,
  hideDeleteConfirm,
  startEdit,
  hideEdit,
} = dialogSlice.actions;
export const { reducer } = dialogSlice;
