import { useEffect } from "react";
import { useAuth } from "../firebase/useAuth";
import {
  INewPostVote,
  IUpdatedPostVote,
  IPost,
} from "../shared/types/posts.interface";
import { useAppSelector } from "../store/hooks";
import { useActions } from "./useActions";

const usePosts = () => {
  const { postVotes } = useAppSelector((state) => state.posts);
  const { user } = useAuth();

  const {
    createNewVote,
    updateVoteOnOne,
    updatePostVoteOnTwo,
    resetPostVotes,
    handleAuthView,
  } = useActions();

  useEffect(() => {
    if (!user) {
      resetPostVotes();
      return;
    }
  }, [user]);

  const onVote = (post: IPost, vote: number) => {
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

  return { onVote };
};

export default usePosts;
