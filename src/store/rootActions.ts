import {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
} from "./authDialog/authModalSlice";
import { resetCommunity } from "./community/communitySlice";
import * as communityActions from "./community/communityActions";

export const allActions = {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
  resetCommunity,
  ...communityActions,
};
