import React from "react";
import { Flex, Icon, Menu, MenuList, Text } from "@chakra-ui/react";

import { TiHome } from "react-icons/ti";

import DropDownButton from "../../elements/DropDownButton";

const Directory: React.FC = () => {
  return (
    <Menu>
      <DropDownButton>
        <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
        <Flex display={{ base: "none", lg: "flex" }}>
          <Text fontWeight={600} fontSize="10pt">
            Home
          </Text>
        </Flex>
      </DropDownButton>
      <MenuList>Something</MenuList>
    </Menu>
  );
};
export default Directory;
