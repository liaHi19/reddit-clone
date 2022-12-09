import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/router";

import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

import { validateString } from "../../../helpers/validation";
import { useAuth } from "../../../firebase/useAuth";
import { createDocWithSubCollection } from "../../../firebase/firestore-helpers";

import CommunityCheckbox from "./CommunityCheckbox";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../store/hooks";

type CreateCommunityModalProps = {
  open: boolean;
  onClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  onClose,
}) => {
  const { user } = useAuth();
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toggleMenuItem } = useActions();
  const { isOpen } = useAppSelector((state) => state.directory);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 21) return;

    setCommunityName(value);
    setCharRemaining(21 - value.length);

    validateString(value) || value.length < 3
      ? setError(
          "Community names must be between 3-21 characters, and only can contain letters, numbers and underscores"
        )
      : setError("");
  };

  const handleCommunityType = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");

    //create data information
    const errorMsg = `Sorry, /r${communityName} is taken. Try another.`;
    const data = {
      creatorId: user?.uid,
      createdAt: moment().format(),
      numberOfMembers: 1,
      privacyType: communityType,
    };
    const subdata = { isModerator: true };

    setLoading(true);
    try {
      await createDocWithSubCollection(
        {
          collectionName: "communities",
          docId: communityName,
          errorMsg,
          data,
        },
        {
          mainCollectionName: "users",
          mainDocId: user?.uid,
          subCollectionName: "communitySnippets",
          subId: communityName,
          subdata,
        }
      );
      setLoading(false);
      onClose();
      toggleMenuItem();
      router.push(`r/${communityName}`);
      setCommunityName("");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const onCloseModal = () => {
    onClose();
    if (isOpen) {
      toggleMenuItem();
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create a Community
        </ModalHeader>
        <Box pr={3} pl={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0">
            <Text fontSize={15} fontWeight={600}>
              Name
            </Text>
            <Text fontSize={11} color="gray.600">
              Community names including capitalization cannot be changed
            </Text>
            <Text
              position="relative"
              top="28px"
              left="10px"
              width="20px"
              color="gray.400"
            >
              r/
            </Text>
            <Input
              value={communityName}
              onChange={handleChange}
              size="sm"
              pl="22px"
              position="relative"
            />
            <Text
              fontSize="9pt"
              color={charRemaining === 0 ? "red" : "gray.500"}
            >
              {charRemaining} Characters remaining
            </Text>
            {error && (
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
            )}
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>
              <Stack spacing={2}>
                <CommunityCheckbox
                  communityStatus="public"
                  communityType={communityType}
                  handleCommunityType={handleCommunityType}
                  text="Anyone can view, post, and comment to this community"
                  icon={BsFillPersonFill}
                />
                <CommunityCheckbox
                  communityStatus="restricted"
                  communityType={communityType}
                  handleCommunityType={handleCommunityType}
                  text="Anyone can view  this community, but only approved users can post"
                  icon={BsFillEyeFill}
                />
                <CommunityCheckbox
                  communityStatus="private"
                  communityType={communityType}
                  handleCommunityType={handleCommunityType}
                  text="Only approved users can submit to this community"
                  icon={HiLockClosed}
                />
              </Stack>
            </Box>
          </ModalBody>
        </Box>

        <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
          <Button variant="outline" height="30px" mr={3} onClick={onCloseModal}>
            Cancel
          </Button>
          <Button
            height="30px"
            disabled={!!error || communityName.length < 3}
            onClick={handleCreateCommunity}
            isLoading={loading}
          >
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
