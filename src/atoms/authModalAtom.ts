import { atom, selector } from "recoil";

export type IView = "login" | "signup" | "resetPassword";

export interface IAuthModalState {
  open: boolean;
  view: IView;
}

const defaultModalState: IAuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<IAuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
