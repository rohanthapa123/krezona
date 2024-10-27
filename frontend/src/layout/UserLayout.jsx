import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar'

const UserLayout = ({isLoggedIn}) => {
  return (
    <>
        <Navbar isLoggedIn={isLoggedIn} role={"user"} />
        <Outlet />
    </>
  )
}

export default UserLayout