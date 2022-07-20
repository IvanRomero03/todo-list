import client from "./_client";

const getUniqueUsername = async (name: string) => {
  const response = await client.post("/getUniqueUsername", {
    name: name,
  });
  if (response.status != 200) {
    throw new Error("Error getting unique username");
  } else {
    console.log(response.data);
    if (response.data == true) {
      return true;
    } else {
      return false;
    }
  }
};

export default getUniqueUsername;
