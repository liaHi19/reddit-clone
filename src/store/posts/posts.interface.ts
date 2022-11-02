import { IPost } from "../../shared/types/posts.interface";

export interface IPostsState {
  loading: boolean;
  posts: IPost[];
  error: string | null;
}
