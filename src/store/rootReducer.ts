import { reducer as authModalSlice } from "./authDialog/authModalSlice";
import { reducer as communitySlice } from "./community/communitySlice";
import { reducer as postsSlice } from "./posts/postsSlice";
import { reducer as commentsSlice } from "./comments/commentsSlice";

export const reducers = {
  authModal: authModalSlice,
  community: communitySlice,
  posts: postsSlice,
  comments: commentsSlice,
};
