import React from "react";
import { Flex, Image } from "@chakra-ui/react";

import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Directory from "./Directory/Directory";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" padding="6px 12px">
      <Flex align="center" mr={1}>
        <Image src="/images/redditFace.svg" alt="logo reddit" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="logo reddit"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <Directory />
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
