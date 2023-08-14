export const getSender = (loggedUser, users) => {
  // if users of 0 id is logged in user return the second [eron else return the first on   sinc e it only  2 users er chat]
  // console.log(2, JSON.stringify(loggedUser._id));
  // console.log(
  //   "getsender" + users[0]._id === loggedUser.data._id
  //     ? users[1].name
  //     : users[0].name
  // );
  return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name;
};

// look into data fomat for loggedUser
export const getSender_singleChat = (loggedUser, users) => {
  // if users of 0 id is logged in user return the second [eron else return the first on   sinc e it only  2 users er chat]
  // console.log(2, JSON.stringify(loggedUser._id));
  // console.log(
  //   "getsender" + users[0]._id === loggedUser._id
  //     ? users[1].name
  //     : users[0].name
  // );
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser, users) => {
  // if users of 0 id is logged in user return the second [eron else return the first on   sinc e it only  2 users er chat]
  // console.log("full", JSON.stringify(users));
  // console.log(
  //   "getsenderfull",
  //   users[0]._id === loggedUser._id ? users[1] : users[0]
  // );
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  console.log("catlogic", JSON.stringify(messages));

  return (
    i < messages.length - 1 && //if it the last message
    (messages[i + 1].sender.id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 && //if it the last message
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 && //if it the last message
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
