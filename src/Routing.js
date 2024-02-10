import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TodoList from './pages/TodoList'
import './assets/styles.css'

const Routing = () => {

  const signin = (newUser) => {
    sessionStorage.setItem("user" , newUser)
  }

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} ></Route>

            <Route path='/' element={<Home/>}></Route>

            <Route path='/signin' element={<Signin Signin={signin}/>}></Route>

            <Route path='/signup' element={<Signup />}></Route>

            <Route path='/blogs' 
                   element={sessionStorage.getItem("user") 
                   ? <Blogs user={sessionStorage.getItem("user")} /> 
                   : <Navigate replace to={"/signin"}/>}>      
             </Route>
             
            <Route path='/to-do' element={<TodoList user={sessionStorage.getItem("user")} />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing