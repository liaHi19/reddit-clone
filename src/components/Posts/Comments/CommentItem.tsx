import React, { useRef } from "react";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import moment from "moment";

import { useAppSelector } from "../../../store/hooks";
import { useActions } from "../../../hooks/useActions";
import { IComment } from "../../../shared/types/posts.interface";

import DeleteDialog from "../../elements/DeleteDialog";
import ModalDialog from "../../elements/ModalDialog";
import EditCommentInput from "./EditCommentInput";

type CommentItemProps = {
  userId: string;
  comment: IComment;
};

const CommentItem: React.FC<CommentItemProps> = ({ userId, comment }) => {
  const { showModal, showDeleteConfirm, startEdit, deletePostComment } =
    useActions();
  const cancelRef = useRef();
  const { item } = useAppSelector((state) => state.dialog);
  const { deleteLoading } = useAppSelector((state) => state.comments);

  const openDeleteConfirm = () => {
    startEdit(comment);
    showDeleteConfirm();
  };
  return (
    <>
      <Flex>
        <Box mr={2}>
          <Icon as={FaReddit} fontSize={30} color="gray.300" />
        </Box>
        <Stack spacing={1}>
          <Stack direction="row" align="center" fontSize="8pt">
            <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
            <Text color="gray.600">{moment(comment.createdAt).fromNow()}</Text>
            {comment.isEdited && <Text color="gray.700">edited</Text>}
          </Stack>
          <Text fontSize="10pt">{comment.text}</Text>
          <Stack
            direction="row"
            align="center"
            cursor="pointer"
            color="gray.500"
          >
            <Icon as={IoArrowUpCircleOutline} />
            <Icon as={IoArrowDownCircleOutline} />
            {userId === comment.creatorId && (
              <>
                <Text
                  fontSize="9pt"
                  _hover={{ color: "blue.500" }}
                  onClick={() => startEdit(comment)}
                >
                  Edit
                </Text>
                <Text
                  fontSize="9pt"
                  _hover={{ color: "blue.500" }}
                  onClick={openDeleteConfirm}
                >
                  Delete
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Flex>
      {item && (
        <DeleteDialog
          title={`Delete Comment: ${item.text
            .split(" ")
            .slice(0, 4)
            .join(" ")}`}
          onDelete={() => {
            deletePostComment({
              commentId: item.id,
              postId: item.postId,
            });
          }}
          loading={deleteLoading}
          cancelRef={cancelRef}
        />
      )}
    </>
  );
};
export default CommentItem;
