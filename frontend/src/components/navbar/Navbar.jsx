import React from 'react'
import "./navbar.css"
export const Navbar = () => {
  return (
    <div className=''>
      <nav className="w-full h-[10vh] bg-slate-100 flex items-center justify-start ps-[10%]">
        <div className="">
          <a className=" text-2xl font-semibold text-black" href="#"><h1>Task Management System</h1></a>
        </div>
      </nav>
    </div>
  )
}
