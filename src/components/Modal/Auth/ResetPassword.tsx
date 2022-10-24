import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetRecoilState } from "recoil";

import { BsDot, BsReddit } from "react-icons/bs";
import { EmailIcon } from "@chakra-ui/icons";
import { Flex, Icon, Button, Text, useToast } from "@chakra-ui/react";

import { IAUthInput } from "./Auth.interface";

import { useAuth } from "../../../firebase/useAuth";
import { useActions } from "../../../hooks/useActions";

import { resetPassword } from "../../../helpers/authSchema";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

import MyInput from "../../elements/MyInput";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [loading, setLoading] = useState(false);
  const { handleAuthView } = useActions();

  const { resetPasswordEmail } = useAuth();

  const [success, setSuccess] = useState(false);
  const toast = useToast();

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
    try {
      setLoading(true);
      await resetPasswordEmail(data.email);
      setLoading(false);
      reset();
      setSuccess(true);
    } catch (error: any) {
      console.log("Reset Password Error", error);
      setLoading(false);

      toast({
        position: "top-right",
        title: "Reset Password Error",
        description:
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS] ||
          "Something went wrong with Sending Email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setSuccess(false);
    }
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
              isLoading={loading}
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
        <Text onClick={() => handleAuthView("login")}>LOGIN</Text>
        <Icon as={BsDot} />
        <Text onClick={() => handleAuthView("signup")}>SIGN UP</Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
