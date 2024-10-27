import React from 'react'
import { Navigate } from 'react-router-dom'

const UserRoute = ({ isLoggedIn, role, element, ...rest }) => {
    return isLoggedIn && role === 'user' ? element : <Navigate to={"/login"} />
}

export default UserRoute