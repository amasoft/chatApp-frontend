import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import {
  getSender,
  getSender_singleChat,
  getSenderFull,
} from "../config/Chatslogic";
import ProfileModel from "../Miselinouss/ProfileModel";
import UpdateGroupChatModal from "../Miselinouss/UpdateGroupChatModal";
// import { profileModel } from "./Miselinouss/profileModel";
// import { ProfileModel } from "../Miselinouss/ProfileModel";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, SelectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {" "}
      {SelectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            display="flex"
            w="100%"
            px={2}
            pb={3}
            alignItems="center"
            fontFamily="Work sans"
            justifyContent={{ base: "space-between" }}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!SelectedChat.isGroupChat ? (
              // <>{getSender(user, SelectedChat.users)}</>
              <>
                {getSender_singleChat(user, SelectedChat.users)}
                <ProfileModel user={getSenderFull(user, SelectedChat.users)} />
              </>
            ) : (
              <>
                {SelectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          Click on a User to start chatting
        </Box>
      )}
    </>
  );
};

export default SingleChat;
