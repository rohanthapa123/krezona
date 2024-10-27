import React, { useCallback, useEffect, useState } from 'react'

import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { RiContractLeftFill } from 'react-icons/ri'
export const TaskForm = () => {

    const ids = useParams();
    const id = ids?.id?.split(":")[1];

    const [data, setData] = useState({
        title: "",
        description: "",
        status: false,
        user: ""
    })
    const [updating, setIsUpdating] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    const handleSubmit = async () => {
        console.log(data)
        if (updating) {
            if (data?.title?.trim() == "") {
                alert("Title is required");
            } else if (data?.user?.trim() == "") {
                alert("Please select the user");
            } else {
                // console.log(data)
                const response = await axios.put(`http://localhost:8085/tasks/${id}`, data);
                // console.log(response);
                navigate("/")
            }
        } else {

            if (data?.title?.trim() == "") {
                alert("Title is required");
            } else {
                const response = await axios.post("http://localhost:8085/tasks", data , {
                    withCredentials: true
                });
                // console.log(response);
                navigate("/admin")
            }
        }
    }

    const handleChange = async (e) => {
        const { name, value } = e;
        console.log(name, value)
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const getUsers = useCallback(async () => {
        const response = await axios.get(`http://localhost:8085/user`,{
            withCredentials: true
        });
        console.log(response.data)
        setUsers(response.data.result);
    }, [])

    const getData = async () => {
        const data = await axios.get(`http://localhost:8085/tasks/${id}`,{
            withCredentials: true
        });
        // console.log(data.data)
        setData({
            title: data.data.title,
            description: data.data.description,
            status: data.data.status
        })
    }
    useEffect(() => {
        if (id) {
            setIsUpdating(true)
            getData()
        }
        getUsers();

    }, [getUsers])



    return (
        <div className=' mt-16 py-16 bg-slate-300 w-[60%] mx-auto rounded-2xl'>
            <div className='my-2 mx-auto w-[60%] text-lg flex flex-col'>
                <NavLink to={"/admin"}>
                    <RiContractLeftFill size={28} />
                </NavLink>
            </div>
            <div className='my-2 mx-auto w-[60%] text-lg flex flex-col'>
                <label htmlFor="title">Title</label>
                <input className='p-4 text-lg rounded-lg' type="text" required value={data?.title} name='title' onChange={(e) => handleChange(e.target)} placeholder='title' />
            </div>
            <div className='my-2 mx-auto w-[60%] text-lg flex flex-col'>
                <label htmlFor="desc">Description</label>
                <input className='p-4 text-lg rounded-lg' type="text" name='description' value={data?.description} onChange={(e) => handleChange(e.target)} placeholder='description' />
            </div>
            <div className='my-2 mx-auto w-[60%] text-lg flex flex-col'>
                <label htmlFor="user">User</label>
                <select className='p-4 text-lg rounded-lg' name="user" id="" value={data?.user} onChange={(e) => handleChange(e.target)}  >
                    <option value="">Select User </option>
                    {
                        users?.map((user) => {
                            return <option key={user?._id} value={user?._id}>{user?.username}</option>
                        })
                    }
                </select>

            </div>


            {updating && <div className='my-2 mx-auto w-[60%] text-lg flex flex-col'>
                <label htmlFor="status">Status</label>
                {data.status ? "completed" : "not-completed"}
            </div>}

            <div className="my-2 mx-auto mt-8 w-[60%] text-lg flex flex-col items-center">

                <button className='w-fit p-2  bg-slate-500 rounded-lg' onClick={handleSubmit}>Add Task</button>
            </div>

        </div>
    )
}
