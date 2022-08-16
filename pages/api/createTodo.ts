import client from "./_client";
import getPriorityId from "./getPriorityId";

const createTodo = async (
  idUser: number,
  title: string,
  description: string,
  status: string,
  priority: string,
  priorityColor: string
) => {
  const priorityId = await getPriorityId(idUser, priority, priorityColor);
  if (!priorityId) {
    console.log("priorityId not found");
  } else {
    const response = await client.post("/createTodo", {
      idUser: idUser,
      title: title,
      description: description,
      status: status,
      priority: priorityId,
    });
    if (response.status != 200) {
      throw new Error("Error creating todo");
    } else {
      return response.data;
    }
  }
};

export default createTodo;
