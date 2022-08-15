import client from "./_client";

const getPriorityId = async (
  idUser: number,
  priority: string,
  priorityColor: string
) => {
  const response = await client.post("/getPriorityId", {
    idUser: idUser,
    priority: priority,
    priorityColor: priorityColor,
  });
  if (response.status != 200) {
    throw new Error("Error getting priority id");
  } else {
    return response.data;
  }
};

export default getPriorityId;
