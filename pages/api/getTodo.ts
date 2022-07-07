import axios from "axios";
import { Todo } from "../../types/todo";

export const getTodo = async (idTodo: number) => {
  const response = await axios.post(`http://localhost:3000/api/getTodo`, {
    idTodo,
  });
  const returnData: Todo = response.data;
  return returnData;
};

export default async function handler(req, res) {
  const idTodo = req.body.idTodo ?? 1;
  const todo: Todo = {
    idTodo: idTodo,
    title: "To-Do",
    description: "Description",
    priority: "low",
    priorityColor: "green",
    status: "todo",
  };
  res.status(200).json(todo);
}
