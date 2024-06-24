import './App.css'
import Login from './components/Login'
import Home from "./components/Home"
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import {useAuthContext} from "./context/authContextProvider.jsx"
function App() {
const {authUser} = useAuthContext();
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/home" element={authUser ? <Home/> : <Navigate to="/"/> }/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
