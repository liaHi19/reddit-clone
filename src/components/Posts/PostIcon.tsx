import React, { MouseEvent } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

type PostIconProps = {
  icon: typeof Icon.arguments;
  text: string | number;
  onOpen?: () => void;
};

const PostIcon: React.FC<PostIconProps> = ({ icon, text, onOpen }) => {
  return (
    <>
      <Flex
        align="center"
        p="8px 10px"
        borderRadius={4}
        transition="all 0.3s ease-in-out"
        _hover={{ bg: "gray.200" }}
        onClick={onOpen}
        cursor="pointer"
      >
        <Icon as={icon} mr={2} />
        <Text fontSize="9pt">{text}</Text>
      </Flex>
    </>
  );
};
export default PostIcon;
