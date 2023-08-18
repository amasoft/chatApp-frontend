import React, { useEffect, useState } from "react";
// import axios from "axios";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import SideBar from "../Miselinouss/SideBar";
import { Box } from "@chakra-ui/layout";
import MyChat from "../Miselinouss/MyChat";
import ChatBox from "../Miselinouss/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  //state to enable refresh i.e if someome leaves the group so  the the group can upadte to latest list
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
