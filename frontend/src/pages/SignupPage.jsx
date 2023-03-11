import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const { auth, token, loading, error } = useSelector(
    (state) => state.userReducer
  );

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    let data = await axios.post(BASE_URL + "/user/register", {
      name,
      email,
      password,
    });
    let { message, status } = data.data;
    if (status === 1) {
      alert(message);
      nav("/login");
    } else {
      alert(message);
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const bgBoxColor = useColorModeValue("white", "gray.700");

  return (
    <Box minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
      <Box w='70%'>
        <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up with Notosphere
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features
            </Text>
          </Stack>

          <Box rounded={"lg"} bg={bgBoxColor} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input type='text' onChange={handleNameChange} value={name} />
              </FormControl>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  onChange={handleEmailChange}
                  value={email}
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    value={password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSignup}
                  size='lg'
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"blue.400"} onClick={() => nav("/login")}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
