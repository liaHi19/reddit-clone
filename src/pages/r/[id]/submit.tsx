import { NextPage } from "next";
import { Box, Text } from "@chakra-ui/react";

import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";

const SubmitPostPage: NextPage = () => {
  return (
    <PageContent>
      <>
        <Box padding="14px 0" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
