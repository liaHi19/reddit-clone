import {
  ICommunity,
  ICommunitySnippet,
} from "../../shared/types/community.interface";

export interface ICommunityState {
  loading: boolean;
  uploadingImage?: boolean;
  mySnippets: ICommunitySnippet[];
  currentCommunity?: ICommunity;
  error: string | null;
}
