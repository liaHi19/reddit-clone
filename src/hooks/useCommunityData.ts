import { useEffect } from "react";

import { useAuth } from "../firebase/useAuth";
import { ICommunity } from "../shared/types/community.interface";
import { useActions } from "./useActions";

const useCommunityData = () => {
  const { getMySnippets, joinCommunity, leaveCommunity, handleAuthView } =
    useActions();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    getMySnippets(user.uid);
  }, [user]);

  const joinOrLeaveCommunity = (
    communityData: ICommunity,
    isJoined: boolean
  ) => {
    // unauthenticated users
    if (!user) {
      handleAuthView("login");
      return;
    }
    // authenticated users
    if (isJoined) {
      leaveCommunity({ communityId: communityData.id, uid: user?.uid });
      return;
    }
    joinCommunity({ communityData, uid: user?.uid });
  };

  return { joinOrLeaveCommunity };
};

export default useCommunityData;
