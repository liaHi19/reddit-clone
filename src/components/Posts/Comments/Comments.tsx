import React, { useEffect } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
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
import CheckMessage from "../../elements/CheckMessage";

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

  const { createComment, getPostComments, updatePostComment, hideEdit } =
    useActions();
  const { comments, createLoading, loading } = useAppSelector(
    (state) => state.comments
  );
  const { edit, item } = useAppSelector((state) => state.dialog);

  useEffect(() => {
    if (!selectedPost?.id) return;
    getPostComments(selectedPost?.id!);
  }, [selectedPost?.id]);

  useEffect(() => {
    if (edit) {
      reset({ commentText: item.text });
    }
  }, [item, edit]);

  const onCreateComment = (data: IPostComment) => {
    const newComment: INewComment = {
      creatorId: user.uid,
      creatorDisplayText: user?.displayName ?? user.email?.split("@")[0]!,
      communityId,
      postId: selectedPost?.id!,
      postTitle: selectedPost?.title!,
      text: data.commentText,
      isEdited: false,
      createdAt: moment().format(),
    };
    const updatedComment = { ...item, text: data.commentText, isEdited: true };
    edit ? updatePostComment(updatedComment) : createComment(newComment);
    edit && hideEdit();
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
        <>
          {[0, 1, 2].map((item) => (
            <Box key={item} padding="6" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Box>
          ))}
        </>
      ) : comments.length > 0 ? (
        <Stack spacing={6} p={2}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              userId={user?.uid!}
            />
          ))}
        </Stack>
      ) : (
        <CheckMessage text="No Comments yet" />
      )}
    </Box>
  );
};
export default Comments;
