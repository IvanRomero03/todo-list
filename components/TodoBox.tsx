import React, { useEffect } from "react";
import {
  Box,
  Button,
  Badge,
  VStack,
  Text,
  Heading,
  HStack,
  Container,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import getTodo from "../pages/api/getTodo";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Todo, defaultTodo } from "../types/todo";
import { EditIcon } from "@chakra-ui/icons";
import EditTodo from "./EditTodo";
import updateTodo from "../pages/api/updateTodo";
import deleteTodo from "../pages/api/deleteTodo";

type Props = {
  idTodo: number;
  idUser: number;
};

const TodoBox = ({ idTodo, idUser }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isError } = useQuery(
    "todo" + idTodo,
    async () => await getTodo(idTodo)
  );

  const onEdit = async (values) => {
    const response = await updateTodo(
      idUser,
      idTodo,
      values.title,
      values.description,
      values.status,
      values.priority,
      values.priorityColor
    );
    return { priority: values.priority, status: values.status };
  };
  const defaultTodoObject = defaultTodo();
  const { description, priority, priorityColor, status, title } = data
    ? data.lenght != 1
      ? data[0]
      : defaultTodoObject
    : defaultTodoObject;

  const queryClient = useQueryClient();

  const onDelete = async () => {
    const response = await deleteTodo(idUser, idTodo);
    return { priority: priority, status: status };
  };

  const { mutate } = useMutation(onDelete, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos " + data.priority);
      queryClient.invalidateQueries("todos" + data.status);
      queryClient.invalidateQueries("usersPrioritiesIds");
    },
  });

  const handleOnDelete = () => {
    //destroy this component

    mutate();
    // destroy the todo
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditTodo
          idTodo={idTodo}
          onClose={onClose}
          onDelete={handleOnDelete}
          onSubmit={onEdit}
          idUser={idUser}
        />
      </Modal>
      <Box
        mt="2%"
        alignContent={"left"}
        maxW="100%"
        borderWidth={"2px"}
        borderRadius="lg"
      >
        <VStack spacing="4" alignContent={"left"} m="6">
          <HStack spacing="4">
            <Container alignContent={"center"}>
              <Badge colorScheme={priorityColor}>
                <Box m="1.5">
                  <Text>{priority}</Text>
                </Box>
              </Badge>
            </Container>
            <Container alignContent={"Right"}>
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                onClick={onOpen}
              >
                <EditIcon />
              </Button>
            </Container>
          </HStack>
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          <Text textAlign={"justify"}>{description}</Text>
          <Badge colorScheme="gray">{status}</Badge>
        </VStack>
      </Box>
    </>
  );
};

export default TodoBox;
