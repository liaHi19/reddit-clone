import React from "react";
import { User } from "firebase/auth";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FormState,
} from "react-hook-form";
import { Flex, Button, Text } from "@chakra-ui/react";

import { useAppSelector } from "../../../store/hooks";
import { IPostComment } from "../../../shared/types/posts.interface";

import MyTextarea from "../../elements/MyTextarea";
import UserCheck from "../../elements/UserCheck";

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
  const { edit } = useAppSelector((state) => state.dialog);
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
            // @ts-ignore:next-line
            name="commentText"
            placeholder="What are your thoughts?"
            minHeight="120px"
            {...register("commentText", { required: true, maxLength: 200 })}
            // @ts-ignore:next-line
            errorText={errors?.commentText?.message}
            pb={10}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="2px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
            zIndex={5}
          >
            <Button
              height="26px"
              disabled={!(isValid && isDirty)}
              isLoading={createLoading}
              onClick={handleSubmit(onCreateComment)}
            >
              {`${edit ? "Edit" : "Comment"}`}
            </Button>
          </Flex>
        </>
      ) : (
        <UserCheck text="Log in or sign up to leave a comment" />
      )}
    </Flex>
  );
};
export default CommentInput;
