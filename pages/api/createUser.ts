import client from "./_client";
import { User } from "../../types/user";

const createUser = async ({ name, password }: User) => {
  const response = await client.post("/createUser", {
    name: name,
    password,
  });
  if (response.status != 200) {
    throw new Error("Error creating user");
  } else {
    return response.data;
  }
};
export default createUser;
