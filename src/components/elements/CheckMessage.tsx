import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type CheckMessageProps = {
  text: string;
};

const CheckMessage: React.FC<CheckMessageProps> = ({ text }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justifyContent="center"
      borderTop="1px solid"
      borderColor="gray.100"
      p={20}
    >
      <Text fontWeight={700} fontSize="16pt" opacity={0.3}>
        {text}
      </Text>
    </Flex>
  );
};
export default CheckMessage;
