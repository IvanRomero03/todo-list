import client from "./_client";

const getUsersPrioritiesIds = async (idUser: number) => {
  if (!idUser) {
    console.error("No idUser provided");
    return null;
  }
  const response = await client.post(`/getUserPrioritesIds`, { idUser });
  if (response.status != 200) {
    throw new Error("Error getting users priorities ids");
  } else {
    console.log(response.data);
    return response.data;
  }
};

export default getUsersPrioritiesIds;
