import {
  handleAuthView,
  showAuthModal,
  hideAuthModal,
} from "./dialog/authModalSlice";
import {
  showModal,
  hideModal,
  showDeleteConfirm,
  hideDeleteConfirm,
  startEdit,
  hideEdit,
  getItem,
  resetItem,
} from "./dialog/dialogSlice";
import { toggleMenuItem, setMenuItem } from "./dialog/directorySlice";
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
  showModal,
  hideModal,
  startEdit,
  hideEdit,
  getItem,
  resetItem,
  showDeleteConfirm,
  hideDeleteConfirm,
  resetMySnippets,
  resetPostVotes,
  resetComments,
  toggleMenuItem,
  setMenuItem,
  ...communityActions,
  ...postsActions,
  ...commentsActions,
};
