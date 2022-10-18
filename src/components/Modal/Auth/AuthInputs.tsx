import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {/* {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />} */}
    </Flex>
  );
};
export default AuthInputs;
