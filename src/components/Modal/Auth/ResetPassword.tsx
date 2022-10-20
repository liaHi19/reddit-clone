import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetRecoilState } from "recoil";

import { BsDot, BsReddit } from "react-icons/bs";
import { EmailIcon } from "@chakra-ui/icons";
import { Flex, Icon, Button, Text, useToast } from "@chakra-ui/react";

import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import { authModalState, IView } from "../../../atoms/authModalAtom";
import { IAUthInput } from "./Auth.interface";

import { auth } from "../../../firebase/clientApp";
import { resetPassword } from "../../../helpers/authSchema";

import MyInput from "../../elements/MyInput";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  useEffect(() => {
    if (error) {
      toast({
        position: "top-right",
        title: "Reset Password Error",
        description:
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IAUthInput>({
    mode: "onChange",
    resolver: yupResolver(resetPassword),
  });

  const onSubmit: SubmitHandler<IAUthInput> = async (data) => {
    await sendPasswordResetEmail(data.email);
    reset();
    setSuccess(true);
  };

  const handleAuth = (view: IView) => {
    setAuthModalState((prev) => ({
      ...prev,
      view,
    }));
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email :)</Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter the email associated with your account and we will send you a
            reset link
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <MyInput
              name="email"
              {...register("email")}
              label="Email"
              type="email"
              placeholder="Email"
              leftIcon={<EmailIcon color="gray.400" />}
              errorText={errors?.email?.message}
            />
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={sending}
              disabled={!isDirty || !isValid}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        <Text onClick={() => handleAuth("login")}>LOGIN</Text>
        <Icon as={BsDot} />
        <Text onClick={() => handleAuth("signup")}>SIGN UP</Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
