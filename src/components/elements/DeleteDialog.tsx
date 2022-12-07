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

import { useAppSelector } from "../../store/hooks";
import { useActions } from "../../hooks/useActions";

type DeleteDialogProps = {
  title: string;
  onDelete: () => void;
  cancelRef: any;
  loading?: boolean;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  onDelete,
  cancelRef,
  loading,
}) => {
  const { deleteConfirm } = useAppSelector((state) => state.dialog);
  const { hideDeleteConfirm, hideEdit } = useActions();

  const closeConfirm = () => {
    hideEdit();
    hideDeleteConfirm();
  };
  return (
    <AlertDialog
      isOpen={deleteConfirm}
      leastDestructiveRef={cancelRef}
      onClose={closeConfirm}
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
              onClick={closeConfirm}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              bg="red.400"
              height="34px"
              padding="0px 30px"
              _hover={{ bg: "red.600" }}
              onClick={() => {
                onDelete();
                closeConfirm();
              }}
              ml={3}
              isLoading={loading}
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
