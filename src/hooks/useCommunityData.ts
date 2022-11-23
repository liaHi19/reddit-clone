import { useRouter } from "next/router";
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
    getCurrentCommunity,
  } = useActions();
  const { user } = useAuth();
  const { mySnippets, loading, currentCommunity } = useAppSelector(
    (state) => state.community
  );

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      resetMySnippets();
      return;
    }
    getMySnippets(user?.uid!);
  }, [user]);

  useEffect(() => {
    const { id } = router.query;
    if (id && !currentCommunity) {
      getCurrentCommunity(id as string);
    }
  }, [router.query, currentCommunity]);

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
