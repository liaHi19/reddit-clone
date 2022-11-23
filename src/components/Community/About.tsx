import React, { useRef } from "react";
import moment from "moment";
import Link from "next/link";

import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";

import { useAuth } from "../../firebase/useAuth";
import useSelectFile from "../../hooks/useSelectFile";
import { ICommunity } from "../../shared/types/community.interface";
import { FaReddit } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import { useActions } from "../../hooks/useActions";

type AboutProps = {
  communityData: ICommunity;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const { user } = useAuth();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, onSelectFile } = useSelectFile();
  const { uploadingImage } = useAppSelector((state) => state.community);
  const { updateImageOfCommunity } = useActions();

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers?.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            <Text>
              Created {moment(communityData.createdAt).format("MMM DD, YYYY")}
            </Text>
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button height="30px" mt={3}>
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    transition="all 0.3s ease-in-out"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.imageURL}
                      borderRadius="full"
                      boxSize="40px"
                      objectFit="cover"
                      alt="Community Image"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color="brand.100"
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Flex align="center" justify="center">
                      <Spinner />
                    </Flex>
                  ) : (
                    <Button
                      height="28px"
                      mt={3}
                      onClick={() => {
                        updateImageOfCommunity({
                          id: communityData.id,
                          file: selectedFile,
                          fileName: "imageURL",
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  ))}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
