import client from "./_client";

const getUserPriorities = async (idUser: number) => {
  if (!idUser) {
    console.error("No id provided");
    return null;
    throw new Error("No id provided");
  }
  const response = await client.post(`/getUserPriorities`, { idUser: idUser });
  if (response.status != 200) {
    throw new Error("Error getting user priorities");
  } else {
    console.log(response.data);
    return response.data;
  }
};

export default getUserPriorities;
