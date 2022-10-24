import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useAppSelector } from "../../../store/hooks";

import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalAuth = useAppSelector((state) => state.authModal);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modalAuth.view === "login" && <Login />}
      {modalAuth.view === "signup" && <SignUp />}
    </Flex>
  );
};
export default AuthInputs;
