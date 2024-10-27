import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = ({isLoggedIn}) => {
  return (
    <>
        <Navbar isLoggedIn={isLoggedIn} role={"admin"} />
        <Outlet />
    </>
  )
}

export default AdminLayout