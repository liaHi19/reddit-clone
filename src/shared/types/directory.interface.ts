import { IconType } from "react-icons";

export interface IDirectoryMenuItem {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
}
