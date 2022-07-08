import React, { useEffect } from "react";
import {
  Box,
  Button,
  Badge,
  VStack,
  Text,
  Heading,
  HStack,
  Container,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { getTodo } from "../pages/api/getTodo";
import { useQuery } from "react-query";
import { Todo, defaultTodo } from "../types/todo";
import { EditIcon } from "@chakra-ui/icons";
import EditTodo from "./EditTodo";

type Props = {
  idTodo?: number;
};

const TodoBox = ({ idTodo }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isError } = useQuery(
    "todo",
    async () => await getTodo(idTodo ?? 1)
  );

  const { description, priority, priorityColor, status, title } =
    data ?? defaultTodo();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditTodo idTodo={idTodo} />
      </Modal>
      <Box
        mt="2%"
        alignContent={"left"}
        maxW="90%"
        borderWidth={"2px"}
        borderRadius="lg"
      >
        <VStack spacing="4" alignContent={"left"} m="6">
          <HStack spacing="4">
            <Container alignContent={"center"}>
              {/* Priority */}
              <Badge colorScheme={priorityColor}>
                <Box m="1.5">
                  <Text>{priority}</Text>
                </Box>
              </Badge>
            </Container>
            <Container alignContent={"Right"}>
              {/* Edit */}
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                onClick={onOpen}
              >
                <EditIcon />
              </Button>
            </Container>
          </HStack>
          {/* Title */}
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          {/* Description */}
          <Text>{description}</Text>
          {/* Status */}
          <Badge colorScheme="gray">{status}</Badge>
          {/* <Button variant={"outline"}>
          <Text>Edit</Text>
        </Button> */}
        </VStack>
      </Box>
    </>
  );
};

export default TodoBox;
