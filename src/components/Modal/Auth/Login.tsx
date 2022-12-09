import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../../helpers/authSchema";
import { IAUthInput } from "./Auth.interface";

import { useAuth } from "../../../firebase/useAuth";
import { useActions } from "../../../hooks/useActions";

import { FIREBASE_ERRORS } from "../../../firebase/errors";

import MyInput from "../../elements/MyInput";

const Login: React.FC = () => {
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { handleAuthView } = useActions();

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
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
    try {
      setLoading(true);
      await logIn(email, password);
      setLoading(false);
    } catch (error: any) {
      toast.error(
        FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS] ||
          "Something went wrong with registration"
      );
      setLoading(false);
    }

    reset();
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          // @ts-ignore:next-line
          name="email"
          {...register("email")}
          // @ts-ignore:next-line
          label="Email"
          type="email"
          placeholder="Email"
          leftIcon={<EmailIcon color="gray.400" />}
          errorText={errors?.email?.message}
        />

        <MyInput
          // @ts-ignore:next-line
          name="password"
          {...register("password")}
          // @ts-ignore:next-line
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
          onClick={() => {
            handleAuthView("resetPassword");
          }}
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
          onClick={() => {
            handleAuthView("signup");
          }}
        >
          sign up
        </Text>
      </Flex>
    </>
  );
};
export default Login;
