import React, { useState } from "react";
import {
  Container,
  Button,
  Heading,
  Box,
  Text,
  IconButton,
  Code,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

const HowToUse = () => {
  const [toggleHowToUse, setToggleHowToUse] = useState(false);

  const handleHowToUse = () => {
    setToggleHowToUse(!toggleHowToUse);
  };
  return (
    <Container mt="2%" alignContent={"left"} maxW="75%">
      <Button onClick={handleHowToUse}>
        <Heading as="h5" size="lg">
          How to use
        </Heading>
      </Button>
      {toggleHowToUse && (
        <Box mt="1%">
          <Text>
            To make a new todo, just click the{" "}
            <IconButton
              icon={<AddIcon />}
              variant="outline"
              aria-label="Options"
              onClick={() => {}}
            />{" "}
            button and fill the spaces with the information you want to add to
            the todo.
            <br />
            To edit a todo, just click the{" "}
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              onClick={() => {}}
            >
              <EditIcon />
            </Button>{" "}
            button in the top right corner of the todo. Here yo will see the
            form to edit the todo. and just click save or delete in order to to
            what you want. Hope yo like this simple todo app {"\u{1F60A}"}
            <br />
            <br />
            You can contact me at{" "}
            <Code>
              <a href="https://github.com/IvanRomero03">My Github profile</a>
            </Code>
            <br />
            <br />
            Thanks for using this app!
          </Text>
        </Box>
      )}
    </Container>
  );
};
export default HowToUse;
