import React from "react";
import { User } from "firebase/auth";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";

import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/authModalAtom";

import DropDownButton from "../../../elements/DropDownButton";
import UserMenuItem from "./UserMenuItem";
import UserName from "./UserName";

type UserMenuProps = {
  user?: User | null;
  logOut: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ user, logOut }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const showLogin = () => {
    setAuthModalState({ open: true, view: "login" });
  };
  return (
    <Menu>
      <DropDownButton>
        {" "}
        {user ? (
          <>
            <Icon as={FaRedditSquare} fontSize={24} mr={1} color="gray.300" />
            <UserName user={user} />
          </>
        ) : (
          <Icon as={VscAccount} fontSize={24} mr={1} color="gray.400" />
        )}
      </DropDownButton>
      <MenuList>
        {user ? (
          <>
            <UserMenuItem icon={CgProfile} text="Profile" />
            <MenuDivider />
            <UserMenuItem
              icon={MdOutlineLogin}
              text="Log out"
              onClick={logOut}
            />
          </>
        ) : (
          <UserMenuItem
            icon={MdOutlineLogin}
            text="Log in / Sign up"
            onClick={showLogin}
          />
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
