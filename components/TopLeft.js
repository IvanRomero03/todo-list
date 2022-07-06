import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {
  Text,
  Container,
  HStack,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";

export const TopLeft = ({ username }) => {
  const usernameText = username ? username + "'s" : "";
  return (
    <Container mt="2%" alignContent={"left"} maxW="90%">
      <HStack spacing="4" alignContent={"center"}>
        <ColorModeSwitcher />
        <Heading>{usernameText} To-Do</Heading>
        <FaHamburger />
      </HStack>
    </Container>
  );
};
