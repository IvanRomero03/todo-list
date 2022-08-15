import React, { useEffect, useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from "react-query";
import getTodo from "../pages/api/getTodo";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  validateYupSchema,
} from "formik";
import PriorityItem, {
  defaultFullPriorityArray,
  defaultPriorityArray,
} from "../types/priority";
import PriorityForm from "./PriorityForm";
import { Status } from "../types/status";
import createPriority from "../pages/api/createPriority";
import getUserPriorities from "../pages/api/getUserPriorities";
import deletePriority from "../pages/api/deletePriorityByValues";
type Props = {
  idTodo?: number;
  onClose: () => void;
  onSubmit: (todo: Todo) => any;
  onDelete: (idTodo?: number, idUser?: number) => any;
  idUser: number;
};

const EditTodo = ({ idTodo, onClose, onSubmit, onDelete, idUser }: Props) => {
  let todo;
  const { data, isLoading, isError } = useQuery(
    "todo" + idTodo,
    async () => await getTodo(idTodo)
  );
  if (idTodo) {
    todo = data[0];
  } else {
    todo = {} as Todo;
  }

  const [priorityArray, setPriorityArray] = useState<PriorityItem[]>([]);

  const handleAddPriority = async (priorityItem: PriorityItem) => {
    console.log("add");
    console.log(priorityItem);
    await createPriority(
      idUser,
      priorityItem.priority,
      priorityItem.priorityColor
    );
    setPriorityArray([...priorityArray, priorityItem]);
    return null;
  };

  const handleDeletePriority = (priorityItem: PriorityItem) => {
    console.log("delete");
    priorityArray.splice(priorityArray.indexOf(priorityItem), 1);
    setPriorityArray([...priorityArray]);
    const response = deletePriority(
      idUser,
      priorityItem.priority,
      priorityItem.priorityColor
    );
    // TODO: delete priority from the database
    console.log(response);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(onSubmit, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("todo" + idTodo);
      queryClient.invalidateQueries("todos " + data.priority);
      queryClient.invalidateQueries("todos" + data.status);
    },
  });
  const handleOnSubmit = (values) => {
    console.log("submit");
    console.log(values);
    mutate(values);
  };

  useEffect(() => {
    const load = async () => {
      const priorities = await getUserPriorities(idUser);
      setPriorityArray(priorities);
    };
    load();
  }, []);
  const bigHandleDeletePriority = (setFieldValue, item) => {
    handleDeletePriority(item);
    setFieldValue("priority", priorityArray[0].priority);
    setFieldValue("priorityColor", priorityArray[0].priorityColor);
    queryClient.invalidateQueries("todos " + data.priority);
    queryClient.invalidateQueries("usersPrioritiesIds");
  };

  return (
    <ModalContent minW="90%" minH="60%">
      <Formik
        initialValues={todo}
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
                <Select
                  name="status"
                  variant="filled"
                  size="md"
                  mt="1%"
                  mb="1%"
                  defaultValue={values.status ?? "Not Started"}
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                  }}
                >
                  {Object.values(Status).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>

                <Code>Priority</Code>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <PrioritySelectItem
                      priority={values?.priority ?? "Priority"}
                      priorityColor={values?.priorityColor ?? "gray"}
                    />
                  </MenuButton>
                  <MenuList alignContent={"center"}>
                    {priorityArray.map((item) => (
                      <MenuItem
                        onClick={() => {
                          setFieldValue("priority", item.priority);
                          setFieldValue("priorityColor", item.priorityColor);
                        }}
                        key={item.priority}
                      >
                        <Container>
                          <HStack>
                            <PrioritySelectItem
                              priority={item.priority}
                              priorityColor={item.priorityColor}
                            />
                            <Button
                              borderWidth={"1px"}
                              onClick={() => {
                                bigHandleDeletePriority(setFieldValue, item);
                              }}
                              size="xs"
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
                  onClick={() => {
                    onClose();
                    onDelete(idTodo, idUser);
                  }}
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
