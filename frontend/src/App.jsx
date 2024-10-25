
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { List } from './pages/List'
import { NewNote } from './pages/NewNote'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<List />} />
      <Route path='/add' element={<NewNote />} />
      <Route path='/update/:id' element={<NewNote />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
