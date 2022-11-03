import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

type DeleteDialogProps = {
  title: string;
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
  cancelRef: any;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  isOpen,
  onDelete,
  onClose,
  cancelRef,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              variant="outline"
              height="34px"
              padding="0px 30px"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              bg="red.400"
              height="34px"
              padding="0px 30px"
              _hover={{ bg: "red.600" }}
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default DeleteDialog;
