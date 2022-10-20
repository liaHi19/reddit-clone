import React, { useState, useEffect } from "react";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { auth } from "../../../firebase/clientApp";
import { loginSchema } from "../../../helpers/authSchema";
import { IAUthInput } from "./Auth.interface";

import MyInput from "../../elements/MyInput";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const Login: React.FC = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [showPassword, setShowPassword] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        position: "top-right",
        title: "Login Error",
        description:
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAuthSignUp = () => {
    setAuthModalState((prev) => ({
      ...prev,
      view: "signup",
    }));
  };

  const handleAuthReset = () => {
    setAuthModalState((prev) => ({
      ...prev,
      view: "resetPassword",
    }));
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IAUthInput>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IAUthInput> = async (data) => {
    const { email, password } = data;
    await signInWithEmailAndPassword(email, password);
    reset();
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          name="email"
          {...register("email")}
          label="Email"
          type="email"
          placeholder="Email"
          leftIcon={<EmailIcon color="gray.400" />}
          errorText={errors?.email?.message}
        />
        <MyInput
          name="password"
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          leftIcon={<LockIcon color="gray.400" />}
          errorText={errors?.password?.message}
          onClick={handlePassword}
          rightIcon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
        />
        <Button
          type="submit"
          disabled={!isValid && !isDirty}
          width="100%"
          height="36px"
          mt={2}
          mb={2}
          isLoading={loading}
        >
          {" "}
          Log in
        </Button>
      </form>
      <Flex justify="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={handleAuthReset}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          textTransform="uppercase"
          fontWeight={700}
          cursor="pointer"
          onClick={handleAuthSignUp}
        >
          sign up
        </Text>
      </Flex>
    </>
  );
};
export default Login;
