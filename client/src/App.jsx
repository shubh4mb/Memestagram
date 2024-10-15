// import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './pages/User/Home'
import Signin from './pages/User/Signin'
import Signup from './pages/User/Signup'
import Header from "./components/Header"
import Profile from "./pages/User/Profile"
import AddMeme from "./pages/User/AddMeme"

const App = () => {
  return (
    <BrowserRouter >
    <Header/>
      <Routes >
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/addmeme' element={<AddMeme/>}></Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App