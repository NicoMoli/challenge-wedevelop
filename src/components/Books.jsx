import {
  Box,
  Image,
  Stack,
  Text,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react"
import React, { useEffect, useState, useContext, useCallback } from "react"
import FavoritesContext from "../context/favorites"
import { getBooks } from "../services/getBooks"
import { useNavigate } from "react-router"

const Books = () => {
  const [books, setBooks] = useState()
  const { favorites, setFavorites } = useContext(FavoritesContext)
  const navigate = useNavigate()

  const fetchBooks = useCallback(async () => {
    try {
      const response = await getBooks()
      if (response) {
        const formatDataBooks = Object.keys(response.data).map((key) => {
          return response.data[key]
        })
        const data = formatDataBooks.map((element) => {
          return { ...element, showBookDescription: false }
        })

        setBooks(data)
      }
    } catch (error) {
      console.log("error fetch --", error)
    }
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDescription = (key) => {
    const data = books.map((element) => {
      return {
        ...element,
        showBookDescription:
          key === element.bib_key
            ? !element.showBookDescription
            : element.showBookDescription,
      }
    })
    setBooks(data)
  }

  const addFavorites = (item) => {
    let favBooks = []
    if (favorites) favBooks = [...favorites]
    if (!favBooks.some((c) => c.bib_key === item.bib_key)) {
      favBooks.push(item)
      setFavorites(favBooks)
    }
  }

  if (!books)
    return (
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Box fontWeight="bold">Loading books list...</Box>
      </Flex>
    )

  return (
    <Box backgroundColor="gray.100">
      {" "}
      <Heading paddingTop="10" color="teal.300">
        List of Books:
      </Heading>
      <Stack spacing={15} marginTop="10" align="center">
        {books?.map((book, i) => (
          <Box
            boxShadow="md"
            key={i}
            maxW="350"
            borderWidth="1px"
            borderRadius="lg"
            data-testid={"container-div"}
          >
            <Image
              src={`https://covers.openlibrary.org/b/lccn/${book.details.lccn}-M.jpg`}
              alt={book.details.title}
              boxSize="100%"
              objectFit="cover"
            />
            <Box p="6">
              <Box
                fontWeight="bold"
                letterSpacing="wide"
                fontSize="md"
                textTransform="uppercase"
                ml="2"
              >
                {book.details.title}
              </Box>
            </Box>
            <Box fontWeight="semibold" as="h4" lineHeight="tight">
              {"Author/s:"}
              {book.details.authors.map((author, i) => (
                <Text key={i}> {author.name} </Text>
              ))}
            </Box>
            <Button
              backgroundColor="gray.300"
              onClick={() => handleDescription(book.bib_key)}
              m="4"
              data-testid={"button-description"}
            >
              Show Description
            </Button>
            {book.showBookDescription && (
              <Box padding="10">
                {book.details.description
                  ? book.details.description
                  : "Book description is not avalaible"}
              </Box>
            )}
            <Button
              backgroundColor="green.100"
              onClick={() => addFavorites(book)}
              m="4"
              data-testid={"button-favorites"}
            >
              Add to favorites
            </Button>
          </Box>
        ))}
        <Box paddingBottom="10" paddingTop="5">
          <Button
            backgroundColor="green.100"
            onClick={() => navigate("/favorites")}
            data-testid={"go-to-favorites"}
          >
            {" "}
            Go to Favorites Books
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Books
