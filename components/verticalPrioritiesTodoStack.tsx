import { VStack, Container, Badge } from "@chakra-ui/react";
import TodoBox from "./TodoBox";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Todo } from "../types/todo";
import getTodosByPriority from "../pages/api/getTodosByPriority";

type Props = {
  idUser: number;
  idPriority: number;
  priority: string;
  priorityColor: string;
};

const VerticalPriorityTodoStack = ({
  idUser,
  idPriority,
  priority,
  priorityColor,
}: Props) => {
  const { data, isLoading, isError } = useQuery(
    "todos " + priority,
    async () => await getTodosByPriority(idUser, idPriority)
  );

  const todos = data ? data : [];

  return (
    <VStack minH="100%" minW="25%" spacing={8} maxW="30%" ml="2.5%">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Badge colorScheme={priorityColor}>{priority}</Badge>
          {todos.map((todo) => (
            <TodoBox key={todo.id} idTodo={todo.idTodo} idUser={idUser} />
          ))}
        </>
      )}
    </VStack>
  );
};

export default VerticalPriorityTodoStack;
