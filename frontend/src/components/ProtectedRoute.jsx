import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element, isLoggedIn,loading,  ...rest }) => {

    // useEffect(()=>{
    //     console.log("In protected route", isLoggedIn)
    // },[]);

    if(loading){
        return <div>Loading...</div>
    }

    return isLoggedIn ? element : <Navigate to={"/login"} />
}

export default ProtectedRoute