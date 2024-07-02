import './App.css'
import Home from "./components/Home"
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import {useAuthContext} from "./context/authContextProvider.jsx"
import Landingpage from './components/landingpage.jsx'
import Crop from './components/crop.jsx'

function App() {
const {authUser} = useAuthContext();
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landingpage/>}/>
    <Route path="/profile" element={<Crop/>}/>
    <Route path="/home" element={authUser ? <Home/> : <Navigate to="/"/> }/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
