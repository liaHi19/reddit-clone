import { NextPage } from "next";
import { Box, Text } from "@chakra-ui/react";

import { useAuth } from "../../../firebase/useAuth";

import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/PostForm/NewPostForm";
import { useAppSelector } from "../../../store/hooks";

const SubmitPostPage: NextPage = () => {
  const { user } = useAuth();
  const { currentCommunity } = useAppSelector((state) => state.community);
  console.log("community", currentCommunity);

  return (
    <PageContent>
      <>
        <Box padding="14px 0" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
