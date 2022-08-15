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
  Code,
  HStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Header from "../components/header";
import HowToUse from "../components/HowToUse";
import TodoBox from "../components/TodoBox";
import TopLeft from "../components/TopLeft";

import React, { useEffect, useState } from "react";

import { AddIcon } from "@chakra-ui/icons";
import EditTodo from "../components/EditTodo";
import createTodo from "./api/createTodo";
import { useRouter } from "next/router";
import { Todo } from "../types/todo";
import VerticalTodoStack from "../components/verticalStatusTodoStack";
import VerticalPriorityTodoStack from "../components/verticalPrioritiesTodoStack";
import { Status } from "../types/status";
import getUsersPrioritiesIds from "./api/getUsersPrioritiesIds";
import { useQuery } from "react-query";

export default function Home() {
  const router = useRouter();
  const handleOnCreate = () => {
    console.log("create");
  };
  const statusArray = Object.values(Status);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState("");
  const [idUser, setIdUser] = useState("");

  enum OrderMode {
    status = "status",
    priority = "priority",
  }
  const [orderMode, setOrderMode] = useState<OrderMode>(OrderMode.status);

  useEffect(() => {
    setUsername(localStorage.getItem("user"));
    setIdUser(localStorage.getItem("idUser"));
    if (!username) {
      router.push("/sign");
    }
  }, []);

  const handleCreateTodo = async (todo: Todo) => {
    console.log(todo, "creating");
    const response = await createTodo(
      Number(idUser),
      todo.title,
      todo.description,
      todo.status,
      todo.priority,
      todo.priorityColor
    );
    console.log(response);
  };

  const { data, isLoading, isError } = useQuery(
    "usersPrioritiesIds" + idUser,
    async () => await getUsersPrioritiesIds(Number(idUser))
  );
  const prioritiesArray = data ? data : [];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditTodo
          onClose={onClose}
          onDelete={() => {}}
          onSubmit={handleCreateTodo}
          idUser={Number(idUser)}
        />
      </Modal>
      <Header title="To-Do" />
      <TopLeft username={username} />
      <HowToUse />
      <Divider mt="1%" mb="1%" minW="100%" maxW="300%" />
      <Flex maxW="80%">
        <Spacer maxW="17.5%" />
        <VStack spacing="4" alignContent={"left"}>
          <Code>Order By: </Code>
          <Select
            defaultValue={OrderMode.status}
            onChange={(v) => {
              setOrderMode(v.target.value as OrderMode);
            }}
          >
            <option value={OrderMode.priority}>Priority</option>
            <option value={OrderMode.status}>Status</option>
          </Select>
        </VStack>
        <Spacer w="80%" />
        <IconButton
          icon={<AddIcon />}
          variant="outline"
          aria-label="Options"
          onClick={onOpen}
        />
      </Flex>
      <HStack mt="2%" spacing={6} alignItems="flex-start">
        {orderMode === OrderMode.status
          ? statusArray.map((status) => (
              <VerticalTodoStack
                status={status}
                idUser={Number(idUser)}
                key={idUser + " " + status}
              />
            ))
          : prioritiesArray.map(({ idPriority, priority, priorityColor }) => (
              <VerticalPriorityTodoStack
                idPriority={idPriority}
                priority={priority}
                priorityColor={priorityColor}
                idUser={Number(idUser)}
                key={idUser + " " + idPriority}
              />
            ))}
      </HStack>
    </>
  );
}
