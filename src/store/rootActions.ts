import {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
} from "./authDialog/authModalSlice";
import { resetCommunity } from "./community/communitySlice";
import * as communityActions from "./community/communityActions";
import * as postsActions from "./posts/postsActions";

export const allActions = {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
  resetCommunity,
  ...communityActions,
  ...postsActions,
};
