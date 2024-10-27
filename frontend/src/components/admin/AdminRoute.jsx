import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({element, isLoggedIn , role, ...rest}) => {
  return isLoggedIn && role === "admin" ? element : <Navigate to={"/login"} />
}

export default AdminRoute