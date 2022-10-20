import React from "react";
import { Flex } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const icons = [
  { id: 1, icon: BsArrowUpRightCircle, size: 20 },
  { id: 2, icon: IoFilterCircleOutline, size: 22 },
  { id: 3, icon: IoVideocamOutline, size: 22 },
  { id: 4, icon: BsChatDots, size: 20 },
  { id: 5, icon: IoNotificationsOutline, size: 20 },
  { id: 6, icon: GrAdd, size: 20 },
];
import NavIcon from "./NavIcon";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        {icons.slice(0, 3).map((icon) => (
          <NavIcon key={icon.id} {...icon} />
        ))}
      </Flex>
      <>
        {icons.slice(3).map((icon) => {
          return icon.icon === GrAdd ? (
            <NavIcon key={icon.id} {...icon} display />
          ) : (
            <NavIcon key={icon.id} {...icon} />
          );
        })}
      </>
    </Flex>
  );
};
export default Icons;
