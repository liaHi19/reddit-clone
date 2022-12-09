import React, { useEffect } from "react";
import { Stack } from "@chakra-ui/react";

import { useActions } from "../../hooks/useActions";
import { useAuth } from "../../firebase/useAuth";

import { ICommunity } from "../../shared/types/community.interface";
import { useAppSelector } from "../../store/hooks";
import usePosts from "../../hooks/usePosts";

import PostItem from "./PostItem";
import PostLoader from "./PostLoader";
import CheckMessage from "../elements/CheckMessage";

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const { getPosts } = useActions();
  const { posts, loading } = useAppSelector((state) => state.posts);
  const { user } = useAuth();
  const { onSelectPost, postVotes, onVote } = usePosts();

  useEffect(() => {
    if (!communityData?.id) return;
    getPosts(communityData.id);
  }, [communityData]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : posts.length > 0 ? (
        <Stack>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              voteId={postVotes.find((vote) => vote.postId === post.id)?.id!}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={
                postVotes.find((vote) => vote.postId === post.id)?.voteValue
              }
              onSelectPost={onSelectPost}
              onVote={onVote}
            />
          ))}
        </Stack>
      ) : (
        <CheckMessage text="No posts yet" />
      )}
    </>
  );
};
export default Posts;
