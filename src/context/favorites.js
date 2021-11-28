import { createContext } from "react"

const FavoritesContext = createContext({
  favorites: null,
  setFavorites: () => {},
})

export default FavoritesContext
