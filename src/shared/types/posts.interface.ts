import { Timestamp } from "firebase/firestore";

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
  createdAt: Timestamp;
}
