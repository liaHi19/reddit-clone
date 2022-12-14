import { Timestamp } from "firebase/firestore";

export interface ICommunity {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "public";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface ICommunitySnippet {
  id: string;
  isModerator: boolean;
  imageURL?: string;
}
