// import { Link } from "react-router-dom"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Wrap,
  Box,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"

const Login = () => {
  function validateUserName(value) {
    let error
    if (!value) {
      error = "User Name is required"
    }
    return error
  }

  function validatePassword(value) {
    let error
    if (!value) {
      error = "Password is required"
    }
    return error
  }

  return (
    <Container maxW="container.md">
      <Wrap align="center" justify="center" paddingTop="250">
        <Box padding="4" maxW="3xl" borderWidth="1px">
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
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
                      <Input {...field} id="name" placeholder="name" />
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
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrap>
    </Container>
  )
}

export default Login
