import React, { useEffect } from "react";
import { Flex, Button, Image, useToast } from "@chakra-ui/react";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        position: "top-right",
        title: "Google Auth Error",
        description: error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        onClick={async () => {
          await signInWithGoogle();
        }}
        isLoading={loading}
      >
        <Image
          src="/images/googlelogo.png"
          alt="google logo"
          height="20px"
          mr={3}
        />
        Continue with Google
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
