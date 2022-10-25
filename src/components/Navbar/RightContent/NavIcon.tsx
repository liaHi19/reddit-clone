import { Flex, Icon } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type NavIconProps = {
  icon: typeof Icon.arguments;
  size: number;
  display?: boolean;
};

const NavIcon: React.FC<NavIconProps> = ({ icon, size, display }) => {
  return (
    <Flex
      display={display ? { base: "none", md: "flex" } : {}}
      margin="0 3px"
      padding={1}
      cursor="pointer"
      borderRadius={4}
      transition="0.3s ease-in-out"
      _hover={{ bg: "gray.200" }}
    >
      <Icon as={icon} fontSize={size} />
    </Flex>
  );
};
export default NavIcon;
