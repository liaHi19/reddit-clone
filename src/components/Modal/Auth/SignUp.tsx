import React, { useState, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { authModalState, IView } from "../../../atoms/authModalAtom";
import { registerSchema } from "../../../helpers/authSchema";

import { IAUthInput } from "./Auth.interface";

import MyInput from "../../elements/MyInput";

const SignUp: React.FC = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setAuthModalState = useSetRecoilState(authModalState);

  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        position: "top-right",
        title: "Sign Up Error",
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

  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleAuth = (name: IView) => {
    setAuthModalState((prev) => ({
      ...prev,
      view: name,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IAUthInput>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IAUthInput> = async (data) => {
    const { email, password, firstName, lastName } = data;
    try {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: `${firstName} ${lastName}` });
    } catch (err) {}

    reset();
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          name="firstName"
          {...register("firstName")}
          label="First Name"
          placeholder="First Name"
          leftIcon={<Icon as={AiOutlineUser} color="gray.400" />}
          errorText={errors?.firstName?.message}
        />
        <MyInput
          name="lastName"
          {...register("lastName")}
          label="Last Name"
          placeholder="Last Name"
          leftIcon={<Icon as={AiOutlineUser} color="gray.400" />}
          errorText={errors?.lastName?.message}
        />
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
        <MyInput
          name="confirmPassword"
          {...register("confirmPassword")}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          leftIcon={<LockIcon color="gray.400" />}
          errorText={errors?.confirmPassword?.message}
          onClick={handleConfirmPassword}
          rightIcon={showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
        />
        <Button
          type="submit"
          disabled={!isValid && !isDirty}
          width="100%"
          height="36px"
          mt={2}
          mb={2}
          isLoading={loading || updating}
        >
          {" "}
          Sign Up
        </Button>
      </form>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color="blue.500"
          textTransform="uppercase"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {
            handleAuth("login");
          }}
        >
          Log in
        </Text>
      </Flex>
    </>
  );
};
export default SignUp;
