import { Flex, Icon } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type NavIconProps = {
  icon?: ReactNode | any;
  size: number;
  display?: boolean;
};

const NavIcon: React.FC<NavIconProps> = ({ icon, size, display }) => {
  return (
    <Flex
      display={display ? { base: "none", md: "flex" } : {}}
      mr={1.5}
      ml={1.5}
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
