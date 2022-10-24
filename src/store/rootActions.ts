import {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
} from "./authDialog/authModalSlice";
import * as communityActions from "./community/communityActions";

export const allActions = {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
  ...communityActions,
};
