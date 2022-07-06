import React, { useState } from "react";
import { Container, Button, Heading, Box, Text } from "@chakra-ui/react";

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
          <Text>asd</Text>
        </Box>
      )}
    </Container>
  );
};
export default HowToUse;
