import {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
} from "./authDialog/authModalSlice";
import { resetMySnippets } from "./community/communitySlice";
import { resetPostVotes } from "./posts/postsSlice";
import { resetComments } from "./comments/commentsSlice";
import * as communityActions from "./community/communityActions";
import * as postsActions from "./posts/postsActions";
import * as commentsActions from "./comments/commentsActions";

export const allActions = {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
  resetMySnippets,
  resetPostVotes,
  resetComments,
  ...communityActions,
  ...postsActions,
  ...commentsActions,
};
