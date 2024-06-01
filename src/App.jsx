import { Routes,Route } from 'react-router-dom'
import './App.css'
import SignUp from './Pages/SignUp'
import Signin from './Pages/Signin'
function App() {
 

  return (
    <>
        <Routes>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>

          {/* <Route path='/login' element={<Login/>}></Route> */}
        </Routes>
    </>
  )
}

export default App
