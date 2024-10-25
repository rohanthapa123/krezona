import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { TaskTable } from '../components/tasktable/TaskTable'

export const List = () => {
  return (
    <>
      <Navbar />
      <TaskTable />
    </>
  )
}
