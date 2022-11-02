import React, { useEffect } from "react";
import { Stack } from "@chakra-ui/react";

import { useActions } from "../../hooks/useActions";
import { useAuth } from "../../firebase/useAuth";

import { ICommunity } from "../../shared/types/community.interface";
import { useAppSelector } from "../../store/hooks";

import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const { getPosts } = useActions();
  const { posts, loading } = useAppSelector((state) => state.posts);
  const { user } = useAuth();

  useEffect(() => {
    getPosts(communityData.id);
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={undefined}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
