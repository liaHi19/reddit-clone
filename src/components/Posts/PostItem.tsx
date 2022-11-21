import React, { useState } from "react";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import moment from "moment";

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
  userVoteValue?: number;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  const postIcons = [
    { id: 1, icon: BsChat, text: post.numberOfComments },
    { id: 2, icon: IoArrowRedoOutline, text: "Share" },
    { id: 3, icon: IoBookmarkOutline, text: "Save" },
  ];

  const { deletePost } = useActions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onVote } = usePosts();
  const cancelRef = React.useRef();

  return (
    <>
      <Flex
        border="1px solid"
        bg="white"
        borderColor="gray.300"
        borderRadius={4}
        transition="all 0.3s ease-in-out"
        cursor="pointer"
        _hover={{ borderColor: "gray.500" }}
        // onClick={onSelectPost}
      >
        <Flex
          direction="column"
          align="center"
          bg="gray.100"
          p={2}
          width="40px"
          borderRadius={4}
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
            onClick={() => onVote(post, 1)}
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
            onClick={() => onVote(post, -1)}
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
              <PostIcon icon={AiOutlineDelete} text="Delete" onOpen={onOpen} />
            )}
          </Flex>
        </Flex>
      </Flex>
      <DeleteDialog
        title={`Delete Post: ${post.title}`}
        onDelete={() => deletePost(post)}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
    </>
  );
};
export default PostItem;
