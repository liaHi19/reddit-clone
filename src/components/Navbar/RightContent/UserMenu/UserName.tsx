import React from "react";
import { User } from "firebase/auth";

import { IoSparkles } from "react-icons/io5";
import { Flex, Text, Icon } from "@chakra-ui/react";

type UserNameProps = {
  user?: User | null;
};

const UserName: React.FC<UserNameProps> = ({ user }) => {
  return (
    <Flex
      direction="column"
      display={{ base: "none", lg: "flex" }}
      fontSize="8pt"
      align="flex-start"
      mr={8}
    >
      <Text fontWeight={700}>
        {user?.displayName || user?.email?.split("@")[0]}
      </Text>
      <Flex align="center">
        <Icon as={IoSparkles} color="brand.100" mr={1} />
        <Text color="gray.400">1 karma</Text>
      </Flex>
    </Flex>
  );
};
export default UserName;
