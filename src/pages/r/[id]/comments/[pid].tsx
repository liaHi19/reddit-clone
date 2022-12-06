import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../../../firebase/useAuth";
import { useActions } from "../../../../hooks/useActions";
import { useAppSelector } from "../../../../store/hooks";
import useCommunityData from "../../../../hooks/useCommunityData";

import PostItem from "../../../../components/Posts/PostItem";
import Comments from "../../../../components/Posts/Comments/Comments";
import About from "../../../../components/Community/About";
import PageContent from "../../../../components/Layout/PageContent";
import { User } from "firebase/auth";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { postVotes, selectedPost } = useAppSelector((state) => state.posts);
  const { currentCommunity } = useAppSelector((state) => state.community);
  const { user } = useAuth();
  const { getSelectedPost, getPostVote } = useActions();

  const { pid } = router.query;

  useCommunityData();

  useEffect(() => {
    if (pid && !selectedPost) {
      getSelectedPost(pid as string);
    }
  }, [router.query, selectedPost]);

  useEffect(() => {
    if (pid) {
      getPostVote({ uid: user?.uid!, postId: pid as string });
    }
  }, [router.query, user]);

  return (
    <PageContent>
      <>
        {selectedPost && (
          <PostItem
            post={selectedPost}
            userIsCreator={user?.uid === selectedPost.creatorId}
            voteId={
              postVotes.find((vote) => vote.postId === selectedPost.id)?.id!
            }
            userVoteValue={
              postVotes.find((vote) => vote.postId === selectedPost.id)
                ?.voteValue
            }
          />
        )}
        <Comments
          user={user as User}
          selectedPost={selectedPost}
          communityId={currentCommunity?.id as string}
        />
      </>
      <>{currentCommunity && <About communityData={currentCommunity} />}</>
    </PageContent>
  );
};

export default PostPage;
