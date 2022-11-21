import { useEffect } from "react";

import { useAuth } from "../firebase/useAuth";
import { ICommunity } from "../shared/types/community.interface";

import { useAppSelector } from "../store/hooks";
import { useActions } from "./useActions";

const useCommunityData = () => {
  const {
    getMySnippets,
    joinCommunity,
    leaveCommunity,
    handleAuthView,
    resetMySnippets,
  } = useActions();
  const { user } = useAuth();
  const { mySnippets, loading } = useAppSelector((state) => state.community);

  useEffect(() => {
    if (!user) {
      resetMySnippets();
      return;
    }
    getMySnippets(user?.uid!);
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
      leaveCommunity({ id: communityData.id, uid: user.uid });
      return;
    }
    joinCommunity({ communityData, uid: user.uid });
  };

  return { mySnippets, loading, joinOrLeaveCommunity };
};

export default useCommunityData;
