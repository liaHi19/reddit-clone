import React, { ChangeEvent, useRef } from "react";

import { Flex, Button, Image, Stack } from "@chakra-ui/react";

type ImageUploadProps = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: string;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSelectFile,
  selectedFile,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const backToPost = () => {
    setSelectedTab("Post");
  };

  const resetSelectedFile = () => {
    setSelectedFile("");
  };
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            alt="Post Image"
            maxHeight="400px"
            maxWidth="400px"
          />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={backToPost}>
              Back to Post
            </Button>
            <Button height="28px" variant="outline" onClick={resetSelectedFile}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.200"
          width="100%"
          borderRadius={4}
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => {
              selectedFileRef.current?.click();
            }}
          >
            Upload
          </Button>
          <input
            name="image"
            type="file"
            ref={selectedFileRef}
            onChange={onSelectFile}
            hidden
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
