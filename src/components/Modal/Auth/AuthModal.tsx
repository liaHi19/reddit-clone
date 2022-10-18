import React from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";

import { authModalState } from "../../../atoms/authModalAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const hideAuthModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={hideAuthModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === "login"
              ? "Login"
              : modalState.view === "signup"
              ? "Sign Up"
              : "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
              border="1px solid red"
            >
              {/* <OAuthButtons /> */}
              {/* <AuthInputs /> */}
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
