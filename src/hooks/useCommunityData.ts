import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { communityState, ICommunity } from "../atoms/communitiesAtom";
import {
  createSubDocAndUpdateDoc,
  deleteSubDocAndUpdateDoc,
  receiveSubCollection,
} from "../firebase/firestore-helpers";
import { useAuth } from "../firebase/useAuth";
import { ICommunitySnippet } from "../atoms/communitiesAtom";
import { increment } from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const { user } = useAuth();
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // get communitySnippets and set to Recoil;
  const getMySnippets = async () => {
    try {
      setLoading(true);
      const snippets = await receiveSubCollection({
        mainCollectionName: "users",
        mainDocId: user?.uid,
        subCollectionName: "communitySnippets",
      });
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as ICommunitySnippet[],
      }));
      setLoading(false);
    } catch (error: any) {
      setError(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !!communityStateValue.mySnippets.length)
    getMySnippets();
  }, [user]);

  //unauthenticated users
  if (!user) {
    setAuthModalState({ open: true, view: "login" });
    return;
  }

  //main function
  // authenticated users
  const joinOrLeaveCommunity = (
    communityData: ICommunity,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  //helper functions
  const joinCommunity = async (communityData: ICommunity) => {
    const newSnippet = {
      communityId: communityData.id,
      imageURL: communityData.imageURL || "",
    };

    try {
      setLoading(true);
      //firebase
      await createSubDocAndUpdateDoc(
        {
          collectionName: "communities",
          docId: communityData.id,
          data: { numberOfMembers: increment(1) },
        },
        {
          mainCollectionName: "users",
          mainDocId: user?.uid,
          subCollectionName: "communitySnippets",
          subId: communityData.id,
          subdata: newSnippet,
        }
      );

      //recoil
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
      setLoading(false);
    } catch (error: any) {
      setError(error?.message);
      setLoading(false);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      setLoading(true);
      // firebase
      await deleteSubDocAndUpdateDoc(
        {
          collectionName: "communities",
          docId: communityId,
          data: { numberOfMembers: increment(-1) },
        },
        {
          mainCollectionName: "users",
          mainDocId: user?.uid,
          subCollectionName: "communitySnippets",
          subId: communityId,
        }
      );

      //recoil
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
      setLoading(false);
    } catch (error: any) {
      setError(error?.message);
      setLoading(false);
    }
  };

  return { communityStateValue, joinOrLeaveCommunity, loading };
};

export default useCommunityData;
