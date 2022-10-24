import { GetServerSidePropsContext, NextPage } from "next";
import safeJsonStringify from "safe-json-stringify";

import { receiveDoc } from "../../../firebase/firestore-helpers";

import CommunityHeader from "../../../components/Community/CommunityHeader";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { ICommunity } from "../../../shared/types/community.interface";

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <>
          <div>right content</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { docSnap, document: community } = await receiveDoc({
      collectionName: "communities",
      docId: context.query.id,
    });

    const communityData = JSON.parse(safeJsonStringify(community));

    return {
      props: { communityData: docSnap.exists() ? communityData : "" },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
export default CommunityPage;
