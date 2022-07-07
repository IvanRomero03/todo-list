import React, { useEffect } from "react";
import { Box, Button, Badge, VStack, Text, Heading } from "@chakra-ui/react";
import { getTodo } from "../pages/api/getTodo";
import { useQuery } from "react-query";

type Props = {
  idTodo?: number;
};

const TodoBox = ( {idTodo}: Props ) => {
  const { data, isLoading, isError } = useQuery(
    "getTodo",
    async () => await getTodo(idTodo ?? 5)
  );
  return (
    <Box
      mt="2%"
      alignContent={"left"}
      maxW="90%"
      borderWidth={"2px"}
      borderRadius="lg"
    >
      <VStack spacing="4" alignContent={"center"} m="6">
        <Badge colorScheme="green">
          <Text>{idTodo ?? "asd"}</Text>
          <Text>
            {data?.title ?? "aaaasd"}
            {data?.idTodo}
          </Text>
        </Badge>
        <Heading>To-Do</Heading>
        <Button variant={"outline"}>
          <Text>Add</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default TodoBox;
