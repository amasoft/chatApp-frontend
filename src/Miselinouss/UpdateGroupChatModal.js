import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import UserBadgeItem from "../Components/UserAvater/UserBadgeItem";
import axios from "axios";
import UserListItem from "../Components/UserAvater/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setgroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [reanameLoading, setreanameLoading] = useState(false);
  const { SelectedChat, setSelectedChat, setChats, user } = ChatState();
  console.log("upgro" + JSON.stringify(SelectedChat.users));

  const toast = useToast();
  const handleRemove = async (user1) => {
    //    user who logined is not eql to user who want to remove
    if (SelectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove some one",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupremove`,
        {
          chatId: SelectedChat._id,
          userId: user1._id,
        },
        config
      );
      //   if the group admin releft the group he wont see the group again
      if (user1._id === user._id) {
        setSelectedChat();
        setChats();
      } else {
        setSelectedChat(data);
      }
      // const check =
      // user1._id == user._id ? setSelectedChat() : setSelectedChat(data);
      // var params = {
      //   user1: user1._id,
      //   user: user._id,
      //   chat: JSON.stringify(SelectedChat),
      // };
      // console.log("params", params);
      // console.log("check", check);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const handlRename = async () => {
    if (!groupChatName) return;
    setreanameLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      "http://localhost:5000/api/chat/rename",
      {
        chatId: SelectedChat._id,
        chatName: groupChatName,
      },
      config
    );

    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    setreanameLoading(false);
    try {
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleSearch = async () => {
    // setSearch(query);
    console.log("search v2+" + search);
    // if (!query) {
    //   return;
    // }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      console.log(3, data);
      setLoading(false);
      setsearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleAddUser = async (user1) => {
    if (SelectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in Group ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (SelectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add Someone",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupadd`,
        {
          chatId: SelectedChat._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="Work sans"
            fontSize="35px"
            display="flex"
            justifyContent="center"
          >
            {SelectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {SelectedChat.users.map((u) => {
                return (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleRemove(u)}
                  />
                );
              })}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setgroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={reanameLoading}
                onClick={handlRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to the group "
                mb={1}
                value={search}
                onChange={(e) => {
                  handleSearch();
                  setSearch(e.target.value);
                }}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user.id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleRemove(user);
              }}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
