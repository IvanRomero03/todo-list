import { Container, Heading, HStack } from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

type Props = {
  username: string;
};

const TopLeft = ( {username} : Props ) => {
  return (
    <Container mt="2%" alignContent={"left"} maxW="90%">
      <HStack spacing="4" alignContent={"center"}>
        <ColorModeSwitcher />
        <Heading>{username ? username + "'s " : ""} To-Do</Heading>
        <FaHamburger />
      </HStack>
    </Container>
  );
};
export default TopLeft;
