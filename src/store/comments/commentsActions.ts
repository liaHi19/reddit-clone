import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  increment,
  query,
  QueryDocumentSnapshot,
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
      batch.commit();
      return comment;
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
        where("postId", "==", postId)
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
      console.log(error);

      toast.error("Can't fetch comments");
      return apiThunk.rejectWithValue(error.message);
    }
  }
);
