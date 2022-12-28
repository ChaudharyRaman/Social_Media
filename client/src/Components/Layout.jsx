import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      {children}
    </div>
  )
}

export default Layout
