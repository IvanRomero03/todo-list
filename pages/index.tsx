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
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/sign");
    } else {
      setUsername(user);
      setIdUser(localStorage.getItem("idUser"));
    }
  }, []);

  const handleCreateTodo = async (todo: Todo) => {
    const response = await createTodo(
      Number(idUser),
      todo.title,
      todo.description,
      todo.status,
      todo.priority,
      todo.priorityColor
    );
    return { priority: todo.priority, status: todo.status };
  };

  const { data, isLoading, isError } = useQuery(
    "usersPrioritiesIds" + idUser,
    async () => await getUsersPrioritiesIds(Number(idUser))
  );

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
        {orderMode === OrderMode.status ? (
          statusArray.map((status) => (
            <VerticalTodoStack
              status={status}
              idUser={Number(idUser)}
              key={idUser + " " + status}
            />
          ))
        ) : (
          <>
            {data?.map((priority) => (
              <VerticalPriorityTodoStack
                idPriority={priority.idPriority}
                priority={priority.priority}
                priorityColor={priority.priorityColor}
                idUser={Number(idUser)}
                key={idUser + " " + priority.idPriority}
              />
            ))}
          </>
        )}
      </HStack>
    </>
  );
}
