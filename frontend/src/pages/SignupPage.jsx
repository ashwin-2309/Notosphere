import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // do something with form data, like send to backend
    // send to backend /users/register
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl id='name'>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl id='password2'>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              name='password2'
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Button colorScheme='blue' type='submit'>
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupPage;
