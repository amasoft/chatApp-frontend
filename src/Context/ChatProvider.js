import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();
const Chatprovider = ({ children }) => {
  const [user, setUser] = useState();
  const [SelectedChat, setSelectedChat] = useState(); //to store the seelcted user for chatting
  const [chats, setChats] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo.data);
    if (!userInfo) {
      history.push("/login");
    }
  }, [history]);
  return (
    <ChatContext.Provider
      value={{ user, setUser, SelectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default Chatprovider;
