export const getSender = (loggedUser, users) => {
  // if users of 0 id is logged in user return the second [eron else return the first on   sinc e it only  2 users er chat]
  console.log(2, JSON.stringify(loggedUser._id));
  console.log(
    "getsender" + users[0]._id === loggedUser.data._id
      ? users[1].name
      : users[0].name
  );
  return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name;
};

// look into data fomat for loggedUser
export const getSender_singleChat = (loggedUser, users) => {
  // if users of 0 id is logged in user return the second [eron else return the first on   sinc e it only  2 users er chat]
  console.log(2, JSON.stringify(loggedUser._id));
  console.log(
    "getsender" + users[0]._id === loggedUser._id
      ? users[1].name
      : users[0].name
  );
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser, users) => {
  // if users of 0 id is logged in user return the second [eron else return the first on   sinc e it only  2 users er chat]
  console.log("full", JSON.stringify(users));
  console.log(
    "getsenderfull",
    users[0]._id === loggedUser._id ? users[1] : users[0]
  );
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
