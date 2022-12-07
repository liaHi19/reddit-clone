import React, { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";

import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../store/hooks";

type ModalDialogProps = {
  modalHeader: string;
  modalBody: ReactNode;
};

const ModalDialog: React.FC<ModalDialogProps> = ({
  modalHeader,
  modalBody,
}) => {
  const { modalOpen } = useAppSelector((state) => state.dialog);
  const { hideModal, hideEdit } = useActions();

  const closeModal = () => {
    hideEdit();
    hideModal();
  };

  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pb={6}
        >
          <Flex direction="column" align="center" justify="center" width="90%">
            {modalBody}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ModalDialog;
