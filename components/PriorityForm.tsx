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
  handleOnSubmit: any;
  defaultValues?: PriorityItem;
};

const PriorityForm = ({ handleOnSubmit, defaultValues }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState(defaultValues?.priority ?? "Color");
  const [priorityColor, setPriorityColor] = useState(
    defaultValues?.priorityColor ?? "gray"
  );

  const handleSubmit = () => {
    handleOnSubmit({ priority, priorityColor });
    setIsOpen(false);
  };

  return (
    <Button minW="100%" variant="ghost">
      <Menu isOpen={isOpen}>
        <MenuButton as={Box} minW="100%" onClick={() => setIsOpen(!isOpen)}>
          <PrioritySelectItem priority="new" priorityColor="gray" />
        </MenuButton>
        <MenuList>
          <HStack spacing="4" alignContent={"center"} m="5%">
            <Input
              name="priority"
              width="auto"
              w="30%"
              onChange={(v) => {
                setPriority(v.target.value);
              }}
            />
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <PrioritySelectItem
                  priority={priorityColor ?? "Color"}
                  priorityColor={priorityColor ?? "gray"}
                />
              </MenuButton>
              <MenuList>
                {typesColorSchemes.map((priorityColor) => (
                  <MenuItem
                    onClick={() => {
                      setPriorityColor(priorityColor);
                    }}
                  >
                    <PrioritySelectItem
                      priority={priorityColor}
                      priorityColor={priorityColor}
                    />
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Button borderWidth={"1px"} onClick={handleSubmit}>
              <AddIcon />
            </Button>
          </HStack>
        </MenuList>
      </Menu>
    </Button>
  );
};

export default PriorityForm;
