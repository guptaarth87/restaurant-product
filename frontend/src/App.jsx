import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes , Route } from 'react-router-dom'
import axios from 'axios'
import Landing from './Pages/Landing'
import { MenuPage } from './Pages/MenuPage'
import Navbar from './Components/Navigation/Navbar'
import Footer from './Components/Footer/Footer'
import API_URL from './_helper'
import ScrollToTop from './ScrollToTop'



function App() {
   
  
   

  return (
    <>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<><Navbar></Navbar><Landing/></>}/>
        <Route path='/home' element={<Landing/>}/>
        <Route path='/menupage' element={<><Navbar></Navbar><MenuPage></MenuPage><Footer></Footer></>}/>
      </Routes>
    </>
  )
}

export default App
