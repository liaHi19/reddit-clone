import { GetServerSidePropsContext, NextPage } from "next";
import safeJsonStringify from "safe-json-stringify";

import { ICommunity } from "../../../atoms/communitiesAtom";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";

import { receiveDoc } from "../../../firebase/firestore-helpers";

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  console.log(communityData);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return <div>Welcome to {communityData.id}</div>;
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
