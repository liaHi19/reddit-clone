import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/clientApp";

import { IComment, INewComment } from "../../shared/types/posts.interface";

export const createComment = createAsyncThunk<IComment, INewComment>(
  "comments/createComment",
  async (newComment, apiThunk) => {
    try {
      const commentRef = doc(collection(db, "comments"));
      const comment = { id: commentRef.id, ...newComment };

      const batch = writeBatch(db);
      batch.set(commentRef, comment);

      const postRef = doc(db, "posts", newComment.postId);

      batch.update(postRef, { numberOfComments: increment(1) });
      await batch.commit();

      return comment as IComment;
    } catch (error: any) {
      toast.error("Can't create a comment");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const getPostComments = createAsyncThunk<IComment[], string>(
  "comments/getPostComments",
  async (postId, apiThunk) => {
    try {
      const posCommentsQuery = query(
        collection(db, "comments"),
        where("postId", "==", postId),
        orderBy("createdAt", "desc")
      );
      const postCommentsDocs = await getDocs(posCommentsQuery);
      const postComments = postCommentsDocs.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      return postComments as IComment[];
    } catch (error: any) {
      toast.error("Can't fetch comments");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);

export const deletePostComment = createAsyncThunk<
  string,
  {
    commentId: string;
    postId: string;
  }
>("comments/deletePostComment", async ({ commentId, postId }, apiThunk) => {
  try {
    const commentRef = doc(db, "comments", commentId);
    const postRef = doc(db, "posts", postId);

    const batch = writeBatch(db);
    batch.delete(commentRef);
    batch.update(postRef, { numberOfComments: increment(-1) });
    await batch.commit();

    return commentId;
  } catch (error: any) {
    toast.error("Can't delete comment");
    return apiThunk.rejectWithValue(error.message);
  }
});

export const updatePostComment = createAsyncThunk<IComment, IComment>(
  "comments/updatePostComment",
  async (updatedComment, apiThunk) => {
    try {
      const commentRef = doc(db, "comments", updatedComment.id);
      await updateDoc(commentRef, {
        text: updatedComment.text,
        isEdited: true,
      });

      return updatedComment;
    } catch (error: any) {
      toast.error("Can't delete comment");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);
