import React from "react";
import { Flex, Icon, Menu, MenuList, Text, Image } from "@chakra-ui/react";

import useDirectory from "../../../hooks/useDirectory";

import DropDownButton from "../../elements/DropDownButton";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const { isOpen, toggleMenuItem, selectedMenuItem } = useDirectory();
  return (
    <Menu isOpen={isOpen}>
      <DropDownButton toggleMenuItem={toggleMenuItem}>
        {selectedMenuItem.imageURL ? (
          <Image
            src={selectedMenuItem.imageURL}
            alt={selectedMenuItem.displayText}
            borderRadius="full"
            boxSize="24px"
            objectFit="cover"
            mr={2}
          />
        ) : (
          <Icon
            as={selectedMenuItem.icon}
            color={selectedMenuItem.iconColor}
            fontSize={24}
            mr={{ base: 1, md: 2 }}
          />
        )}

        <Flex display={{ base: "none", lg: "flex" }}>
          <Text fontWeight={600} fontSize="10pt">
            {selectedMenuItem.displayText}
          </Text>
        </Flex>
      </DropDownButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
