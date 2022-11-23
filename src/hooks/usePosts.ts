import { useRouter } from "next/router";
import { useEffect, MouseEvent, ReactElement } from "react";

import { useAuth } from "../firebase/useAuth";
import { useAppSelector } from "../store/hooks";
import { useActions } from "./useActions";

import {
  INewPostVote,
  IUpdatedPostVote,
  IPost,
} from "../shared/types/posts.interface";

const usePosts = () => {
  const { postVotes } = useAppSelector((state) => state.posts);
  const { user } = useAuth();
  const router = useRouter();

  const {
    createNewVote,
    updateVoteOnOne,
    updatePostVoteOnTwo,
    resetPostVotes,
    getSelectedPost,
    handleAuthView,
  } = useActions();

  useEffect(() => {
    if (!user) {
      resetPostVotes();
      return;
    }
  }, [user]);

  const onSelectPost = (post: IPost) => {
    getSelectedPost(post.id);
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onVote = (
    event: MouseEvent<ReactElement, MouseEvent>,
    post: IPost,
    vote: number
  ) => {
    event.stopPropagation();
    const existingVote = postVotes.find((vote) => vote.postId === post.id);
    let voteChange = vote;

    if (!user?.uid) {
      handleAuthView("login");
      return;
    }

    if (!existingVote) {
      const postVote: INewPostVote = {
        postId: post.id,
        communityId: post.communityId,
        voteValue: vote,
      };
      createNewVote({ postVote, uid: user?.uid! });
    } else {
      const updatedPostVote: IUpdatedPostVote = {
        id: existingVote.id,
        postId: post.id,
        voteValue: vote,
      };
      if (existingVote.voteValue === vote) {
        voteChange *= -1;
        updateVoteOnOne({ updatedPostVote, uid: user?.uid!, voteChange });
      } else {
        voteChange = 2 * vote;
        updatePostVoteOnTwo({ updatedPostVote, uid: user?.uid!, voteChange });
      }
    }
  };

  return { onVote, onSelectPost };
};

export default usePosts;
