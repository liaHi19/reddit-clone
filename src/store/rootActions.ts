import {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
} from "./authDialog/authModalSlice";
import { resetMySnippets } from "./community/communitySlice";
import { resetPostVotes } from "./posts/postsSlice";
import * as communityActions from "./community/communityActions";
import * as postsActions from "./posts/postsActions";

export const allActions = {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
  resetMySnippets,
  resetPostVotes,
  ...communityActions,
  ...postsActions,
};
