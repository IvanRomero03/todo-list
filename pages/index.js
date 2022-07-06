import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import { Text, Center, Box, VStack, Divider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { TopLeft } from "../components/TopLeft";
import TodoBox from "../components/TodoBox";

export default function Home() {
  return (
    <>
      <Header title="To-Do" />
      <TopLeft username={"Ivansin"} />
      <VStack textAlign="center" minH="100%" mt="10%" spacing={8}>
        <ColorModeSwitcher />
        <Text>asd</Text>
        <TodoBox />
      </VStack>
    </>
  );
}
