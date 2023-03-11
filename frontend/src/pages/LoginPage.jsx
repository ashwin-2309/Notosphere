import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/users/user.actions";
import { useNavigate } from "react-router-dom";
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
import loginImage from "../assets/loginImage.png";

const LoginPage = () => {
  const nav = useNavigate();
  const { auth, token, loading, error } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // problem is coming here
  const handleLogin = () => {
    console.log(email, password);
    dispatch(getUser({ email, password }));
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const bgBoxColor = useColorModeValue("white", "gray.700");

  if (loading)
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
        <Text>Loading user data...</Text>
      </Flex>
    );

  if (error)
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
        <Text>Error logging in: {error}</Text>
      </Flex>
    );

  return (
    <>
      <Flex w={"100%"}>
        <Image wi={"50%"} src={loginImage}></Image>
        <VStack w={"50%"}>
          <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool{" "}
                  <Link color={"blue.400"}>features</Link>
                </Text>
              </Stack>

              <Box rounded={"lg"} bg={bgBoxColor} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                    />
                  </FormControl>

                  <FormControl id='password'>
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                    />
                  </FormControl>

                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.400"}>Forgot password?</Link>
                    </Stack>

                    <Button
                      onClick={handleLogin}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      disabled={loading}
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

export default LoginPage;
