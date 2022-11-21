import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { toast } from "react-toastify";

import {
  IPost,
  IPostVote,
  INewPostVote,
  IUpdatedPostVote,
} from "../../shared/types/posts.interface";

import {
  createDocAndSaveFile,
  deleteDocAndDeleteFile,
  receiveDocsWithQueryAndSort,
  receiveSubCollection,
} from "../../firebase/firestore-helpers";

import { db } from "../../firebase/clientApp";

// firebase

export const getPosts = createAsyncThunk<IPost[], string>(
  "posts/getPost",
  async (communityId, apiThunk) => {
    try {
      const posts = await receiveDocsWithQueryAndSort(
        { collectionName: "posts" },
        {
          docField: "communityId",
          condition: "==",
          comparedField: communityId,
        },
        { sortedField: "createdAt", order: "desc" }
      );

      return posts as IPost[];
    } catch (error: any) {
      toast.error("Can't receive posts");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk<string, IPost>(
  "posts/deletePost",
  async (post, apiThunk) => {
    try {
      await deleteDocAndDeleteFile(
        { collectionName: "posts", docId: post.id! },
        post.imageURL!
      );
      toast.success("Post was successfully deleted");
      return post.id as string;
    } catch (error: any) {
      toast.error("Can't delete post");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const getPostVotes = createAsyncThunk<
  IPostVote[],
  { uid: string; communityId: string }
>("posts/getPostVotes", async ({ uid, communityId }, apiThunk) => {
  try {
    const postVotesQuery = query(
      collection(db, "users", `${uid}/postVotes`),
      where("communityId", "==", communityId)
    );
    const postVotesDocs = await getDocs(postVotesQuery);
    const postVotes = postVotesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(postVotes);

    return postVotes as IPostVote[];
  } catch (error: any) {
    console.log(error);
    return apiThunk.rejectWithValue(error.message);
  }
});

export const createNewVote = createAsyncThunk<
  IPostVote,
  { postVote: INewPostVote; uid: string }
>("posts/createNewVote", async ({ postVote, uid }, apiThunk) => {
  try {
    const postVoteRef = doc(collection(db, "users", `${uid}/postVotes`));
    const newVote = { ...postVote, id: postVoteRef.id };
    const batch = writeBatch(db);

    batch.set(postVoteRef, newVote);

    batch.update(doc(db, "posts", newVote.postId), {
      voteStatus: increment(newVote.voteValue),
    });

    await batch.commit();

    return newVote as IPostVote;
  } catch (error: any) {
    console.log(error);
    toast.error("Can't vote");
    return apiThunk.rejectWithValue(error.message);
  }
});

export const updateVoteOnOne = createAsyncThunk<
  IUpdatedPostVote,
  { updatedPostVote: IUpdatedPostVote; uid: string; voteChange: number }
>(
  "posts/updateVoteOnOne",
  async ({ updatedPostVote, uid, voteChange }, apiThunk) => {
    try {
      const postVoteRef = doc(
        db,
        "users",
        `${uid}/postVotes/${updatedPostVote.id}`
      );
      const batch = writeBatch(db);
      batch.delete(postVoteRef);
      batch.update(doc(db, "posts", updatedPostVote.postId), {
        voteStatus: increment(voteChange),
      });
      await batch.commit();

      return updatedPostVote;
    } catch (error: any) {
      console.log(error);

      toast.error("Can't vote");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const updatePostVoteOnTwo = createAsyncThunk<
  IUpdatedPostVote,
  { updatedPostVote: IUpdatedPostVote; uid: string; voteChange: number }
>(
  "posts/updatePostVoteOnTwo",
  async ({ updatedPostVote, uid, voteChange }, apiThunk) => {
    try {
      const postVoteRef = doc(
        db,
        "users",
        `${uid}/postVotes/${updatedPostVote.id}`
      );
      const batch = writeBatch(db);
      batch.update(postVoteRef, { voteValue: updatedPostVote.voteValue });
      batch.update(doc(db, "posts", updatedPostVote.postId), {
        voteStatus: increment(voteChange),
      });
      await batch.commit();

      return updatedPostVote;
    } catch (error: any) {
      console.log(error);
      toast.error("Can't vote");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);
