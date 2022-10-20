import React, { ReactNode } from "react";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";

type UserMenuItemProps = {
  icon?: ReactNode | any;
  size?: number;
  text: string;
  onClick?: () => void;
};

const UserMenuItem: React.FC<UserMenuItemProps> = ({
  icon,
  size = 20,
  text,
  onClick,
}) => {
  return (
    <MenuItem
      fontSize="10pt"
      fontWeight={700}
      transition="0.3s ease-in-out"
      _hover={{ bg: "blue.500", color: "white" }}
      onClick={onClick}
    >
      <Flex align="center">
        <Icon as={icon} fontSize={size} mr={2} />
        {text}
      </Flex>
    </MenuItem>
  );
};
export default UserMenuItem;
