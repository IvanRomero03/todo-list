import client from "./_client";

const getTodosByPriority = async (idUser: number, priority: number) => {
  if (!idUser || !priority) {
    console.error("No idUser or priority provided");
    return null;
  }
  const response = await client.post(`/getTodosByPriority`, {
    idUser,
    priority,
  });
  if (response.status != 200) {
    throw new Error("Error getting todos");
  } else {
    console.log(response.data);
    return response.data;
  }
};

export default getTodosByPriority;
