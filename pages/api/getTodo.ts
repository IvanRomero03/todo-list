import { Todo } from "../../types/todo";
import client from "./_client";

const getTodo = async (id: number) => {
  if (!id) {
    console.error("No id provided");
    return null;
    throw new Error("No id provided");
  }
  const response = await client.post(`/getTodo`, { idTodo: id });
  if (response.status != 200) {
    throw new Error("Error getting todo");
  } else {
    console.log(response.data);
    return response.data;
  }
};
export default getTodo;
