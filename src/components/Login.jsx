import React from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Flex,
  Stack,
  Avatar,
  Heading,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router"

const Login = () => {
  const navigate = useNavigate()

  const validateUserName = (value) => {
    let error
    if (!value) error = "User Name is required!"
    return error
  }

  const validatePassword = (value) => {
    let error
    if (!value) error = "Password is required!"
    return error
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }} boxShadow="md" p="10">
          {" "}
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                actions.setSubmitting(false)
                navigate("/books")
              }, 1000)
            }}
          >
            {(props) => (
              <Form>
                <Field name="name" validate={validateUserName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">User Name</FormLabel>
                      <Input {...field} id="name" placeholder="User Name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input {...field} id="password" placeholder="Password" />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  data-testid={"submit-button"}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
