import React from "react";
import { Flex, Image } from "@chakra-ui/react";

const Logo: React.FC = () => {
  return (
    <Flex
      align="center"
      width={{ base: "40px", md: "auto" }}
      mr={{ base: 0, md: 2 }}
    >
      <Image src="/images/redditFace.svg" alt="logo reddit" height="30px" />
      <Image
        src="/images/redditText.svg"
        alt="logo reddit"
        height="46px"
        display={{ base: "none", md: "unset" }}
      />
    </Flex>
  );
};
export default Logo;
