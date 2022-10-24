import React, { useState } from "react";

import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serverTimestamp } from "firebase/firestore";

import { registerSchema } from "../../../helpers/authSchema";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

import { createOrUpdateDoc } from "../../../firebase/firestore-helpers";

import { useAuth } from "../../../firebase/useAuth";
import { useActions } from "../../../hooks/useActions";

import { IAUthInput } from "./Auth.interface";

import MyInput from "../../elements/MyInput";

const SignUp: React.FC = () => {
  const { createUser, changeProfile, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleAuthView } = useActions();

  const toast = useToast();

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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
    try {
      setLoading(true);
      const userCred = await createUser(data);
      await changeProfile({
        displayName: `${data.firstName} ${data.lastName}`,
      });

      const newUser = {
        displayName: userCred.displayName,
        email: userCred.email,
        photoURL: userCred.photoURL,
        createdAt: serverTimestamp(),
        uid: userCred.uid,
      };

      await createOrUpdateDoc({
        collectionName: "users",
        docId: userCred.uid,
        data: newUser,
      });

      setLoading(false);
    } catch (error: any) {
      console.log("Sign Up error", error);
      setLoading(false);
      toast({
        position: "top-right",
        title: "Sign Up Error",
        description:
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS] ||
          "Something went wrong with registration",
        status: "error",
        duration: 300,
        isClosable: true,
      });
    }

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
          isLoading={loading}
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
            handleAuthView("login");
          }}
        >
          Log in
        </Text>
      </Flex>
    </>
  );
};
export default SignUp;
