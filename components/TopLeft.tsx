import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
  username: string;
};

const TopLeft = ({ username }: Props) => {
  return (
    <Container mt="2%" alignContent={"left"} maxW="90%">
      <Flex alignContent={"center"}>
        <HStack spacing="4" alignContent={"center"}>
          <Heading>{username ? username + "'s " : ""} To-Do</Heading>
        </HStack>
        <Spacer />
        <ColorModeSwitcher />
        <Menu>
          <MenuButton>
            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label=""
            />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Text>Settings</Text>
            </MenuItem>
            <MenuItem>
              <Text>Sing Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
};
export default TopLeft;
