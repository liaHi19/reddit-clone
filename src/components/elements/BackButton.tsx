import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";

const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <Button
      height="26px"
      width="60px"
      margin="8px 0"
      onClick={() => router.back()}
    >
      <Icon as={HiArrowNarrowLeft} fontSize="20px" />
    </Button>
  );
};
export default BackButton;
