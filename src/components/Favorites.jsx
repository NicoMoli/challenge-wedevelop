import { Flex, Box, Text, Heading } from "@chakra-ui/react"
import { useContext } from "react"
import { FavoritesContext } from "../context/favorites"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
    >
      <Heading paddingTop="10" paddingBottom="10" color="teal.300">
        Books added to favorites:
      </Heading>
      {favorites?.map((item, i) => (
        <Box
          key={i}
          borderWidth="1px"
          p="3"
          m="3"
          boxShadow="md"
          backgroundColor="gray.100"
        >
          <Text m="5" fontWeight="bold">
            Title: {item.details.title}
          </Text>
          <Text m="5" as="h4" lineHeight="tight">
            {"Author/s:"}
            {item.details.authors.map((author, i) => (
              <Text key={i}> {author.name} </Text>
            ))}
          </Text>
        </Box>
      ))}
    </Flex>
  )
}

export default Favorites
