import { Text, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Header from "../components/header";
import HowToUse from "../components/HowToUse";
import TodoBox from "../components/TodoBox";
import TopLeft from "../components/TopLeft";
import React from "react";

export default function Home() {
  return (
    <>
      <Header title="To-Do" />
      <TopLeft username={"Ivansin"} />
      <HowToUse />
      <VStack textAlign="center" minH="100%" mt="5%" spacing={8}>
        <TodoBox />
      </VStack>
    </>
  );
}
