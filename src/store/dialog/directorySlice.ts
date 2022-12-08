import { createSlice } from "@reduxjs/toolkit";

import { defaultMenuItem } from "../../hooks/useDirectory";
import { IDirectoryMenuItem } from "../../shared/types/directory.interface";

export interface IDirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: IDirectoryMenuItem;
}

const initialState: IDirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuSlice = createSlice({
  name: "directoryMenu",
  initialState,
  reducers: {
    toggleMenuItem: (state) => {
      state.isOpen = !state.isOpen;
    },
    setMenuItem: (state, { payload }) => {
      state.selectedMenuItem = payload;
    },
  },
});

export const { toggleMenuItem, setMenuItem } = directoryMenuSlice.actions;

export const { reducer } = directoryMenuSlice;
