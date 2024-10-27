import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RiContractLeftFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export const UserList = () => {

    const [users, setUsers] = useState();

    const getAllUsers = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
            withCredentials: true
        });
        console.log(response.data.result)
        setUsers(response.data.result)
    }

    const handleVerify = async (id) => {

        // console.log(data);
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/${id}/verify`, {}, {
            withCredentials: true
        });
        getAllUsers();
    }


    useEffect(() => {
        getAllUsers();
    }, []);


    return (
        <div className='mx-auto py-4 overflow-scroll my-4'>
            <div className='my-2 mx-auto w-[60%] text-lg flex flex-col'>
                <NavLink to={"/admin"}>
                    <RiContractLeftFill size={28} />
                </NavLink>
            </div>
            <table className='w-[80%] bg-slate-100 border border-blue-50 text-2xl mx-auto'>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th colSpan={2}>status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => {
                            return <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user?.username}</td>
                                <td>{user?.email}</td>
                                <td className={`${user?.verified ? "text-green-600" : "text-red-600"}`}>{user?.verified ? <span className='cursor-not-allowed'>Verified</span> : "Not verified"} </td>
                                <td>{user?.verified ? <span className='cursor-not-allowed'>Verified</span> : <button onClick={(e) => handleVerify(user._id)} className={`py-1 px-2 bg-emerald-400 rounded-xl ${user.verify && " cursor-not-allowed"}`}>Verify</button>}</td>


                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
