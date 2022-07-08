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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
};

const EditTodo = ({ idTodo }: Props) => {
  const { data, isLoading, isError } = useQuery(
    "todo",
    async () => await getTodo(idTodo ?? 1)
  );

  const PriorityArray: PriorityItem[] = defaultFullPriorityArray();

  const handleAddPriority = (priorityItem: PriorityItem): null => {
    PriorityArray.push(priorityItem);
    return null;
  };

  return (
    <ModalContent minW="90%" minH="60%">
      <Formik
        initialValues={data ?? ({} as Todo)}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Container alignItems={"left"} minW="97.5%" m="1%">
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
                    {PriorityArray.map((item) => (
                      <MenuItem
                        onClick={() => {
                          setFieldValue("priority", item.priority);
                          setFieldValue("priorityColor", item.priorityColor);
                        }}
                      >
                        <PrioritySelectItem
                          priority={item.priority}
                          priorityColor={item.priorityColor}
                        />
                      </MenuItem>
                    ))}
                    <MenuItem closeOnSelect={false}>
                      <PriorityForm handleOnSubmit={handleAddPriority} />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </ModalBody>
            </Container>
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
      <Center minW="90%" minH="90%">
        <Badge colorScheme={priorityColor} minW="50%" minH="50%" mx="5%">
          <Center>{priority}</Center>
        </Badge>
      </Center>
    </>
  );
};

export default EditTodo;
