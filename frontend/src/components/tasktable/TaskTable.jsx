import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export const TaskTable = () => {

    const [tasks, setTasks] = useState();

    const getAllTasks = async () => {
        const data = await axios.get("http://localhost:8085/tasks" , {
            withCredentials: true
        });
        // console.log(data)
        setTasks(data.data)
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8085/tasks/${id}`,{withCredentials: true});
        getAllTasks();
        // console.log(response)
    }

    const handleChangeStatus = async (id, status) => {
        const data = { status: !status };
        // console.log(data);
        const response = await axios.patch(`http://localhost:8085/tasks/${id}/status`, data);
        getAllTasks();
    }


    useEffect(() => {
        getAllTasks();
    }, []);


    return (
        <div className='mx-auto my-4'>
            <div className='w-[80%] my-[25px] mx-auto flex justify-end'>
                <NavLink to={"/add"}>

                    <button className='p-2 text-xl bg-blue-400 cursor-pointer rounded-md text-white'>Add New Task</button>
                </NavLink>
            </div>
            <table className='w-[80%] bg-slate-100 border border-blue-50 text-2xl mx-auto'>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan={2}>status</th>
                        <th>User Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map((task, index) => {
                            return <tr key={task._id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task?.description}</td>
                                <td className={`${task.status ? "text-green-600" : "text-red-600"}`}>{task?.status ? "Completed " : "Not Completed"} </td>
                                <td><button onClick={(e) => handleChangeStatus(task._id, task.status)} className={`py-1 px-2 bg-emerald-400 rounded-xl`}>Toggle</button></td>
                                <td>{task?.accepted ? <span className='text-green-500'>Accepted</span> : <span className='text-red-500'>Pending</span> }</td>
                                <td className=' cursor-pointer '>
                                    <NavLink to={`/update/:${task._id}`} >
                                        <FaEdit className='m-auto' color='green' size={24} />
                                    </NavLink>
                                </td>
                                <td onClick={() => { handleDelete(task._id) }} className='cursor-pointer' ><MdDeleteOutline className='m-auto' color='red' size={28} /></td>

                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
