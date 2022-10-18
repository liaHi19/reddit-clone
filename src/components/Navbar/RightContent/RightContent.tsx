import React from "react";

import { Flex } from "@chakra-ui/react";

import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth/AuthModal";

type RightContentProps = {
  // user
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
