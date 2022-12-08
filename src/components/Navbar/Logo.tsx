import React from "react";
import { Flex, Image } from "@chakra-ui/react";

import useDirectory, { defaultMenuItem } from "../../hooks/useDirectory";

const Logo: React.FC = () => {
  const { onSelectedMenuItem } = useDirectory();
  return (
    <Flex
      align="center"
      width={{ base: "40px", md: "auto" }}
      mr={{ base: 0, md: 2 }}
      cursor="pointer"
      onClick={() => onSelectedMenuItem(defaultMenuItem)}
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
