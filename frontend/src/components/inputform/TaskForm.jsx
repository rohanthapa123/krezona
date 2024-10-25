import React, { useState } from 'react'
import "./taskform.css"
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiContractLeftFill } from 'react-icons/ri'
export const TaskForm = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
        status: false,
    })

    const navigate = useNavigate();



    const handleSubmit = async () => {
        console.log(data)
        if (data?.title?.trim() == "") {
            alert("Title is required");
        } else {
            const response = await axios.post("http://localhost:8085/tasks", data);
            console.log(response);
            navigate("/")
        }
    }

    const handleChange = async (e) => {
        const { name, value } = e;
        
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    return (
        <div className='main'>
            <div className='form-div'>
                <NavLink to={"/"}>
                    <RiContractLeftFill size={28} />
                </NavLink>
            </div>
            <div className='form-div'>
                <label htmlFor="title">Title</label>
                <input type="text" required name='title' onChange={(e) => handleChange(e.target)} placeholder='title' />
            </div>
            <div className='form-div'>
                <label htmlFor="desc">Description</label>
                <input type="text" name='description' onChange={(e) => handleChange(e.target)} placeholder='description' />
            </div>
            

            <div className="form-div">

                <button onClick={handleSubmit}>Add Task</button>
            </div>

        </div>
    )
}
