
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { List } from './pages/List'
import { NewNote } from './pages/NewNote'

function App() {

  return (
    <Routes>
      <Route path='/' element={<List />} />
      <Route path='/add' element={<NewNote />} />
    </Routes>
  )
}

export default App
