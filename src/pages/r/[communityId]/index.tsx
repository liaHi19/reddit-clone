import { GetServerSidePropsContext, NextPage } from "next";
import safeJsonStringify from "safe-json-stringify";

import { receiveDoc } from "../../../firebase/firestore-helpers";
import { ICommunity } from "../../../atoms/communitiesAtom";

import CommunityHeader from "../../../components/Community/CommunityHeader";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";

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
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { docSnap, document: community } = await receiveDoc({
      collectionName: "communities",
      docId: context.query.communityId,
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
