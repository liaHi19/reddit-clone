import {
  ICommunity,
  ICommunitySnippet,
} from "../../shared/types/community.interface";

export interface ICommunityState {
  loading: boolean;
  uploadingImage?: boolean;
  mySnippets: ICommunitySnippet[];
  snippetsFetched: boolean;
  currentCommunity: ICommunity | null;
  error: string | null;
}
