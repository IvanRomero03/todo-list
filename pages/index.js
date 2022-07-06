import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import {
  Text,
  Center,
  Box,
  VStack,
  Divider,
  Heading,
  Container,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { TopLeft } from "../components/TopLeft";
import TodoBox from "../components/TodoBox";
import React, { useState } from "react";
import HowToUse from "../components/HowToUse";

export default function Home() {
  return (
    <>
      <Header title="To-Do" />
      <TopLeft username={"Ivansin"} />
      <HowToUse />
      <VStack textAlign="center" minH="100%" mt="5%" spacing={8}>
        <ColorModeSwitcher />
        <Text>asd</Text>
        <TodoBox />
      </VStack>
    </>
  );
}
