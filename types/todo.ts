import { BadgeProps } from "@chakra-ui/react";
export type Todo = {
  idTodo: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  priorityColor: BadgeProps["colorScheme"];
};
export const defaultTodo = (): Todo => {
  return {
    idTodo: 1,
    title: "To-Do",
    description: "loading...",
    status: "On-going",
    priority: "loading",
    priorityColor: "red",
  };
};
