import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useAppSelector } from "../../../store/hooks";

import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import AddCommunity from "./AddCommunity";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const { mySnippets } = useAppSelector((state) => state.community);

  const showCommunityModal = () => {
    setOpen(true);
  };

  const hideCommunityModal = () => {
    setOpen(false);
  };
  return (
    <>
      <CreateCommunityModal open={open} onClose={hideCommunityModal} />
      <Box mt={3} mb={4}>
        <Text
          textTransform="uppercase"
          pl={3}
          mb={1}
          fontSize="7pt"
          fontWeight={500}
          color="gray.500"
        >
          moderating
        </Text>

        {!!mySnippets.length &&
          mySnippets
            .filter((snippet) => snippet.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.id}
                icon={FaReddit}
                displayText={`r/${snippet.id}`}
                link={`/r/${snippet.id}`}
                imageURL={snippet.imageURL || ""}
                iconColor="brand.100"
              />
            ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text
          textTransform="uppercase"
          pl={3}
          mb={1}
          fontSize="7pt"
          fontWeight={500}
          color="gray.500"
        >
          my communities
        </Text>

        <AddCommunity onOpen={showCommunityModal} />
        {!!mySnippets.length &&
          mySnippets.map((snippet) => (
            <MenuListItem
              key={snippet.id}
              icon={FaReddit}
              displayText={`r/${snippet.id}`}
              link={`/r/${snippet.id}`}
              imageURL={snippet.imageURL || ""}
              iconColor="blue.500"
            />
          ))}
      </Box>
    </>
  );
};
export default Communities;
