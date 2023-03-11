// Importing necessary packages from React, Redux, and Chakra-UI
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../Redux/users/user.actions";
import { useSelector } from "react-redux";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  VStack,
} from "@chakra-ui/react";

// Importing an image to use in the login page
import loginImage from "../assets/loginImage.png";

// Defining the LoginPage functional component
const LoginPage = () => {
  // Reading 'auth', 'token', 'loading', and 'error' variables from global userReducer state using the useSelector hook
  const { auth, token, loading, error } = useSelector(
    (state) => state.userReducer
  );

  // Receiving user email and password input through React hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Receiving action dispatch functionalities from the useDispatch nullary function
  const dispatch = useDispatch();

  // Handling login form submission on button click event
  const handleLogin = () => {
    dispatch(
      getUser({
        email,
        password,
      })
    );
  };

  // Setting background colors of the login box, which change when dark mode is on or off
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const bgBoxColor = useColorModeValue("white", "gray.700");

  // Referencing loading and error conditional statements
  if (loading) return <h1 style={{ marginTop: "80px" }}>Loading...</h1>;
  if (error) return <h1 style={{ marginTop: "80px" }}>Error</h1>;

  // Returning the JSX view of the login page
  return (
    <>
      <Flex w={"100%"}>
        <Image wi={"50%"} src={loginImage}></Image>
        <VStack w={"50%"}>
          <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              {/* Login prompt */}
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool{" "}
                  <Link color={"blue.400"}>features</Link>
                </Text>
              </Stack>

              {/* Login box */}
              <Box rounded={"lg"} bg={bgBoxColor} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  {/* Email input field */}
                  <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                    />
                  </FormControl>

                  {/* Password input field */}
                  <FormControl id='password'>
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                    />
                  </FormControl>

                  <Stack spacing={10}>
                    {/* Remember me checkbox and forgot password link */}
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.400"}>Forgot password?</Link>
                    </Stack>

                    {/* Login submit button */}
                    <Button
                      onClick={handleLogin}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

// Exporting the LoginPage component
export default LoginPage;
