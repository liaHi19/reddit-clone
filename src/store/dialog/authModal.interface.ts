export type IView = "login" | "signup" | "resetPassword";

export interface IAuthModal {
  open: boolean;
  view: IView;
}

export interface IDialog {
  modalOpen: boolean;
  deleteConfirm: boolean;
  edit: boolean;
  item: any;
}
