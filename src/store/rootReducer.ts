import { reducer as authModalSlice } from "./dialog/authModalSlice";
import { reducer as communitySlice } from "./community/communitySlice";
import { reducer as postsSlice } from "./posts/postsSlice";
import { reducer as commentsSlice } from "./comments/commentsSlice";
import { reducer as dialogSlice } from "./dialog/dialogSlice";

export const reducers = {
  authModal: authModalSlice,
  community: communitySlice,
  posts: postsSlice,
  comments: commentsSlice,
  dialog: dialogSlice,
};
