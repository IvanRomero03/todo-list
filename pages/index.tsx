import {
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  VStack,
  Modal,
  useDisclosure,
  Select,
  Divider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Header from "../components/header";
import HowToUse from "../components/HowToUse";
import TodoBox from "../components/TodoBox";
import TopLeft from "../components/TopLeft";
import React, { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import EditTodo from "../components/EditTodo";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleOnCreate = () => {
    console.log("create");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState(
    localStorage.getItem("user") || null
  );
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser") || null);

  useEffect(() => {
    if (username) {
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditTodo onClose={onClose} onDelete={() => {}} onSubmit={() => {}} />
      </Modal>
      <Header title="To-Do" />
      <TopLeft username={username} />
      <HowToUse />
      <Divider mt="1%" mb="1%" />
      <Flex maxW="80%">
        <Spacer maxW="17.5%" />
        <Select w="10%" placeholder="SortBy: ">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
        <Spacer w="80%" />
        <IconButton
          icon={<AddIcon />}
          variant="outline"
          aria-label="Options"
          onClick={onOpen}
        />
      </Flex>
      <VStack textAlign="center" minH="100%" mt="5%" spacing={8}>
        <TodoBox />
      </VStack>
    </>
  );
}
