import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const TaskList = () => {

    const [tasks, setTasks] = useState();

    const getAllTasks = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/mytask`, {
            withCredentials: true
        });
        // console.log(response)
        setTasks(response.data.result)
    }


    const handleChangeStatus = async (id, status) => {
        const data = { status: !status };
        // console.log(data);
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/tasks/${id}/status`, data, {
            withCredentials: true
        });
        getAllTasks();
    }

    const handleAccept = async (id) => {
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/tasks/${id}/accept`, {}, {
            withCredentials: true
        })
        getAllTasks();
    }

    useEffect(() => {
        getAllTasks();
    }, []);


    return (
        <div className='mx-auto py-4 overflow-scroll my-4'>

            <table className='w-[80%]  bg-slate-100 border border-blue-50 text-2xl mx-auto'>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan={2}>status</th>
                        <th>User Status</th>
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
                                <td>{task?.accepted ? <span className='text-green-500'>Accepted</span> : <button onClick={() => handleAccept(task?._id)} className='text-white bg-gradient-to-r from-blue-500 to-red-500 py-2 text-xl font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate bg-red-500 cursor-pointer  p-1 px-2 rounded-xl'>Accept</button>}</td>

                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
