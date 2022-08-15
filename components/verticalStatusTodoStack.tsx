import { VStack, Container, Badge } from "@chakra-ui/react";
import TodoBox from "./TodoBox";
import React from "react";
import { useQuery } from "react-query";
import { Todo } from "../types/todo";
import getTodosByStatus from "../pages/api/getTodosByStatus";

type Props = {
  idUser: number;
  status: string;
};

const VerticalTodoStack = ({ idUser, status }: Props) => {
  const { data, isLoading, isError } = useQuery(
    "todos" + status,
    async () => await getTodosByStatus(idUser, status)
  );

  const todos = data ? data : ([] as Todo[]);

  return (
    <VStack minH="100%" minW="25%" spacing={8} maxW="30%" ml="2.5%">
      <Badge>{status}</Badge>
      {todos.map((todo) => (
        <TodoBox key={todo.id} idTodo={todo.idTodo} idUser={idUser} />
      ))}
    </VStack>
  );
};

export default VerticalTodoStack;
