import "./App.css"
import { Routes, Route } from "react-router"
import Login from "./components/Login"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/books" element={<Books />} /> */}
      </Routes>
    </div>
  )
}

export default App
