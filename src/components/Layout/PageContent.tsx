import React, { ReactNode } from "react";

import { Flex } from "@chakra-ui/react";

type PageContentProps = {
  children?: ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex justify="center" padding="16px 0">
      <Flex justify="center" width="95%" maxWidth="860px">
        {/* lhs */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* rhs */}
        <Flex
          display={{ base: "none", md: "flex" }}
          direction="column"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
