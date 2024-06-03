import { Routes,Route } from 'react-router-dom'
import './App.css'
import SignUp from './Pages/SignUp'
import Signin from './Pages/Signin'
import Forgot from './Pages/Forgot'
import Reset from './Pages/ResetPasswrod'
import MainPage from './Pages/MainPage'
import RequireAuth from './Auth/ReuireAuth'
function App() {
 

  return (
    <>
        <Routes>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/forgot' element={<Forgot/>}></Route>
          <Route path='/resetPassword' element={<Reset/>}></Route>
          <Route element={<RequireAuth/>}>
              <Route path='/main' element={<MainPage/>}></Route>
          </Route>
          {/* <Route path='/login' element={<Login/>}></Route> */}
        </Routes>
    </>
  )
}

export default App
