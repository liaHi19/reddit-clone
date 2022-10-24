import { createAsyncThunk } from "@reduxjs/toolkit";
import { increment } from "firebase/firestore";

import {
  createSubDocAndUpdateDoc,
  deleteSubDocAndUpdateDoc,
  receiveSubCollection,
} from "../../firebase/firestore-helpers";

import {
  ICommunity,
  ICommunitySnippet,
} from "../../shared/types/community.interface";

export const getMySnippets = createAsyncThunk<ICommunitySnippet[], string>(
  "community/getMySnippets",
  async (uid, thunkApi) => {
    try {
      const snippets = await receiveSubCollection({
        mainCollectionName: "users",
        mainDocId: uid,
        subCollectionName: "communitySnippets",
      });

      return snippets as ICommunitySnippet[];
    } catch (error: any) {
      console.log(error);

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const joinCommunity = createAsyncThunk<
  ICommunitySnippet,
  { communityData: ICommunity; uid: string | undefined }
>("community/joinCommunity", async ({ communityData, uid }, thunkApi) => {
  console.log(communityData, uid);

  const newSnippet: ICommunitySnippet = {
    communityId: communityData.id,
    imageURL: communityData.imageURL || "",
    isModerator: false,
  };

  try {
    await createSubDocAndUpdateDoc(
      {
        collectionName: "communities",
        docId: communityData.id,
        data: { numberOfMembers: increment(1) },
      },
      {
        mainCollectionName: "users",
        mainDocId: uid,
        subCollectionName: "communitySnippets",
        subId: communityData.id,
        subdata: newSnippet,
      }
    );

    return newSnippet;
  } catch (error: any) {
    console.log(error);

    return thunkApi.rejectWithValue(error.message);
  }
});

export const leaveCommunity = createAsyncThunk<
  string,
  { communityId: string; uid: string | undefined }
>("community/leaveCommunity", async ({ communityId, uid }, thunkApi) => {
  try {
    await deleteSubDocAndUpdateDoc(
      {
        collectionName: "communities",
        docId: communityId,
        data: { numberOfMembers: increment(-1) },
      },
      {
        mainCollectionName: "users",
        mainDocId: uid,
        subCollectionName: "communitySnippets",
        subId: communityId,
      }
    );
    return communityId;
  } catch (error: any) {
    console.log(error);

    return thunkApi.rejectWithValue(error.message);
  }
});
