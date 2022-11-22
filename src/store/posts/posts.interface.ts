import { IPost, IPostVote } from "../../shared/types/posts.interface";

export interface IPostsState {
  loading: boolean;
  posts: IPost[];
  selectedPost: IPost | null;
  postVotes: IPostVote[];
  error: string | null;
}
