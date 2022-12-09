import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import AuthButtons from "../Navbar/RightContent/AuthButtons";

type UserCheckProps = {
  text: string;
};

const UserCheck: React.FC<UserCheckProps> = ({ text }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      borderRadius={2}
      border="1px solid"
      borderColor="gray.100"
      p={4}
    >
      <Text fontWeight={600}>{text}</Text>
      <AuthButtons />
    </Flex>
  );
};
export default UserCheck;
