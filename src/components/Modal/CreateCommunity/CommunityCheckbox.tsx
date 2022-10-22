import { Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import React, { ChangeEvent, ReactNode } from "react";

type CommunityCheckboxProps = {
  communityStatus: "public" | "private" | "restricted";
  communityType: string;
  handleCommunityType: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  icon: ReactNode | any;
};

const CommunityCheckbox: React.FC<CommunityCheckboxProps> = ({
  communityStatus,
  communityType,
  handleCommunityType,
  text,
  icon,
}) => {
  return (
    <Checkbox
      name={communityStatus}
      isChecked={communityType === communityStatus}
      onChange={handleCommunityType}
    >
      <Flex align="center">
        <Icon as={icon} color="gray.500" mr={2} />
        <Text fontSize="10pt" mr={1} textTransform="capitalize">
          {communityStatus}
        </Text>
        <Text fontSize="8pt" color="gray.500">
          {text}
        </Text>
      </Flex>
    </Checkbox>
  );
};
export default CommunityCheckbox;
