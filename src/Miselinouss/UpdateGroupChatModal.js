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
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import UserBadgeItem from "../Components/UserAvater/UserBadgeItem";
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setgroupChatName] = useState();
  const [search, setsearch] = useState();
  const [searchResult, setsearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [reanameLoading, setreanameLoading] = useState(false);
  const { SelectedChat, setSelectedChat, user } = ChatState();

  console.log("upgro" + JSON.stringify(SelectedChat.users));

  const toast = useToast();
  const handleRemove = () => {};
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
  const handleSearch = () => {};
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
                placeholder="Ad User to the group "
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
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
