import { IPost } from "../shared/types/posts.interface";

type Items = IPost[];

export const findById = (items: Items, id: string) => {
  return items.find((item) => item.id === id);
};
