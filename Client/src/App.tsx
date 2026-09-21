import { Route, Routes } from 'react-router'
import './App.css'
import { Register, Login, Home, AddEvent, Profile, UpcommingEvents } from './Pages/Index'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element ={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/addevent' element={<AddEvent/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/upcommingevents' element={<UpcommingEvents/>}/>
      </Routes>
    </>
  )
}


export default App
