import { IPost, IPostVote } from "../../shared/types/posts.interface";

export interface IPostsState {
  loading: boolean;
  posts: IPost[];
  postVotes: IPostVote[];
  error: string | null;
}
