export interface IPostInput {
  title: string;
  body?: string;
  image: string;
}

export interface IPost {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body?: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  loading: boolean;
  createdAt: string;
}

export interface IPostVote {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
}

export interface IComment {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  isEdited: boolean;
  createdAt: string;
}

export interface IPostComment {
  commentText: string;
}

export type INewPostVote = Omit<IPostVote, "id">;

export type IUpdatedPostVote = Omit<IPostVote, "communityId">;

export type INewComment = Omit<IComment, "id">;
