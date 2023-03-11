import React from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Homepage/Navbar";
import note from "../assets/notessticky.png";

const Homepage = () => {
  return (
    <Box padding={8}>
      {/* <Navbar /> */}
      <Image
        w={400}
        position='absolute'
        right={0}
        h={600}
        src={note}
        alt='Note'
      />
      <Heading mt={16} textAlign='start' size='4xl'>
        NotoSphere
      </Heading>
      <Text mt={20} maxW={"50%"} textAlign='justify'>
        On our website's homepage, you can easily create, read, update and
        delete notes with just a few clicks! This is made possible thanks to our
        use of the MERN (MongoDB, Express, React and Node.js) stack, which
        provides us with a reliable and powerful framework for building
        responsive web applications. With our note-taking feature, you can
        quickly jot down your thoughts or ideas, and easily access them at any
        time. You can also edit your notes and make changes as needed. And when
        you no longer need a particular note, you can simply delete it, freeing
        up space for new content. Our homepage is designed to be user-friendly
        and easy to navigate, ensuring that even those who are not tech-savvy
        can still make the most of our platform. We've focused heavily on
        creating a responsive design that adapts well to different devices and
        screen sizes, so you can take your notes with you wherever you go.
        Overall, our note-taking feature is an essential tool for anyone who
        needs a quick and easy way to keep track of their thoughts and ideas. By
        leveraging the power of the MERN stack, we've created a reliable and
        robust platform that ensures all of your data remains safe and secure.
      </Text>
    </Box>
  );
};

export default Homepage;
