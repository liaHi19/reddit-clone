import React, { useState } from "react";
import { Flex, Icon } from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";

import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPostInput } from "../../shared/types/posts.interface";
import { postSchema } from "../../helpers/postSchema";
import TextInputs from "./PostForm/TextInputs";

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

const NewPostForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm<IPostInput>({
    mode: "onChange",
    resolver: yupResolver(postSchema),
  });

  const handleCreatePost: SubmitHandler<IPostInput> = (data) => {
    console.log(data);
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
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
