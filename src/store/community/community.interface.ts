import { ICommunitySnippet } from "../../shared/types/community.interface";

export interface ICommunityState {
  loading: boolean;
  mySnippets: ICommunitySnippet[];
  error: string | null;
}
