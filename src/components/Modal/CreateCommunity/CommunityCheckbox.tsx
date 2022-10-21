import { Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import React, { ChangeEvent, ReactNode } from "react";

type CommunityCheckboxProps = {
  communityName: "public" | "private" | "restricted";
  communityType: string;
  handleCommunityType: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  icon: ReactNode | any;
};

const CommunityCheckbox: React.FC<CommunityCheckboxProps> = ({
  communityName,
  communityType,
  handleCommunityType,
  text,
  icon,
}) => {
  return (
    <Checkbox
      name={communityName}
      isChecked={communityType === communityName}
      onChange={handleCommunityType}
    >
      <Flex align="center">
        <Icon as={icon} color="gray.500" mr={2} />
        <Text fontSize="10pt" mr={1} textTransform="capitalize">
          {communityName}
        </Text>
        <Text fontSize="8pt" color="gray.500" pt={1}>
          {text}
        </Text>
      </Flex>
    </Checkbox>
  );
};
export default CommunityCheckbox;
