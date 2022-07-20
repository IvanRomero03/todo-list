import React, { useState } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Heading,
  HeadingProps,
  PinInput,
  Badge,
  Text,
  Code,
  Container,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  Center,
  BadgeProps,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Todo } from "../types/todo";
import { useQuery } from "react-query";
import { getTodo } from "../pages/api/getTodo";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import PriorityItem, {
  defaultFullPriorityArray,
  defaultPriorityArray,
} from "../types/priority";
import PriorityForm from "./PriorityForm";
type Props = {
  idTodo?: number;
  onClose: () => void;
  onSubmit: (todo: Todo) => void;
  onDelete: (idTodo?: number) => void;
};

const EditTodo = ({ idTodo, onClose, onSubmit, onDelete }: Props) => {
  const { data, isLoading, isError } = idTodo
    ? useQuery("todo", async () => await getTodo(idTodo))
    : { data: undefined, isLoading: undefined, isError: undefined };

  const [priorityArray, setPriorityArray] = useState<PriorityItem[]>(
    defaultFullPriorityArray
  );

  const handleAddPriority = (priorityItem: PriorityItem) => {
    console.log("add");
    console.log(priorityItem);
    setPriorityArray([...priorityArray, priorityItem]);

    return null;
  };

  const handleDeletePriority = (priorityItem: PriorityItem) => {
    console.log("delete");
    priorityArray.splice(priorityArray.indexOf(priorityItem), 1);
    console.log(priorityItem);
  };

  const handleOnSubmit = (values) => {
    console.log("submit");
    console.log(values);
  };

  return (
    <ModalContent minW="90%" minH="60%">
      <Formik
        initialValues={data ?? ({} as Todo)}
        onSubmit={(values, actions) => {
          handleOnSubmit(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <VStack alignItems={"left"} minW="97.5%" m="1%">
              <ModalHeader>
                <Code>Title</Code>
                <Field
                  name="title"
                  as={Input}
                  placeholder="Title"
                  variant="flushed"
                  size="lg"
                  style={{
                    fontWeight: "bold",
                  }}
                />
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
                <Code>Description</Code>
                <Field
                  name="description"
                  as={Textarea}
                  placeholder="Description"
                  variant="filled"
                  size="md"
                  mt="1%"
                  mb="1%"
                />
                <Code>Status</Code>

                <Field
                  name="status"
                  as={Input}
                  placeholder="status"
                  variant="filled"
                  size="md"
                  mt="1%"
                  mb="1%"
                />

                <Code>Priority</Code>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <PrioritySelectItem
                      priority={values.priority ?? "Priority"}
                      priorityColor={values.priorityColor ?? "gray"}
                    />
                  </MenuButton>
                  <MenuList alignContent={"center"}>
                    {priorityArray.map((item) => (
                      <MenuItem
                        onClick={() => {
                          setFieldValue("priority", item.priority);
                          setFieldValue("priorityColor", item.priorityColor);
                        }}
                      >
                        <Container>
                          <HStack>
                            <PrioritySelectItem
                              priority={item.priority}
                              priorityColor={item.priorityColor}
                            />
                            <Button
                              borderWidth={"1px"}
                              onClick={() => handleDeletePriority(item)}
                              size="xs"
                              // FIXME bug of selecting on delete
                              // TODO add edit priority
                            >
                              <DeleteIcon />
                            </Button>
                          </HStack>
                        </Container>
                      </MenuItem>
                    ))}
                    <Container minW={"100%"} alignContent={"center"}>
                      <PriorityForm handleOnSubmit={handleAddPriority} />
                    </Container>
                  </MenuList>
                </Menu>
              </ModalBody>
              <Container minW="100%" w={"100%"} alignContent={"right"}>
                <Button
                  type="submit"
                  variant="outline"
                  m="1%"
                  colorScheme={"blue"}
                  onClick={onClose}
                  w="45%"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  m="1%"
                  ml="5%"
                  colorScheme={"red"}
                  onClick={onClose}
                  w="45%"
                  // TODO: add delete todo
                >
                  Delete
                </Button>
              </Container>
            </VStack>
          </Form>
        )}
      </Formik>
    </ModalContent>
  );
};

export const PrioritySelectItem = ({
  priority,
  priorityColor,
}: PriorityItem) => {
  return (
    <>
      <Center minW="50%" minH="50%">
        <Badge colorScheme={priorityColor} minW="50%" minH="50%" mx="5%">
          <Center>{priority}</Center>
        </Badge>
      </Center>
    </>
  );
};

export default EditTodo;
