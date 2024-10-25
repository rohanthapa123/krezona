import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import "./tasktable.css"
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export const TaskTable = () => {

    const [tasks, setTasks] = useState();

    const getAllTasks = async () => {
        const data = await axios.get("http://localhost:8085/tasks");
        // console.log(data)
        setTasks(data.data)
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8085/tasks/${id}`);
        getAllTasks();
        // console.log(response)
    }

    const handleChangeStatus = async (id, status) =>{
        const data = {status : !status};
        // console.log(data);
        const response = await axios.patch(`http://localhost:8085/tasks/${id}/status` , data);
        getAllTasks();
    }


    useEffect(() => {
        getAllTasks();
    }, []);


    return (
        <div className='tasktable'>
            <div className='button_div'>
                <NavLink to={"/add"}>

                    <button className='button'>Add New Task</button>
                </NavLink>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>status</th>
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
                                <td>{task?.status ? "Completed " : "Not Completed"} <button onClick={(e) => handleChangeStatus(task._id , task.status)} className='toggle'>Toggle</button></td>

                                <td className='iconmenu'>
                                    <NavLink to={`/update/:${task._id}`} >
                                    <FaEdit className='ricon' size={24} />
                                    </NavLink>
                                    </td>
                                <td onClick={() => { handleDelete(task._id) }} className='iconmenu' ><MdDeleteOutline className='ricon' size={24} /></td>

                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
