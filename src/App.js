import "./App.css"
import { useMemo, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Books from "./components/Books"
import FavoritesContext from "./context/favorites"
import Favorites from "./components/Favorites"

function App() {
  const [favorites, setFavorites] = useState()

  const favoritesMemo = useMemo(
    () => ({ favorites, setFavorites }),
    [favorites]
  )

  return (
    <div className="App">
      <FavoritesContext.Provider value={favoritesMemo}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </FavoritesContext.Provider>
    </div>
  )
}

export default App
