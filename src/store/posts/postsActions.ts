import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  increment,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

import {
  IPost,
  IPostVote,
  INewPostVote,
  IUpdatedPostVote,
} from "../../shared/types/posts.interface";

import { db, storage } from "../../firebase/clientApp";
import { receiveDoc } from "../../firebase/firestore-helpers";

export const getPosts = createAsyncThunk<IPost[], string>(
  "posts/getPost",
  async (communityId, apiThunk) => {
    try {
      const postQuery = query(
        collection(db, "posts"),
        where("communityId", "==", communityId),
        orderBy("createdAt", "desc")
      );
      const postsSnap = await getDocs(postQuery);
      const posts = postsSnap.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          ...doc.data(),
          id: doc.id,
        })
      );

      return posts as IPost[];
    } catch (error: any) {
      toast.error("Can't receive posts");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk<
  string,
  { postId: string; uid: string; imageURL: string; voteId: string }
>("posts/deletePost", async ({ postId, uid, imageURL, voteId }, apiThunk) => {
  try {
    if (imageURL) {
      const fileRef = ref(storage, `posts/${postId}/image`);
      await deleteObject(fileRef);
    }
    const batch = writeBatch(db);
    batch.delete(doc(db, "posts", postId));
    if (voteId) {
      batch.delete(doc(db, `users/${uid}/postVotes`, voteId));
    }
    const commentQuery = query(
      collection(db, "comments"),
      where("postId", "==", postId)
    );

    const postCommentsRef = await getDocs(commentQuery);

    if (postCommentsRef.docs.length > 0) {
      postCommentsRef.docs.forEach((document) =>
        batch.delete(doc(db, "comments", document.id))
      );
    }

    await batch.commit();

    toast.success("Post was successfully deleted");

    return postId as string;
  } catch (error: any) {
    toast.error("Can't delete post");
    return apiThunk.rejectWithValue(error.message);
  }
});

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
    const postVotes = postVotesDocs.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    return postVotes as IPostVote[];
  } catch (error: any) {
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
      toast.error("Can't vote");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const getSelectedPost = createAsyncThunk<IPost, string>(
  "posts/getSelectedPost",
  async (postId, apiThunk) => {
    try {
      const { document: selectedPost } = await receiveDoc({
        collectionName: "posts",
        docId: postId,
      });
      return selectedPost as IPost;
    } catch (error: any) {
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const getPostVote = createAsyncThunk<
  IPostVote[],
  { uid: string; postId: string }
>("posts/getPostVote", async ({ uid, postId }, apiThunk) => {
  try {
    const postVotesQuery = query(
      collection(db, "users", `${uid}/postVotes`),
      where("postId", "==", postId)
    );
    const postVotesDocs = await getDocs(postVotesQuery);
    const postVotes = postVotesDocs.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
    return postVotes as IPostVote[];
  } catch (error: any) {
    return apiThunk.rejectWithValue(error.message);
  }
});
