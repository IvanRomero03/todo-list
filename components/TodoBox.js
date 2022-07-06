import React from "react";
import { Box, Button, Badge, VStack, Text, Heading } from "@chakra-ui/react";

const TopLeft = ({}) => {
  return (
    <Box mt="2%" alignContent={"left"} maxW="90%">
      <VStack spacing="4" alignContent={"center"}>
        <Badge colorScheme="green">
          <Text>{"Asd"}</Text>
        </Badge>
        <Heading>To-Do</Heading>
        <Button variantColor="green">
          <Text>Add</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default TopLeft;
