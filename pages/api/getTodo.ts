import { Todo } from "../../types/todo";
import client from "./_client";

const getTodo = async (id: number) => {
  if (!id) {
    console.error("No id provided");
    return null;
  }
  const response = await client.post(`/getTodo`, { idTodo: id });
  if (response.status != 200) {
    throw new Error("Error getting todo");
  } else {
    return response.data;
  }
};
export default getTodo;
