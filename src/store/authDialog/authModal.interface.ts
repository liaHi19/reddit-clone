export type IView = "login" | "signup" | "resetPassword";

export interface IAuthModal {
  open: boolean;
  view: IView;
}
