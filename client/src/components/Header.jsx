import React from 'react'
import Navbar from './Navbar'
import Topbar from './Topbar'

function Header({categories}) {
  return (
    <>
      <Topbar/>
      <Navbar categories={categories}/>
    </>
  )
}

export default Header