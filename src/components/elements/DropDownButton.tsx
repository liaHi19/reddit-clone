import { ChevronDownIcon } from "@chakra-ui/icons";
import { MenuButton, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type DropDownButtonProps = {
  children: ReactNode;
};

const DropDownButton: React.FC<DropDownButtonProps> = ({ children }) => {
  return (
    <MenuButton
      cursor="pointer"
      padding="0 4px"
      margin="0 2px"
      borderRadius={4}
      transition="0.3s ease-in-out"
      _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">{children}</Flex>
        <ChevronDownIcon />
      </Flex>
    </MenuButton>
  );
};
export default DropDownButton;
