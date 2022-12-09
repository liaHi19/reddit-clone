import { NextPage } from "next";
import { Box, Text } from "@chakra-ui/react";

import { useAuth } from "../../../firebase/useAuth";

import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/PostForm/NewPostForm";
import useCommunityData from "../../../hooks/useCommunityData";
import About from "../../../components/Community/About";

const SubmitPostPage: NextPage = () => {
  const { user } = useAuth();
  const { currentCommunity } = useCommunityData();

  return (
    <PageContent>
      <>
        <Box padding="14px 0" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageUrl={currentCommunity?.imageURL}
          />
        )}
      </>
      <>{currentCommunity && <About communityData={currentCommunity} />}</>
    </PageContent>
  );
};
export default SubmitPostPage;
