
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NewNote } from './pages/admin/NewNote'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './layout/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import User from './pages/admin/User'
import { List } from './pages/user/List'
import UserLayout from './layout/UserLayout'
import UserRoute from './components/user/UserRoute'
import { useAuth } from './context/AuthContext'
import { AssignedTaskList } from './components/admin/AssignedTaskList'

function App() {
  const { isLoggedIn, role, loading } = useAuth();
  return (
    <Routes>
      <Route path='/admin' element={<ProtectedRoute isLoggedIn={isLoggedIn} loading={loading} element={<AdminLayout isLoggedIn={isLoggedIn} />} />}>
        <Route index element={<AdminRoute isLoggedIn={isLoggedIn} role={role} element={<AssignedTaskList />} />} />
        <Route path='add' element={<AdminRoute isLoggedIn={isLoggedIn} role={role} element={<NewNote />} />} />
        <Route path='users' element={<AdminRoute isLoggedIn={isLoggedIn} role={role} element={<User />} />} />
        <Route path='update/:id' element={<AdminRoute isLoggedIn={isLoggedIn} role={role} element={<NewNote />} />} />
      </Route>
      <Route path='/user' element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<UserLayout isLoggedIn={isLoggedIn}/>} />}>
        <Route index element={<UserRoute isLoggedIn={isLoggedIn} role={role} element={<List />} />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
    </Routes>
  )
}

export default App
