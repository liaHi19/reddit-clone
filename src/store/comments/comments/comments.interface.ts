import { IComment } from "../../../shared/types/posts.interface";

export interface ICommentsState {
  loading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  comments: IComment[];
  error: string | null;
}
