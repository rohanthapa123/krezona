import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const UserLayout = ({isLoggedIn}) => {
  return (
    <>
        <Navbar isLoggedIn={isLoggedIn} role={"user"} />
        <Outlet />
    </>
  )
}

export default UserLayout