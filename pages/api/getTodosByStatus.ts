import client from "./_client";

const getTodosByStatus = async (idUser: number, status: string) => {
  if (!idUser || !status) {
    console.error("No idUser or status provided");
    return null;
  }
  const response = await client.post(`/getTodosByStatus`, { idUser, status });
  if (response.status != 200) {
    throw new Error("Error getting todos");
  } else {
    return response.data;
  }
};

export default getTodosByStatus;
