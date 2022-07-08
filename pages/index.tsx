import {
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  VStack,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Header from "../components/header";
import HowToUse from "../components/HowToUse";
import TodoBox from "../components/TodoBox";
import TopLeft from "../components/TopLeft";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import EditTodo from "../components/EditTodo";

export default function Home() {
  const handleOnCreate = () => {
    console.log("create");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditTodo onClose={onClose} />
      </Modal>
      <Header title="To-Do" />
      <TopLeft username={"Ivansin"} />
      <HowToUse />
      <Flex maxW="80%">
        <Spacer w="80%" />
        <IconButton
          icon={<AddIcon onClick={onOpen} />}
          variant="outline"
          aria-label="Options"
        />
      </Flex>
      <VStack textAlign="center" minH="100%" mt="5%" spacing={8}>
        <TodoBox />
      </VStack>
    </>
  );
}
