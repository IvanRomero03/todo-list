import React from "react";
import { useQuery } from "react-query";
import {
  Input,
  Box,
  Button,
  Code,
  Text,
  Center,
  Container,
  VStack,
  HStack,
  Heading,
  Divider,
  Alert,
  AlertIcon,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import createUser from "./api/createUser";
import getUniqueUsername from "./api/getUniqueUsername";
import getValidUser from "./api/getValidUser";
import { useRouter } from "next/router";
import Header from "../components/header";

const SingInPage = () => {
  //TODO add sanitization validation to the form
  const router = useRouter();
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });
  const handleOnSignIn = async (values) => {
    const getValidUserResponse = await getValidUser({
      name: values.name,
      password: values.password,
    });
    const data = getValidUserResponse;
    if (data.length == 0) {
      alert("not valid user or password");
    } else {
      localStorage.setItem("user", data[0].name);
      localStorage.setItem("idUser", data[0].idUser);
      router.push("/");
    }
  };

  const handleOnSignUp = async (values) => {
    console.log(values);
    const getUniqueUsernameResponse = await getUniqueUsername(values.name);
    if (getUniqueUsernameResponse) {
      const idResponse = await createUser({
        name: values.name,
        password: values.password,
      });
      console.log("User is created");
      console.log(idResponse);
      localStorage.setItem("user", values.name);
      localStorage.setItem("idUser", idResponse);
      router.push("/");
    } else {
      //TODO change alert
      alert("Username already exists");
    }
  };

  return (
    <>
      <Header title={"Signing page"} />
      {isVisible && (
        <Alert status="warning">
          <AlertIcon />
          Username already exists
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={onClose}
          />
        </Alert>
      )}
      <Center>
        <VStack spacing="4" alignContent={"center"} m="6">
          <Heading as="h1" size="xl">
            Sign In
          </Heading>
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={(values) => {
              handleOnSignIn(values);
            }}
          >
            <Form>
              <Code> To-Do&apos;s name </Code>
              <Field name="name" placeholder="Name" as={Input} m="2%" />
              <Code> Password </Code>
              <Field
                name="password"
                placeholder="Password"
                as={Input}
                m="2%"
                type={"password"}
              />
              <Button type="submit" m="2%">
                Sign In
              </Button>
            </Form>
          </Formik>
          <Divider />
          <Heading as="h2" size="md">
            Sign Up
          </Heading>
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={(values) => {
              handleOnSignUp(values);
            }}
          >
            <Form>
              <Code> To-Do&apos;s name </Code>
              <Field name="name" placeholder="Name" as={Input} m="2%" />
              <Code> Password </Code>
              <Field
                name="password"
                placeholder="Password"
                as={Input}
                m="2%"
                type={"password"}
              />
              <Button type="submit" m="2%">
                Sign Up
              </Button>
            </Form>
          </Formik>
        </VStack>
      </Center>
    </>
  );
};

export default SingInPage;
