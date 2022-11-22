import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../../../firebase/useAuth";
import { useActions } from "../../../../hooks/useActions";
import { useAppSelector } from "../../../../store/hooks";

import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Posts/PostItem";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { postVotes, selectedPost } = useAppSelector((state) => state.posts);
  const { user } = useAuth();
  const { getSelectedPost, getPostVote } = useActions();
  const { pid } = router.query;

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
      </>
      <></>
    </PageContent>
  );
};

export default PostPage;
