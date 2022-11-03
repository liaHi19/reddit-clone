import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IPost } from "../../shared/types/posts.interface";

import {
  createDocAndSaveFile,
  deleteDocAndDeleteFile,
  receiveDocsWithQueryAndSort,
} from "../../firebase/firestore-helpers";

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
