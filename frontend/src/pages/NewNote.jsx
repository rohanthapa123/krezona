import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { TaskForm } from '../components/inputform/TaskForm'

export const NewNote = () => {
  return (
    <div>
        <Navbar />
        <TaskForm />
    </div>
  )
}
