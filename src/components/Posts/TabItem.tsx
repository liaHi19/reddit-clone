import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { ITabItem } from "./PostForm/NewPostForm";

type TabItemProps = {
  icon: ITabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  icon,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      padding="14px 0"
      cursor="pointer"
      fontWeight={700}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      transition="0.3s ease-in-out"
      _hover={{ bg: "gray.50" }}
      onClick={() => setSelectedTab(icon.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={icon.icon} />
      </Flex>
      <Text fontSize="10pt">{icon.title}</Text>
    </Flex>
  );
};
export default TabItem;
