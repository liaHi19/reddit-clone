import React from "react";

import { Button, Flex } from "@chakra-ui/react";

import { useAuth } from "../../../firebase/useAuth";

import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth/AuthModal";

const RightContent: React.FC = () => {
  const { user, loading, error, logOut } = useAuth();
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        {user ? <Button onClick={logOut}>Log out</Button> : <AuthButtons />}
      </Flex>
    </>
  );
};
export default RightContent;
