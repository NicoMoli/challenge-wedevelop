import "./App.css"
import { useMemo, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Books from "./components/Books"
import { UserProfileContext, FavoritesContext } from "./context/favorites"
import Favorites from "./components/Favorites"
import UserProfile from "./components/UserProfile"

function App() {
  const [favorites, setFavorites] = useState()
  const [userProfile, setUserProfile] = useState()

  const favoritesMemo = useMemo(
    () => ({ favorites, setFavorites }),
    [favorites]
  )

  const userProfileMemo = useMemo(
    () => ({ userProfile, setUserProfile }),
    [userProfile]
  )

  return (
    <div className="App">
      <UserProfileContext.Provider value={userProfileMemo}>
        <FavoritesContext.Provider value={favoritesMemo}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/books" element={<Books />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </FavoritesContext.Provider>
      </UserProfileContext.Provider>
    </div >
  )
}

export default App
