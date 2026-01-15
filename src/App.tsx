import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Services from "./pages/services"
import About from "./pages/about"


function App() {

  return (
    <div>      
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="services" element={ <Services /> } />
      <Route path="about" element={ <About /> } />
    </Routes>
  </div>
  )
}

export default App
