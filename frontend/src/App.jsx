 import React, { useContext } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import MyBookings from './pages/MyBookings.jsx'
import Navbar from './componentes/Navbar'
import Footer from './componentes/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from './context/AppContext'

// Owner Pages
import OwnerLayout from './pages/owener/OwnerLayout'
import AllHotels from './pages/owener/AllHotels'
import RegisterHotel from './pages/owener/RegisterHotel'
import AllRooms from './pages/owener/AllRooms'
import AddRooms from './pages/owener/AddRooms'
import Bookings from './pages/owener/Bookings'
import Loader from './componentes/Loader.jsx'

const App = () => {
  const ownerPath = useLocation().pathname.includes("owner");
  const { owner } = useContext(AppContext);

  return (
    <div>
      { !ownerPath && <Navbar /> }

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<Hotels />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/room/:id' element={<SingleRoom />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/my-bookings' element={<MyBookings />} />
         <Route path='/loader/:nextUrl' element={<Loader/>} />
        {/* Owner Routes (Nested) */}
        <Route path='/owner' element={owner ? <OwnerLayout /> : <Login />}>
          <Route index element={owner ? <AllHotels /> : <Login />} />
          <Route path='register-hotel' element={owner ? <RegisterHotel /> : <Login />} />
          <Route path='rooms' element={owner ? <AllRooms /> : <Login />} />
          <Route path='add-room' element={owner ? <AddRooms /> : <Login />} />
          <Route path='bookings' element={owner ? <Bookings /> : <Login />} />
        </Route>
      </Routes>

      { !ownerPath && <Footer /> }
      <Toaster />
    </div>
  )
}

export default App
