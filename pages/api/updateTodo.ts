import client from "./_client";
import getPriorityId from "./getPriorityId";

const updateTodo = async (
  idUser: number,
  idTodo: number,
  title: string,
  description: string,
  status: string,
  priority: string,
  priorityColor: string
) => {
  const priorityId = await getPriorityId(idUser, priority, priorityColor);

  const response = await client.post("/updateTodo", {
    idUser: idUser,
    idTodo: idTodo,
    title: title,
    description: description,
    status: status,
    priority: priorityId,
  });
  if (response.status != 200) {
    throw new Error("Error updating todo");
  } else {
    console.log(response.data);
    return response.data;
  }
};

export default updateTodo;
