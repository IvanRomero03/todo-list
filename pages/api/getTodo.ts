import axios from "axios";

type Todo = {
  idTodo: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  priorityColor: string;
};

export const getTodo = async (idTodo: number) => {
  const response = await axios.post(`http://localhost:3000/api/getTodo`, {
    idTodo,
  });
  const returnData: Todo = response.data;
  return returnData
};

export default async function handler(req, res) {
  const idTodo = req.body.idTodo ?? 1;
  const todo: Todo = {
    idTodo: idTodo,
    title: "To-Do",
    description: "Description",
    priority: "high",
    priorityColor: "green",
    status: "todo",
  };
  console.log(req.body);
  res.status(200).json(todo);
}
