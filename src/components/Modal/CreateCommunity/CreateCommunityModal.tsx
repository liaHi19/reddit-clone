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

import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

import CommunityCheckbox from "./CommunityCheckbox";

type CreateCommunityModalProps = {
  open: boolean;
  onClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  onClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 21) return;
    setCommunityName(value);
    setCharRemaining(21 - value.length);
  };
  const handleCommunityType = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
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
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>
              {/* CheckBox */}
              <Stack spacing={2}>
                <CommunityCheckbox
                  communityName="public"
                  communityType={communityType}
                  handleCommunityType={handleCommunityType}
                  text="Anyone can view, post, and comment to this community"
                  icon={BsFillPersonFill}
                />
                <CommunityCheckbox
                  communityName="restricted"
                  communityType={communityType}
                  handleCommunityType={handleCommunityType}
                  text="Anyone can view  this community, but only approved users can post"
                  icon={BsFillEyeFill}
                />
                <CommunityCheckbox
                  communityName="private"
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
          <Button variant="outline" height="30px" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button height="30px" disabled={communityName.length < 3}>
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
