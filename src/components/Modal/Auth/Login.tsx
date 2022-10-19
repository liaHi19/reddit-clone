import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../../helpers/authSchema";
import { IAUthInput } from "./Auth.interface";

import MyInput from "../../elements/MyInput";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAuthModal = () => {
    setAuthModalState((prev) => ({
      ...prev,
      view: "signup",
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

  const onSubmit: SubmitHandler<IAUthInput> = (data) => {
    console.log(data);
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
        >
          {" "}
          Log in
        </Button>
      </form>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          textTransform="uppercase"
          fontWeight={700}
          cursor="pointer"
          onClick={handleAuthModal}
        >
          sign up
        </Text>
      </Flex>
    </>
  );
};
export default Login;
