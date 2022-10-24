import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from "@chakra-ui/react";

import { useAuth } from "../../../firebase/useAuth";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../store/hooks";

import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const { user } = useAuth();
  const { hideAuthModal } = useActions();

  const authModal = useAppSelector((state) => state.authModal);

  useEffect(() => {
    if (user) {
      hideAuthModal();
    }
  }, [user]);

  return (
    <>
      <Modal isOpen={authModal.open} onClose={hideAuthModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {authModal.view === "login"
              ? "Login"
              : authModal.view === "signup"
              ? "Sign Up"
              : "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="90%"
            >
              {authModal.view === "login" || authModal.view === "signup" ? (
                <>
                  {" "}
                  <OAuthButtons />
                  <Text
                    color="gray.400"
                    fontWeight={700}
                    textTransform="uppercase"
                  >
                    or
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
