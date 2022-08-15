import client from "./_client";

const deletePriority = async (idUser: number, priority: number) => {
  const response = await client.post("/deletePriority", {
    idUser: idUser,
    priority: priority,
  });
  if (response.status != 200) {
    throw new Error("Error deleting priority");
  } else {
    return response.data;
  }
};

export default deletePriority;
