import { createAsyncThunk } from "@reduxjs/toolkit";

import { IPost } from "../../shared/types/posts.interface";
import { receiveDocsWithQueryAndSort } from "../../firebase/firestore-helpers";

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
      return apiThunk.rejectWithValue(error.message);
    }
  }
);
