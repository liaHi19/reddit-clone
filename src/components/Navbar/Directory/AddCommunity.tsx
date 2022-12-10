import React from "react";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

type AddCommunityProps = {
  onOpen: () => void;
};

const AddCommunity: React.FC<AddCommunityProps> = ({ onOpen }) => {
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={onOpen}
      mt={2}
    >
      <Flex align="center">
        <Icon fontSize={20} mr={2} as={GrAdd} />
        Create Community
      </Flex>
    </MenuItem>
  );
};
export default AddCommunity;
