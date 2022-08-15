import client from "./_client";

const deletePriority = async (idUser: number, priority: number) => {
  const response = await client.post("/deletePriority", {
    idUser: idUser,
    priority: priority,
  });
  if (response.status != 200) {
    throw new Error("Error deleting priority");
  } else {
    console.log(response.data);
    return response.data;
  }
};

export default deletePriority;
