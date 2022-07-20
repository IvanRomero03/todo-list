import client from "./_client";
import { User } from "../../types/user";

const getValidUser = async ({ name, password }: User) => {
  const response = await client.post("/getValidUser", {
    name: name,
    password,
  });
  if (response.status != 200) {
    throw new Error("Error getting valid user");
  } else {
    return response.data;
  }
};

export default getValidUser;
