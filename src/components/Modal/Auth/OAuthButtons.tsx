import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

import { Flex, Button, Image } from "@chakra-ui/react";

import { useAuth } from "../../../firebase/useAuth";
import { createOrUpdateDoc } from "../../../firebase/firestore-helpers";

const OAuthButtons: React.FC = () => {
  const { signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const newUser = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: moment().format(),
        uid: user.uid,
      };

      createOrUpdateDoc({
        collectionName: "users",
        docId: user?.uid,
        data: newUser,
      });
    }
  }, [user]);

  const signIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      setLoading(false);
    } catch (error: any) {
      toast.error("Something went wrong with Google registration");
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2} onClick={signIn} isLoading={loading}>
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
