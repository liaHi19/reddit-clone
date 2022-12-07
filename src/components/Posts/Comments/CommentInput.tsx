import React from "react";
import { User } from "firebase/auth";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FormState,
} from "react-hook-form";
import { Flex, Button, Text } from "@chakra-ui/react";

import { IPostComment } from "../../../shared/types/posts.interface";

import AuthButtons from "../../Navbar/RightContent/AuthButtons";
import MyTextarea from "../../elements/MyTextarea";

type CommentInputProps = {
  user: User;
  createLoading: boolean;
  register: UseFormRegister<IPostComment>;
  handleSubmit: UseFormHandleSubmit<IPostComment>;
  formState: FormState<IPostComment>;
  onCreateComment: (data: IPostComment) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  user,
  createLoading,
  register,
  handleSubmit,
  formState: { errors, isValid, isDirty },
  onCreateComment,
}) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user?.displayName ?? user?.email?.split("@")[0]}
            </span>
          </Text>
          <MyTextarea
            name="commentText"
            placeholder="What are your thoughts?"
            {...register("commentText", { required: true, maxLength: 200 })}
            errorText={errors?.commentText?.message}
            pb={10}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="-16px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="26px"
              disabled={!(isValid && isDirty)}
              isLoading={createLoading}
              onClick={handleSubmit(onCreateComment)}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;
