import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import AddCommunity from "./AddCommunity";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);

  const showCommunityModal = () => {
    setOpen(true);
  };

  const hideCommunityModal = () => {
    setOpen(false);
  };
  return (
    <>
      <CreateCommunityModal open={open} onClose={hideCommunityModal} />
      <AddCommunity onOpen={showCommunityModal} />
    </>
  );
};
export default Communities;
