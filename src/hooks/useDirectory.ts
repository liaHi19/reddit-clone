import { useEffect } from "react";
import { useRouter } from "next/router";

import { FaReddit } from "react-icons/fa";
import { TiHome } from "react-icons/ti";

import { useAppSelector } from "../store/hooks";
import { useActions } from "./useActions";

import { IDirectoryMenuItem } from "../shared/types/directory.interface";

export const defaultMenuItem: IDirectoryMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

const useDirectory = () => {
  const { isOpen, selectedMenuItem } = useAppSelector(
    (state) => state.directory
  );
  const { currentCommunity } = useAppSelector((state) => state.community);
  const { toggleMenuItem, setMenuItem } = useActions();
  const router = useRouter();

  useEffect(() => {
    if (currentCommunity) {
      const currentMenuItem: IDirectoryMenuItem = {
        displayText: `r/${currentCommunity.id}`,
        link: `/r/${currentCommunity.id}`,
        imageURL: currentCommunity.imageURL,
        icon: FaReddit,
        iconColor: "blue.500",
      };
      setMenuItem(currentMenuItem);
    }
  }, [currentCommunity]);

  const onSelectedMenuItem = (menuItem: IDirectoryMenuItem) => {
    setMenuItem(menuItem);
    router.push(menuItem.link);
    if (isOpen) {
      toggleMenuItem();
    }
  };

  return { isOpen, selectedMenuItem, toggleMenuItem, onSelectedMenuItem };
};

export default useDirectory;
