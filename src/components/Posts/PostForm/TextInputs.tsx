import React from "react";
import { Button, Flex, Stack } from "@chakra-ui/react";
import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import MyInput from "../../elements/MyInput";
import MyTextarea from "../../elements/MyTextarea";

import { IPostInput } from "../../../shared/types/posts.interface";

type TextInputsProps = {
  register: UseFormRegister<IPostInput>;
  handleSubmit: UseFormHandleSubmit<IPostInput>;
  formState: FormState<IPostInput>;
  handleCreatePost: (data: IPostInput) => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  register,
  handleSubmit,
  formState: { errors, isValid },
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <MyInput
        name="title"
        placeholder="Title"
        {...register("title")}
        errorText={errors?.title?.message}
      />
      <MyTextarea
        name="body"
        placeholder="Text(Optional)"
        {...register("body")}
        errorText={errors?.body?.message}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          disabled={!isValid}
          isLoading={loading}
          onClick={handleSubmit(handleCreatePost)}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
