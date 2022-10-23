import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface ICommunity {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "private" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}
