import React from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

const RootLayout = () => {
  return (
    <div>
       <Navbar/>
        <Outlet/>
      <Footer/>
     
       
      
    </div>
  )
}

export default RootLayout
