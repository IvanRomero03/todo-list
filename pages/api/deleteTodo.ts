import client from "./_client";

const deleteTodo = async (idUser: number, idTodo: number) => {
  const response = await client.post("/deleteTodo", {
    idUser: idUser,
    idTodo: idTodo,
  });
  if (response.status != 200) {
    throw new Error("Error deleting todo");
  } else {
    console.log(response.data);
    return response.data;
  }
};

export default deleteTodo;
