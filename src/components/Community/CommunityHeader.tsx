import React from "react";

import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import { ICommunity } from "../../shared/types/community.interface";
import useCommunityData from "../../hooks/useCommunityData";

type CommunityHeaderProps = {
  communityData: ICommunity;
};

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const { joinOrLeaveCommunity, mySnippets, loading } = useCommunityData();
  const isJoined = !!mySnippets.find(
    (snippet) => snippet.id === communityData.id
  );

  const { currentCommunity } = useAppSelector((state) => state.community);

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {currentCommunity?.imageURL ? (
            <Image
              src={currentCommunity.imageURL}
              alt={communityData.id}
              boxSize="66px"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="full"
              objectFit="cover"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              isLoading={loading}
              onClick={() => {
                joinOrLeaveCommunity(communityData, isJoined);
              }}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default CommunityHeader;
