import { createContext } from "react"

export const FavoritesContext = createContext({
  favorites: null,
  setFavorites: () => { },
})

export const UserProfileContext = createContext({
  userProfile: null,
  setUserProfile: () => { },
})

// export default FavoritesContext
