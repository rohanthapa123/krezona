import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export const Navbar = ({ isLoggedIn, role }) => {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {

    logout();
    await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {}, {
      withCredentials: true

    })

    navigate("/login");
  }

  return (
    <div className=''>
      <nav className="w-[100%] md:w-[90%] m-auto h-[10vh] bg-slate-100 flex items-center justify-between px-[5%]">
        <div className="">
          <a className=" text-2xl font-semibold text-black" href="#"><h1>Task Management System</h1></a>

        </div>
        <div className='flex  gap-8'>
          {role === 'admin' && <NavLink className='text-2xl font-semibold text-black' to={"users"} >Users</NavLink>}
          <button onClick={handleLogout}> <span className='text-2xl font-semibold text-black'> Logout </span></button>
        </div>

      </nav>
    </div>
  )
}
