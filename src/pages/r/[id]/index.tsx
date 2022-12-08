import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { receiveDoc } from "../../../firebase/firestore-helpers";
import { useActions } from "../../../hooks/useActions";
import { ICommunity } from "../../../shared/types/community.interface";

import CommunityHeader from "../../../components/Community/CommunityHeader";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts/Posts";
import About from "../../../components/Community/About";

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  const router = useRouter();
  const { getCurrentCommunity } = useActions();

  useEffect(() => {
    getCurrentCommunity(router.query.id as string);
  }, [communityData]);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { docSnap, document: communityData } = await receiveDoc({
      collectionName: "communities",
      docId: context.query.id,
    });

    return {
      props: { communityData: docSnap.exists() ? communityData : "" },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export default CommunityPage;
