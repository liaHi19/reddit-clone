import { reducer as authModalSlice } from "./authDialog/authModalSlice";
import { reducer as communitySlice } from "./community/communitySlice";

export const reducers = {
  authModal: authModalSlice,
  community: communitySlice,
};
