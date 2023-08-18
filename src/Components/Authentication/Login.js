import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (!name || !email || !password || !confirmPassword) {
    if (!email || !password) {
      toast({
        title: "please Fill all the field ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   const data = await axios.post(
    //     "http://localhost:5000/api/user/login",
    //     // { name: "name", email: "email", password: "password" },
    //     { email, password },
    //     config
    //   );
    //   toast({
    //     title: "Login Succesfull ",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top",
    //     isClosable: true,
    //   });
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setLoading(false);
    //   history.push("/chats");
    //   console.log("data details");
    //   console.log(data);
    // } catch (error) {
    //   toast({
    //     title: "Error Occured",
    //     description: error,
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    // }
    await axios
      .post(
        "/api/user/login",
        // { name: "name", email: "email", password: "password" },
        { email, password },
        config
      )
      .then((res) => {
        console.log("new login", res);
        toast({
          title: "Login Succesfull ",
          // description: err.response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        // setUser(res.data);
        setLoading(false);
        history.push("/chats");
        console.log("data details");
      })
      .catch((err) => {
        console.log("new login errr", err.response.data.message);
        toast({
          title: "Error Occured",
          description: err.response.data.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        varient="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          console.log("clicjrdrg");
          setEmail("amadi");
          setpassword("1234567");
        }}
      >
        Get users Credentials
      </Button>
    </VStack>
  );
};

export default Login;
