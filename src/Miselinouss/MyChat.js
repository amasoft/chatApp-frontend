import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../config/Chatslogic";
import ChatLoading from "./ChatLoading";
import GroupChatModel from "./GroupChatModel";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setloggedUser] = useState();
  const { SelectedChat, setSelectedChat, chats, user, setChats, set } =
    ChatState();
  const inf = JSON.parse(localStorage.getItem("userInfo"));
  console.log("loggedUser");
  console.log(loggedUser);

  const toast = useToast();
  const fetchChats = async () => {
    try {
      // setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/chat`,
        config
      );
      console.log("all chats", JSON.stringify(data));
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: "Failed to load the chats results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]); // so if there is any

  return (
    <Box
      // display={{ base: setSelectedChat ? "none" : "flex", md: "flex" }}
      display={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My chats
        <GroupChatModel>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New group chat
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={SelectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                // bg={SelectedChat === chat ? "red" : "#E8E8E8"}
                color={SelectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;