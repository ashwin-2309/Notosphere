import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen } = useDisclosure();
  const nav = useNavigate();
  return (
    <Box bg='#7289da' px={4}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        <Box
          fontWeight={"bold"}
          fontSize={"2xl"}
          onClick={() => nav("/")}
          // add a cursor pointer
          cursor='pointer'
          // add a hover effect and underline and make the button size bigger

          _hover={{
            textDecoration: "underline",
            transform: "scale(1.1)",
          }}
        >
          Notosphere
        </Box>

        <Flex alignItems='center'>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={() => nav("/notes")}>All Notes</Button>
            <Button onClick={() => nav("/login")}>Login</Button>
            <Button onClick={() => nav("/register")}>Sign Up</Button>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Stack />
            <Menu>
              <MenuButton
                as={Avatar}
                size='sm'
                src={"https://avatars.dicebear.com/api/male/username.svg"}
                rounded='full'
                variant='link'
                cursor='pointer'
                minW={0}
              />
              <MenuList alignItems='center'>
                <Avatar
                  size='2xl'
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />

                <p>Username</p>

                <MenuDivider />

                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
