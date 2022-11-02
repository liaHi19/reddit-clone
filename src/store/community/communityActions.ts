import { createAsyncThunk } from "@reduxjs/toolkit";
import { increment } from "firebase/firestore";
import { toast } from "react-toastify";

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
      toast.error("Can't receive your communities");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const joinCommunity = createAsyncThunk<
  ICommunitySnippet,
  { communityData: ICommunity; uid: string }
>("community/joinCommunity", async ({ communityData, uid }, thunkApi) => {
  const newSnippet: ICommunitySnippet = {
    id: communityData.id,
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
    toast.error("Can't join to the Community");

    return thunkApi.rejectWithValue(error.message);
  }
});

export const leaveCommunity = createAsyncThunk<
  string,
  { id: string; uid: string }
>("community/leaveCommunity", async ({ id, uid }, thunkApi) => {
  try {
    await deleteSubDocAndUpdateDoc(
      {
        collectionName: "communities",
        docId: id,
        data: { numberOfMembers: increment(-1) },
      },
      {
        mainCollectionName: "users",
        mainDocId: uid,
        subCollectionName: "communitySnippets",
        subId: id,
      }
    );
    return id;
  } catch (error: any) {
    toast.error("Can't leave the Community");

    return thunkApi.rejectWithValue(error.message);
  }
});
