import { Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import CreatePostLink from "../components/Community/CreatePostLink";
import CheckMessage from "../components/elements/CheckMessage";

import PageContent from "../components/Layout/PageContent";
import PostItem from "../components/Posts/PostItem";
import PostLoader from "../components/Posts/PostLoader";
import { useAuth } from "../firebase/useAuth";
import { useActions } from "../hooks/useActions";
import useCommunityData from "../hooks/useCommunityData";
import usePosts from "../hooks/usePosts";
import { useAppSelector } from "../store/hooks";

const HomePage: NextPage = () => {
  const { user, loading: loadingUser } = useAuth();
  const {
    buildNoUserHomeFeed,
    buildUserHomeFeed,
    getUserPostVotes,
    resetPostVotes,
  } = useActions();
  const { onSelectPost, postVotes, onVote } = usePosts();
  const { snippetsFetched } = useCommunityData();

  const { posts, loading } = useAppSelector((state) => state.posts);
  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (snippetsFetched) {
      buildUserHomeFeed();
    }
  }, [snippetsFetched]);

  useEffect(() => {
    if (user && posts.length) {
      getUserPostVotes(user?.uid!);
    }
    return () => {
      resetPostVotes();
    };
  }, [user, posts]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
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
                homePage
              />
            ))}
          </Stack>
        ) : (
          <CheckMessage text="No posts yet" />
        )}
      </>
      <></>
    </PageContent>
  );
};

export default HomePage;
