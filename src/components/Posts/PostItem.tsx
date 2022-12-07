import React, { useState, MouseEvent, useRef } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import {
  Flex,
  Stack,
  Text,
  Image,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

import { useActions } from "../../hooks/useActions";
import usePosts from "../../hooks/usePosts";

import { IPost } from "../../shared/types/posts.interface";

import PostIcon from "./PostIcon";
import DeleteDialog from "../elements/DeleteDialog";
import { useAppSelector } from "../../store/hooks";

type PostItemProps = {
  post: IPost;
  userIsCreator: boolean;
  voteId: string;
  userVoteValue?: number;
  onSelectPost?: (post: IPost) => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  voteId,
  userVoteValue,
  onSelectPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const cancelRef = useRef();
  const router = useRouter();

  const { deletePost, showDeleteConfirm, startEdit } = useActions();
  const { onVote } = usePosts();

  const { item } = useAppSelector((state) => state.dialog);

  const isSinglePost = !onSelectPost;
  const openDeleteConfirm = () => {
    startEdit(post);
    showDeleteConfirm();
  };

  const postIcons = [
    { id: 1, icon: BsChat, text: post.numberOfComments },
    { id: 2, icon: IoArrowRedoOutline, text: "Share" },
    { id: 3, icon: IoBookmarkOutline, text: "Save" },
  ];

  return (
    <>
      <Flex
        border="1px solid"
        bg="white"
        borderColor={isSinglePost ? "white" : "gray.300"}
        borderRadius={isSinglePost ? "4px 4px 0px 0px" : "4px"}
        transition="all 0.3s ease-in-out"
        cursor={isSinglePost ? "unset" : "pointer"}
        _hover={{ borderColor: isSinglePost ? "none" : "gray.500" }}
        onClick={() => onSelectPost && onSelectPost(post)}
      >
        <Flex
          direction="column"
          align="center"
          bg={isSinglePost ? "none" : "gray.100"}
          p={2}
          width="40px"
          borderRadius={isSinglePost ? "0" : "3px 0px 0px 3px"}
        >
          <IconButton
            icon={<HiArrowNarrowUp />}
            background={userVoteValue === 1 ? "brand.100" : "gray.400"}
            transition="all 0.3s ease-in-out"
            _hover={{
              background: userVoteValue === 1 ? "brand.500" : "gray.500",
            }}
            size="xs"
            cursor="pointer"
            onClick={(event) => onVote(event, post, 1)}
            isLoading={post.loading}
            aria-label={"increase votes of the posts"}
          />
          <Text fontSize="10pt">{post.voteStatus}</Text>
          <IconButton
            icon={<HiArrowNarrowDown />}
            background={userVoteValue === -1 ? "#4379ff" : "gray.400"}
            transition="all 0.3s ease-in-out"
            _hover={{
              background: userVoteValue === -1 ? "#3b67d6" : "gray.500",
            }}
            size="xs"
            cursor="pointer"
            onClick={(event) => onVote(event, post, -1)}
            isLoading={post.loading}
            aria-label={"decrease votes of the posts"}
          />
        </Flex>
        <Flex direction="column" width="100%">
          <Stack spacing={1} p="10px">
            <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
              {/* Homepage check */}
              <Text>
                Posted by u/{post.creatorDisplayName}{" "}
                {moment(post.createdAt).fromNow()}{" "}
              </Text>
            </Stack>
            <Text fontSize="12pt" fontWeight={600}>
              {post.title}
            </Text>
            {post.body && <Text fontSize="10pt">{post.body}</Text>}
            {post.imageURL && (
              <Flex justify="center" align="center" p={2}>
                {loadingImage && (
                  <Skeleton height="200px" width="100%" borderRadius={4} />
                )}
                <Image
                  src={post.imageURL}
                  alt={post.title}
                  maxHeight="460px"
                  display={loadingImage ? "none" : "unset"}
                  onLoad={() => setLoadingImage(false)}
                />
              </Flex>
            )}
          </Stack>
          <Flex ml={1} mb={0.5} color="gray.500">
            {postIcons.map(({ icon, text, id }) => (
              <PostIcon key={id} icon={icon} text={text} />
            ))}
            {userIsCreator && (
              <PostIcon
                icon={AiOutlineDelete}
                text="Delete"
                onOpen={(event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  event.stopPropagation();
                  openDeleteConfirm();
                }}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
      {item && (
        <DeleteDialog
          title={`Delete Post: ${item.title}`}
          onDelete={() => {
            deletePost({
              postId: item.id,
              uid: item.creatorId,
              imageURL: item.imageURL || "",
              voteId,
            });
            if (isSinglePost) {
              router.push(`/r/${item.communityId}`);
            }
          }}
          cancelRef={cancelRef}
        />
      )}
    </>
  );
};
export default PostItem;
