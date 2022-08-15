import client from "./_client";

const createPriority = async (
  idUser: number,
  priority: string,
  priorityColor: string
) => {
  const response = await client.post("/createPriority", {
    idUser: idUser,
    priority: priority,
    priorityColor: priorityColor,
  });
  if (response.status != 200) {
    throw new Error("Error creating priority");
  } else {
    return response.data;
  }
};
export default createPriority;
