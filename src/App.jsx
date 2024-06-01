import { Routes,Route } from 'react-router-dom'
import './App.css'
import SignUp from './Pages/SignUp'
function App() {
 

  return (
    <>
        <Routes>
          <Route path='/signup' element={<SignUp/>}></Route>
          {/* <Route path='/login' element={<Login/>}></Route> */}
        </Routes>
    </>
  )
}

export default App
