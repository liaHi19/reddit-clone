import React from "react";
import { Flex } from "@chakra-ui/react";

import { useAuth } from "../../../firebase/useAuth";

import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth/AuthModal";
import Icons from "./Icons";
import UserMenu from "./UserMenu/UserMenu";

const RightContent: React.FC = () => {
  const { user, logOut } = useAuth();
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} logOut={logOut} />
      </Flex>
    </>
  );
};
export default RightContent;
