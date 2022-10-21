import React from "react";
import { Flex } from "@chakra-ui/react";

import { useAuth } from "../../firebase/useAuth";

import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Directory from "./Directory/Directory";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  return (
    <Flex bg="white" padding="6px 12px" justify={{ md: "space-between" }}>
      <Logo />
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
