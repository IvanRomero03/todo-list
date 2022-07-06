import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import { Text, Center, Box, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

export default function Home() {
  return (
    <>
      <Header title="To-Do" />
      <VStack textAlign="center" minH="100%">
        <Center>
          <ColorModeSwitcher />
          <Text>asd</Text>
        </Center>
      </VStack>
    </>
  );
}
