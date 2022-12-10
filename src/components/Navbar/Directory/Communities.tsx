import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

import { useAppSelector } from "../../../store/hooks";
import { useActions } from "../../../hooks/useActions";

import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import AddCommunity from "./AddCommunity";
import MenuListItem from "./MenuListItem";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const { mySnippets } = useAppSelector((state) => state.community);
  const { modalOpen } = useAppSelector((state) => state.dialog);
  const { showModal, hideModal } = useActions();

  const moderatedSnippets = mySnippets.filter((snippet) => snippet.isModerator);

  return (
    <>
      <CreateCommunityModal open={modalOpen} onClose={hideModal} />
      {!!moderatedSnippets.length && (
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

          {moderatedSnippets.length &&
            moderatedSnippets
              .slice(0, 4)
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
      )}
      <Box mt={3} mb={4}>
        {!!mySnippets.length && (
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
        )}

        {!!mySnippets.length &&
          mySnippets
            .slice(0, 4)
            .map((snippet) => (
              <MenuListItem
                key={snippet.id}
                icon={FaReddit}
                displayText={`r/${snippet.id}`}
                link={`/r/${snippet.id}`}
                imageURL={snippet.imageURL || ""}
                iconColor="blue.500"
              />
            ))}
        <AddCommunity onOpen={showModal} />
      </Box>
    </>
  );
};
export default Communities;
