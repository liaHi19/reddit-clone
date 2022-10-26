import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Icon } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

import { User } from "firebase/auth";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { IPost, IPostInput } from "../../../shared/types/posts.interface";
import { postSchema } from "../../../helpers/postSchema";

import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";
import TabItem from "../TabItem";
import { createDocAndSaveFile } from "../../../firebase/firestore-helpers";

export interface ITabItem {
  title: string;
  icon: typeof Icon.arguments;
}

const formTabs: ITabItem[] = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images & Video", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];
type NewPostFormProps = {
  user: User;
};
const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, formState, reset } = useForm<IPostInput>({
    mode: "onChange",
    resolver: yupResolver(postSchema),
  });

  const handleCreatePost: SubmitHandler<IPostInput> = async (data) => {
    const { title, body } = data;
    const communityId = router.query.id as string;

    //form newPost
    const newPost: IPost = {
      communityId,
      creatorId: user.uid,
      creatorDisplayName: user.displayName
        ? user.displayName
        : user.email!.split("0")[0],
      title,
      body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      await createDocAndSaveFile(
        { collectionName: "posts", data: newPost },
        selectedFile,
        "imageURL"
      );
      reset();
      setLoading(false);
    } catch (error) {
      toast.error("Can't create a post");
      setLoading(false);
    }
    // router.back()
  };

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target?.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((formTab) => (
          <TabItem
            key={formTab.title}
            icon={formTab}
            selected={formTab.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            register={register}
            handleSubmit={handleSubmit}
            formState={formState}
            loading={loading}
            handleCreatePost={handleCreatePost}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
