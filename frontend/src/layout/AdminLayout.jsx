import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar'

const AdminLayout = ({isLoggedIn}) => {
  return (
    <>
        <Navbar isLoggedIn={isLoggedIn} role={"admin"} />
        <Outlet />
    </>
  )
}

export default AdminLayout