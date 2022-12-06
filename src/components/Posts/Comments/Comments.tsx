import React, { useEffect } from "react";
import { Box, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useForm } from "react-hook-form";
import moment from "moment";

import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../store/hooks";

import {
  INewComment,
  IPost,
  IPostComment,
} from "../../../shared/types/posts.interface";

import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

type CommentsProps = {
  user: User;
  selectedPost: IPost | null;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const { register, handleSubmit, formState, reset } = useForm<IPostComment>({
    mode: "onChange",
  });

  const { createComment, getPostComments } = useActions();
  const { comments, createLoading, loading } = useAppSelector(
    (state) => state.comments
  );

  useEffect(() => {
    if (!selectedPost?.id) return;
    getPostComments(selectedPost?.id!);
  }, [selectedPost?.id]);

  const onCreateComment = (data: IPostComment) => {
    const newComment: INewComment = {
      creatorId: user.uid,
      creatorDisplayText: user?.displayName ?? user.email?.split("@")[0]!,
      communityId,
      postId: selectedPost?.id!,
      postTitle: selectedPost?.title!,
      text: data.commentText,
      createdAt: moment().format(),
    };
    createComment(newComment);
    reset({ commentText: "" });
  };

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInput
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          createLoading={createLoading}
          user={user}
          onCreateComment={onCreateComment}
        />
      </Flex>
      {loading ? (
        <Flex align="center" justify="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : comments.length > 0 ? (
        <Stack spacing={6}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              userId={user?.uid!}
            />
          ))}
        </Stack>
      ) : (
        <Flex align="center" justifyContent="center">
          <Text fontWeight="500" fontSize="16pt">
            There are no comments yet
          </Text>
        </Flex>
      )}
    </Box>
  );
};
export default Comments;
