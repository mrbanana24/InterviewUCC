import Home from "./screens/Home"
import Register from "./screens/Register"
import Login from "./screens/Login"
import MainPage from "./screens/MainPage"
import PrivateRoute from "./components/PrivateRoute"
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/mainpage" element={<MainPage />} /> 
      </Route> 
    </Routes>
  )
}

export default App
