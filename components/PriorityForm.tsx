import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  HStack,
  Input,
  MenuItem,
  Container,
  Box,
} from "@chakra-ui/react";
import { PrioritySelectItem } from "./EditTodo";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import PriorityItem, { typesColorSchemes } from "../types/priority";

type Props = {
  handleOnSubmit: CallableFunction;
  defaultValues?: PriorityItem;
};

const PriorityForm = ({ handleOnSubmit, defaultValues }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu isOpen={isOpen}>
      <MenuButton as={Box} onClick={() => setIsOpen(!isOpen)} w="90%">
        <PrioritySelectItem priority="new" priorityColor="gray" />
      </MenuButton>
      <MenuList>
        <Formik
          onSubmit={(values, actions) => {
            handleOnSubmit(values);
          }}
          initialValues={{
            priorityColor: defaultValues?.priorityColor ?? "gray",
            priority: defaultValues?.priority ?? "",
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <HStack spacing="4">
                <Input
                  width="auto"
                  w="30%"
                  onChange={(v) => {
                    setFieldValue("priority", v.target.value);
                  }}
                />
                <Field name="priority" as={Input} width="auto" w="30%" />
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <PrioritySelectItem
                      priority={values?.priorityColor ?? "Color"}
                      priorityColor={values?.priorityColor ?? "gray"}
                    />
                  </MenuButton>
                  <MenuList>
                    {typesColorSchemes.map((priorityColor) => (
                      <MenuItem
                        onClick={() =>
                          setFieldValue("priorityColor", priorityColor)
                        }
                      >
                        <PrioritySelectItem
                          priority={priorityColor}
                          priorityColor={priorityColor}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </HStack>
              <Button
                type="submit"
                borderWidth={"1px"}
                onClick={() => setIsOpen(!isOpen)}
              >
                <AddIcon />
              </Button>
            </Form>
          )}
        </Formik>
      </MenuList>
    </Menu>
  );
};

export default PriorityForm;
