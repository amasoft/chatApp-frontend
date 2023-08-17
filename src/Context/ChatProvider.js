import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();
const Chatprovider = ({ children }) => {
  const [user, setUser] = useState();
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [SelectedChat, setSelectedChat] = useState(); //to store the seelcted user for chatting
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const history = useHistory();
  useEffect(() => {
    // console.log("my hisroty", history);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log("userinfor", userInfo);
    if (!userInfo) {
      // history.push("/login");
      return;
      //  <Redire to="/login" />;
    }
    setUser(userInfo);
  }, [history]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        SelectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        onlineStatus,
        setOnlineStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default Chatprovider;
