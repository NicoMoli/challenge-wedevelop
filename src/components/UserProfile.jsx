import React, { useState, useContext } from "react"
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
import { UserProfileContext } from "../context/favorites"

const UserProfile = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const { setUserProfile } = useContext(UserProfileContext)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }

  const validateEmail = (value) => {
    let error
    if (!value) error = "Email is required!"
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
        <Heading color="teal.400">User profile</Heading>
        <Box minW={{ base: "90%", md: "468px" }} boxShadow="md" p="10">
          {" "}
          <Formik
            initialValues={{ email: "", userPicture: {} }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                if (isFilePicked && selectedFile) {
                  // Save data on context
                  console.log("Data --", values.email, selectedFile)
                  setUserProfile({ email: values.email, file: selectedFile })
                  actions.setSubmitting(false)
                }
              }, 1000)
            }}
          >
            {(props) => (
              <Form>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input {...field} id="email" placeholder="Email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="userPicture">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.userPicture && form.touched.userPicture
                      }
                    >
                      <FormLabel htmlFor="password">User Picture</FormLabel>
                      <div>
                        <input
                          type="file"
                          name="file"
                          onChange={changeHandler}
                        />
                      </div>
                      {/* <Input
                        {...field}
                        type={"file"}
                        id="userPicture"
                        placeholder="userPicture"
                      /> */}
                      <FormErrorMessage>
                        {form.errors.userPicture}
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
                  Save data
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default UserProfile
